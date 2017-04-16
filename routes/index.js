var express = require('express');
var router = express.Router();
var nodeMailer = require('nodemailer');

var transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: "uareinmyhead@gmail.com",
        pass: "uareinmyhead@123"
    }
});


/* GET home page. */
router.get('/', function (req, res, next) {
    var mailOpt = {
        from: "uareinmyhead@gmail.com",
        to: req.query.email,
        subject: 'You are in my head ✔', // Subject line
        html: '<p>' + req.query.q1 + '</p>' // html body
    };

    var msg = '<p>' + req.query.q1 + '</p>';
    msg += '<p>' + req.query.q2 + '</p>';
    msg += '<p>' + req.query.q3 + '</p>';
    msg += '<p>' + req.query.q4 + '</p>';
    msg += '<p>' + req.query.q5 + '</p>';
    msg += '<p>' + req.query.q6 + '</p>';

    mailOpt.html = msg;

    var confirmationMail = {
        from: "uareinmyhead@gmail.com",
        to: req.query.email,
        subject: 'You are in my head ✔', // Subject line
        html: 'You have successfully subscribed' // html body
    };

    sendEmail(confirmationMail);

    function sendEmail(opt) {
        transporter.sendMail(opt, function (err, info) {
            if (err) {
                return console.log(err);
            }
            console.log("Message %s sent: %s ", info.messageId, info.response);
        });
    }


    var timer = setTimeout(function () {
        sendEmail(mailOpt);
        clearTimeout(timer);
    }, parseInt(req.query.time) * 60000);


    res.json({msg: 'Successfully Registered.'});
});


module.exports = router;
