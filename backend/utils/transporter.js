   const nodemailer=require('nodemailer')

   const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "yashtalathi10th@gmail.com",
      pass: "vyks vxpr gzaj jgmd",
    },
  });

  module.exports={
    transporter
  }