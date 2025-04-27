const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.static('public'));  // Static files (CSS/JS/images)

// Home page route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Dynamic page routing for other pages
app.get('/:page', (req, res) => {
  const filePath = path.join(__dirname, 'views', `${req.params.page}.html`);
  
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    }
  });
});

// 404 handler (catch-all)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000, () => console.log('Server running: http://localhost:3000'));