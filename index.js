import dotenv from 'dotenv';
import app from './app.js'

// Initiate dotenv
dotenv.config();

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});