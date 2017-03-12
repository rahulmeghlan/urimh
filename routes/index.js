var express = require('express');
var router = express.Router();
var nodeMailer = require('nodemailer');

var transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: "meghlantest@gmail.com",
        pass: "password@1234"
    }
});

var mailOpt = {
    from: "meghlantest@gmail.com",
    to: "rahulmeghlan@gmail.com",
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

transporter.sendMail(mailOpt, function (err, info) {
    if (err) {
        return console.log(err);
    }
    console.log("Message %s sent: %s ", info.messageId, info.response);
});

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.query);
    res.render('index', {title: 'Express', params: JSON.stringify(req.query)});
});

module.exports = router;
