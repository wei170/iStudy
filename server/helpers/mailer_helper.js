'use strict';
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: require('./config').email,
		pass: require('./config').password
	}
});

module.exports ={
	sendEmail : function(message,target) {
		var mailOptions = {
			from: 'iStudy <iStudy@dontReply.com>', // sender address
			to: target, // list of receivers
			subject: message.subject, // Subject line
			text: message.text, // plaintext body
		};
		transporter.sendMail(mailOptions, function(error, info){
			if(error){
				return console.log(error);
			}
			console.log('Message sent: ' + info.response);
		});
	}
};