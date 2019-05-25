const nodemailer = require('nodemailer');
const express = require('express')
const bodyparser = require('body-parser');
const app = express()
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: false
}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/templates/home.html');
})

app.post('/sendMail', (req, res) => {

  const hr = "hr@example.com";
  const teamLead = req.body.teamLead;
  const from = req.body.from;
  const reason = req.body.reason;
  const fromDate = req.body.fromDate;
  const endDate = req.body.endDate;
  const password = req.body.password;
  const name = from.split('@')[0];
  const subject = "Leave request";
  
  const template = `<p>Hello Team</p><p> I am writing this mail to let you know I will be out of town for below mentioned reason </p><p> Reason: ${reason}</p><p>fromDate: ${fromDate}<p><p>EndDate: ${endDate}</p><p> Thank and Regards</p><p>${name}</p> `

  var transporter = nodemailer.createTransport({
    service:"Gmail",
    auth: {
      user: from,
      pass: password
    }
  });

  const message = {
    from: from,
    to: teamLead,
    cc: hr,
    subject: subject,
    html: template,
  }

  transporter.sendMail(message, function (error, info) {
    if (error) {
      res.send(error);
    } else {
      res.send('Email sent: ' + info.response);
    }
  });
})

app.listen(8000, () => {
  console.log('server is running on port 8000')
})
