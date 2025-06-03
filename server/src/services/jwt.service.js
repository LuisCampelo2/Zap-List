import jwt from 'jsonwebtoken';

const sign = (user) => {
  const token = jwt.sign(user, process.env.JWT_KEY);

  return token;
}

const verify = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_KEY)
  } catch (erro) {
    return null;
  }
}

export const jwtService = {
  sign,
  verify,
}