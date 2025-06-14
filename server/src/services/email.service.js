import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMPT_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMPT_USER,
    pass: process.env.SMPT_PASSWORD
  }
})


const send = async ({ email, subject, html }) => {
  return transporter.sendMail({
    to: email,
    subject,
    html,
  })
}

const sendActivationEmail = (email, token) => {
  const href = `${process.env.FRONTEND_URL}/activate/${token}`
  const html = `
  <!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Ativação de Conta</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
    <tr>
      <td align="center" style="padding-bottom: 20px;">
        <h2 style="color: #333333;">Bem-vindo ao Zap List!</h2>
      </td>
    </tr>
    <tr>
      <td style="color: #555555; font-size: 16px; line-height: 1.5;">
        <p>Obrigado por se cadastrar! Para começar a usar sua conta, clique no botão abaixo e ative seu cadastro:</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${href}" style="background-color: #28a745; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Ativar Conta</a>
        </p>
        <p>Se você não criou essa conta, pode ignorar este email.</p>
        <p>Qualquer dúvida, estamos à disposição!</p>
        <p>Abraços,<br>Equipe Zap List!</p>
      </td>
    </tr>
    <tr>
      <td align="center" style="font-size: 12px; color: #999999; padding-top: 20px;">
        © 2025 Zap List. Todos os direitos reservados.
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  return send({
    email, html,
    subject: 'Ativação de conta'
  })
}

export const emailService = {
  sendActivationEmail,
}