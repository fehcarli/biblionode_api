const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const {host, port, user, pass} = require('../config/mailconfig');

const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
});

transport.use('compile', hbs({
    viewEngine: {
      extname: '.html',
      layoutsDir: 'src/resources/mail/',
      defaultLayout: 'forgot_password', 
      partialsDir: 'src/resources/mail/',
    },
    viewPath: 'src/resources/mail/',
    extName: '.html'
  }));

module.exports = transport;