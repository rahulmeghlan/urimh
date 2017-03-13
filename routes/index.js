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


/* GET home page. */
router.get('/', function (req, res, next) {
    var mailOpt = {
        from: "uareinmyhead@gmail.com",
        to: req.query.email,
        subject: 'You are in my head ✔', // Subject line
        html: '<p>' + req.query.question + '</p>' // html body
    };


    var timer = setTimeout(function () {
        transporter.sendMail(mailOpt, function (err, info) {
            if (err) {
                return console.log(err);
            }
            console.log("Message %s sent: %s ", info.messageId, info.response);
        });
        clearTimeout(timer);
    }, parseInt(req.query.time) * 3600);


    res.json({msg: 'Successfully Registered.'});
});


module.exports = router;
