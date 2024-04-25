import nodemailer from 'nodemailer'

// TODO: Type Error must be fixed later

export const sendEmail = async ({ email, emailType, userId }: any) => {
   try {
      const transporter = nodemailer.createTransport({
         host: 'smtp.forwaremail.net',
         port: 465,
         secure: true,
         auth: {
            //Tod: replace 'user' and 'pass' values from https://forwardemail.net
            user: '',
            pass: '',
         },
      });

      const mailOptions = {
         from: 'info@parmjeetmishra.com',
         to: email,
         subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
         html: ''
      };


      const mailResponse = await transporter.sendMail(mailOptions)
      return mailResponse;

   } catch (error: any) {
      throw new Error(error.message)
   }
}

