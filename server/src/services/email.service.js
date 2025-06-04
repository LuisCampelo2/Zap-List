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


const send = async ({email,subject,html}) => {
  return transporter.sendMail({
    to: email,
    subject,
    html,
  })
}

const sendActivationEmail = (email, token) => {
  const href = `${process.env.FRONTEND_URL}/activate/${token}`
  const html = `<a href="${href}">${href}</a>`;

  return send({
    email, html,
    subject:'Activate'
  })
}

export const emailService = {
  sendActivationEmail,
}