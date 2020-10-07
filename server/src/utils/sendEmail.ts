import nodemailer from 'nodemailer';
import { config } from '../config';

export const sendEmail = async (to: string, text: string): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.emailUser,
      pass: config.emailPass,
    },
  });

  const info = await transporter.sendMail({
    from: 'gram@no-reply.com',
    subject: 'Gram: Forgot Password',
    to,
    html: text,
  });

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  console.log('Message sent: %s', info.messageId);
};
