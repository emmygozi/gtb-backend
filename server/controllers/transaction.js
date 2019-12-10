import pool from '../db/config';
import { sendBankGuarantee, sendBankGuaranteeStatus, sendOrderPlaced } from '../helpers/mailGen';
import sendSms from '../helpers/sendSms';

class Transactions {
  static async getBankTransactions(req, res) {
    const { rows } = await pool.query('select * from transaction inner join product on transaction.productid=product.id');
    res.status(200).json({ status: 200, data: rows });
  }

  static async getManufacturerTransactions(req, res) {
    const { rows } = await pool.query('select * from transaction inner join product on transaction.productid=product.id');
    // call sendmail & sms
    res.status(200).json({ status: 200, data: rows });
  }

  static async getDistributorTransactions(req, res) {
    const { distributorid } = req.params;

    const { rows } = await pool.query(`select * from transaction inner join product on transaction.productid=product.id where distributorid=${distributorid}`);
    // call sendmail & sms
    res.status(200).json({ status: 200, data: rows });
  }

  static async acceptOrDeclineTransactions(req, res) {
    const { status } = req.body;
    const { id } = req.params;

    const { rows } = await pool.query(`UPDATE transaction SET status = '${status}'
    WHERE id = '${id}' and status='pending' RETURNING  *`);

    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'The transaction with the given ID and status was not found!'
      });
    }
    console.log(rows[0]);

    const emailSearchQuery = {
      text: `select a.id id, a.quantity quantity, b.name product, a.total total, b.price price, c.name manname, d.name distname, c.email manEmail,d.email distEmail,c.phonenumber manPhoneNo, d.phonenumber distphoneno from transaction a, product b, manufacturer c, distributors d 
      where a.id=${id}
      and a.productid=b.id
      and a.distributorid=d.id
      and b.manufacturerid=c.id
      and a.productid=${rows[0].productid}
      and a.distributorid=${rows[0].distributorid}`,
      // text: 'SELECT email FROM distributors WHERE email=$1',
      // values: [`${email}`],
      // rowMode: 'array'
    };

    const stakeHoldersEmailAndPhone = await pool.query(emailSearchQuery);
    console.log(stakeHoldersEmailAndPhone);
    // eslint-disable-next-line eqeqeq
    if (rows[0].payoptionid == 2) {
      console.log(stakeHoldersEmailAndPhone.rows[0], 'Qwerty');
      const {
        manemail, manname, distname, distemail, manphoneno, distphoneno, id: transactionId
      } = stakeHoldersEmailAndPhone.rows[0];
      sendBankGuarantee(manemail, stakeHoldersEmailAndPhone.rows[0], manname);
      sendBankGuaranteeStatus(distemail, 'approved', transactionId, distname);
      sendSms(`The bank guarantee for your order ${transactionId}-xxx-gti has been approved. GTi`, manphoneno);
      sendSms(`The bank guarantee for your order ${transactionId}-xxx-gti has been approved. GTi`, distphoneno);
    }

    res.status(200).json({ status: 200, data: [rows[0]] });
  }

  static async cashTransafer(req, res) {
    const { id } = req.params;

    const { rows } = await pool.query(`UPDATE transaction SET status = 'ready'
    WHERE id = '${id}' and status='pending' RETURNING  *`);

    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'The transaction with the given ID and status was not found!'
      });
    }


    res.status(200).json({ status: 200, data: [rows[0]] });
  }

  static async createOrder(req, res) {
    const {
      quantity, productid, distributorid, total, payoptionid
    } = req.body;

    const { rows } = await pool
      .query(`INSERT INTO transaction ( quantity, productid, distributorid, total, payoptionid )
    VALUES ('${quantity}', '${productid}', '${distributorid}', '${total}', '${payoptionid}') RETURNING *`);
    console.log(rows[0]);
    const transactionDetail = {
      text: `select a.id id, b.name product, d.name distname, d.email distemail, d.phonenumber distphoneno,
      e.name manname, e.email manemail, e.phonenumber manphoneno, c.name payoption, a.quantity quantity, a.total total, 
      b.price unitprice from transaction a, product b, paymentoption c, distributors d, manufacturer e 
      where a.id=${rows[0].id}
      and a.productid=b.id
      and a.distributorid=d.id
      and a.payoptionid = c.id
      and b.manufacturerid = e.id
      and a.productid=${rows[0].productid}
      and a.distributorid=${rows[0].distributorid}
      and a.payoptionid=${rows[0].payoptionid}`
      // values: [`${productid}`],
      // rowMode: 'array',
    };

    const transactionDetailExists = await pool.query(transactionDetail);
    const {
      manemail,
      manname, distname, distemail, manphoneno, distphoneno, id: transactionId, product, unitprice
    } = transactionDetailExists.rows[0];
    sendOrderPlaced(manemail, transactionDetailExists.rows[0], manname);
    sendOrderPlaced(distemail, transactionDetailExists.rows[0], distname);
    sendSms(`The order ${transactionId}-xxxx-gti has been recieved. GTi`, distphoneno);
    sendSms(`The order ${transactionId}-xxxx-gti has been recieved. GTi`, manphoneno);

    res.status(201).json({ status: 201, data: [{ transaction: rows[0], product, unitprice }] });
  }
}

export default Transactions;
