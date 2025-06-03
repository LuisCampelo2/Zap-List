import { jwtService }  from "../services/jwt.service.js";

const middleWare = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];


  try {
    const decoded = jwtService.verify(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};


export const authMiddleWare = {
  middleWare
}