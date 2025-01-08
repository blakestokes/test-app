const express = require('express');
const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Placeholder for Pokémon data fetching route
// TODO: Implement a route to fetch Pokémon data using the PokeAPI

// Placeholder for story generation route
// TODO: Implement a route to generate a story using OpenAI API

// Additional Objectives:
// TODO: Implement a caching layer to reduce redundant API calls to the PokeAPI.
// TODO: Add input validation to ensure the Pokémon name and theme are valid strings.
// TODO: Create a logging middleware to log requests and responses for debugging purposes.
// TODO: Implement rate limiting to prevent abuse of the API endpoints.

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
