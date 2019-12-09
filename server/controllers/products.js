import pool from '../db/config';

class Products {
  static async getProductByDistributor(req, res) {
    const {
      distributorid
    } = req.body;
    const { rows } = await pool.query(`select * from product where distributorid=${distributorid}`);
    res.status(200).json({ status: 200, data: rows });
  }
}

export default Products;
