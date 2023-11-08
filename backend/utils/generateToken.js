import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h',
    // expiresIn: `${process.env.TOKENS_AGE}h`,
  });

  // Set JWT as an HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    // maxAge: process.env.TOKENS_AGE * 60 * 60 * 1000, // 1 hour in milliseconds
  });
};

export default generateToken;
