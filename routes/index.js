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
        html: 'You will recieve this message from yourself 1 year later' // html body
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


    /*var timer = setTimeout(function () {
        sendEmail(mailOpt);
        clearTimeout(timer);
    }, parseInt(req.query.time || 1) * 60000); //todo : replace 1 with 525600 for 1 year*/


    res.json({msg: 'Successfully Registered.'});
});


module.exports = router;

/*
todo: try to use this function instead when finalizing 1 year timeline
function runAtDate(date, func) {
    var now = (new Date()).getTime();
    var then = date.getTime();
    var diff = Math.max((then - now), 0);
    if (diff > 0x7FFFFFFF) //setTimeout limit is MAX_INT32=(2^31-1)
        setTimeout(function() {runAtDate(date, func);}, 0x7FFFFFFF);
    else
        setTimeout(func, diff);
}*/
