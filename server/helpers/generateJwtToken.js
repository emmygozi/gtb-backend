import JwtToken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateJwtToken = (id, email) => {
  const token = JwtToken.sign({ id, email },
    process.env.JWT_MY_SECRET, { expiresIn: 86400 });

  return token;
};
export default generateJwtToken;
