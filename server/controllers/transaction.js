import pool from '../db/config';

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

    const selectProductDetail = {
      text: 'SELECT * FROM product WHERE id=$1',
      values: [`${productid}`],
      rowMode: 'array',
    };

    const productDetail = await pool.query(selectProductDetail);
    const aProduct = productDetail.rows[0];


    res.status(201).json({ status: 201, data: [{ transaction: rows[0], product: aProduct }] });
  }
}

export default Transactions;
