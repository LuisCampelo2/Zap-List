import User from '../models/user.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { emailService } from '../services/email.service.js';
import { userService } from '../services/user.service.js';
import { jwtService } from '../services/jwt.service.js';

const register = async (req, res) => {

  const { email, password, name, lastName, } = req.body;
  const activationToken = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashedPassword, activationToken, name, last_name:lastName });
  await emailService.sendActivationEmail(email, activationToken);
  res.send(newUser);
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
      return res.json({message:'Conta precisa ser ativada'})
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

    const normalizedUser = userService.normalizedUser(user);

    const accessToken = jwtService.sign(normalizedUser);

    return res.json({
      accessToken,
      user: normalizedUser,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

export const authController = {
  register,
  activate,
  login,
}