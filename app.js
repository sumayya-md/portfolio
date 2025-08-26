const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Serve static files (CSS, JS, images)
app.use(express.static('./'));

// Route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Email API endpoint
app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ansaribint2005@gmail.com',
      pass: 'zfwhvfhxgbndgwvk'
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    cc: process.env.EMAIL_USER,
    subject: "Thanks for contacting me about : " + subject,
    text: `Hello ${name},\n\nThank you for contacting me. I've received your message:\n\n"${message}"\n\nI'll get back to you soon.\n\nBest regards,\nSana Farheen`,
  }

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      message: `Thank you ${name}, your message has been received. I'll get back to you soon!`
    });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});