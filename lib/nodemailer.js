var nodemailer = require('nodemailer');
var path = require('path');
var emailPass = require(path.join(process.cwd(), 'lib/gmail'));

module.exports = function(reqBody) {

  // create reusable transporter object using SMTP transport
  var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'noah.yarian@gmail.com',
          pass: emailPass
      }
  });

  // NB! No need to recreate the transporter object. You can use
  // the same transporter object for all e-mails

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: reqBody.email, // sender address
      to: 'noah.yarian@gmail.com', // list of receivers
      subject: 'Feedback ['  + reqBody.regarding + '] from ' + reqBody.name + ' <' + reqBody.email + '>', // Subject line
      text: reqBody.content, // plaintext body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log("Message not sent. Error: ", error);
      }else{
          console.log('Message sent: ' + info.response);
      }
  });

}
