import User from '../models/user.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { emailService } from '../services/email.service.js';
import { userService } from '../services/user.service.js';
import { jwtService } from '../services/jwt.service.js';
const isProduction = process.env.NODE_ENV === 'production';

const register = async (req, res) => {
  try {
    const { email, password, name, lastName, } = req.body;
    const activationToken = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, activationToken, name, last_name: lastName });
    await emailService.sendActivationEmail(email, activationToken);
    res.send(newUser);
  } catch (err) {
    console.log(err);
  }

}

const activate = async (req, res) => {
  const { activationToken } = req.params;

  const user = await User.findOne({ where: { activationToken } });

  user.activationToken = null;
  await user.save();

  res.status(200).json({ message: "Conta ativada com sucesso!", user });
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.findByEmail(email);

    if (user.activationToken !== null) {
      return res.json({ message: 'Conta precisa ser ativada' })
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

    const normalizedUser = userService.normalizedUser(user);

    const accessToken = jwtService.sign(normalizedUser);

    res.cookie('accessToken', accessToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      httpOnly: true,
    })
    return res.json({ accessToken, user: normalizedUser, message: 'Login realizado com sucesso' });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

const logout = async (req, res) => {
  try {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: isProduction,
      httpOnly: true,
    });

    res.sendStatus(204);
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
}

export const authController = {
  register,
  activate,
  login,
  logout,
}