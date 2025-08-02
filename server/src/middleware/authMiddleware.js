import { jwtService } from "../services/jwt.service.js";

const middleWare = (req, res, next) => {
  const token = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!token && !refreshToken) {
    return res.status(401).json({ error: "Nenhum token fornecido" });
  }


  const decoded = jwtService.verify(token);

  if (decoded) {
    req.user = decoded;
    return next();
  }


  const refreshDecoded = jwtService.verifyRefresh(refreshToken);

  if (!refreshDecoded) {
    return res.status(401).json({ error: "Tokens inválidos ou expirados" });
  }


  const newAccessToken = jwtService.sign(refreshDecoded);
  res.cookie('accessToken', newAccessToken, {
    maxAge: 15 * 60 * 1000, // 15 minutos
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    domain: process.env.FRONTEND_DOMAIN,
  });

  req.user = refreshDecoded;
  return next();
};


export const authMiddleWare = { middleWare };
