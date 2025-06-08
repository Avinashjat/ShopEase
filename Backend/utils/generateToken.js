
import jwt from 'jsonwebtoken';


const generateToken = (id) => {
  
  const stringId = id.toString();
  return jwt.sign({ id: stringId }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token valid for 1 hour
  });
};

export default generateToken;