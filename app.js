const express = require('express');
const app = express();
const port = 3000;

// Custom middleware to check if the current time is within working hours
const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hourOfDay = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
    // Proceed to the next middleware or route handler
    next();
  } else {
    res.status(403).send('Sorry, the web application is only available during working hours (Mon-Fri, 9 AM to 5 PM).');
  }
};

// Use the middleware for all routes
app.use(workingHoursMiddleware);

// Set up the view engine and static files
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
