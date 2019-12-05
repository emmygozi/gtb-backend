import bcrypt from 'bcrypt';
import debuggerconsole from 'debug';
import pool from '../db/config';
import generateJwtToken from '../helpers/generateJwtToken';
// import sendMail from '../helpers/sendMail';

const mydebugger = debuggerconsole('app:startup');
class Users {
  static async customerSignup(req, res) {
    const {
      firstname, lastname, email, phoneNumber, location, password
    } = req.body;

    const emailSearchQuery = {
      text: 'SELECT email FROM customers WHERE email=$1',
      values: [`${email}`],
      rowMode: 'array',
    };

    const isAlreadyRegistered = await pool.query(emailSearchQuery);

    if (isAlreadyRegistered.rows.length > 0) {
      return res.status(409).json({ status: 409, error: `A customer with '${email}' is already registered` });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { rows } = await pool
      .query(`INSERT INTO customers ( firstname, lastname, email, phoneNumber, location, password )
    VALUES ('${firstname}','${lastname}', '${email}', '${phoneNumber}'
    , '${location}', '${hashedPassword}') RETURNING id, 
    firstname, lastname, email, phoneNumber, location, email`);

    const token = generateJwtToken(
      rows[0].id,
      rows[0].email
    );

    mydebugger(token);

    res.status(201).json({ status: 201, data: [{ token, user: rows[0] }] });
  }
}

export default Users;
