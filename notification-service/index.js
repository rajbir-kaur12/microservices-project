// notification-service/app.js
const express = require('express');
const app = express();

app.use(express.json());

app.get('/notify', (req, res) => {
  const NOTIFICATION_API_KEY = process.env.NOTIFICATION_API_KEY;
  const NOTIFICATION_EMAIL_PASSWORD = process.env.NOTIFICATION_EMAIL_PASSWORD;

  if (!NOTIFICATION_API_KEY || !NOTIFICATION_EMAIL_PASSWORD) {
    return res.status(500).json({ error: 'Notification service is not properly configured.' });
  }

  console.log('Notification API key is set.');  // Avoid printing sensitive info
  console.log('Notification email password is set.');

  res.json({ message: 'Notification sent to user successfully!' });
});


const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});

