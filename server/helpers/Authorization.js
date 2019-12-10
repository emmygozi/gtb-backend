import JwtToken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Authorization {
  static authorize(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ status: 401, error: 'Access denied!' });

    try {
      const aDecodedToken = JwtToken.verify(token, process.env.JWT_MY_SECRET);
      req.newDecodedUser = aDecodedToken;
      next();
    } catch (ex) {
      res.status(400).json({ status: 400, error: 'Invalid login details!' });
    }
  }
}
export default Authorization;
