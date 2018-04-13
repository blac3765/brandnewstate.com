var express=require('express');
var app=express();
var nodemailer = require('nodemailer');
var config = require('./config');

app.use(express.static('./public'));

var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp@gmail.com',
  auth: config.nodemailer
});

app.get('/api/send', function(req,res) {
  if(req.query.type === 'candidate'){
    var text = [
      'Type: Candidate',
      'Name:     ' + req.query.name,
      'Email:    ' + req.query.email,
      'Job:      ' + req.query.job,
      'District: ' + req.query.districtNumber,
      'Office:   ' + req.query.office,
      'Services: ' + req.query.services
    ].join('\n');
  }
  if(req.query.type === 'volunteer'){
  var text = [
    'Type: Volunteer',
    'Name:     ' + req.query.name,
    'Email:    ' + req.query.email,
    'Message:  ' + req.query.message,
    'Skills:   ' + req.query.skills
  ].join('\n');
}
  var mailOptions = {
    from: 'Brand New State <brandnewstateok@gmail.com>',
    to: 'brandnewstateok@gmail.com',
    subject: 'New Submission',
    text: text
  };
  console.log(mailOptions);
  transporter.sendMail(mailOptions, function(error, response){
    if(error) {
      console.log(error);
      res.json(error);
    } else {
      console.log("Message sent: " + response);
      res.json(response);
    }
  });
});


app.listen(3000,function(){
    console.log("Express Started on Port 3000");
});
