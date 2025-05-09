import express from 'express';
import rateLimit from 'express-rate-limit';
import { requestLogger } from './requestLogger.js'
import dotenv from 'dotenv';
import Pokedex from 'pokedex-promise-v2';
import OpenAI from "openai";

// Initiate dotenv
dotenv.config();

// Define the app
const app = express();

// Create instances
const pokedex = new Pokedex();
const openAi = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

// In-memory cache for Pokémon requests
const pokemonCache = {};

// Rate limiter middleware
const baseRateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Too many requests. Please try again later.'
  }
};

// Basic limit for Pokémon requests 
const pokemonLimiter = rateLimit({
  ...baseRateLimitConfig,
  max: 100
});

// More strict limit for the route using OpenAI's API
const storyLimiter = rateLimit({
  ...baseRateLimitConfig,
  max: 10
});

// Middleware to parse JSON
app.use(express.json());
// Middleware for request logging
app.use(requestLogger);

// Default route welcome and instructions
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Pokémon Story API',
    valid_routes: [
        '/pokemon/{pokmeon name or id number}',
        '/pokemon/{pokmeon name or id number}/story/{theme}'
    ]
  })
})

// Pokémon data fetching route
app.get('/pokemon/:nameOrId', pokemonLimiter, async (req, res) => {
  const { nameOrId } = req.params;

  // Input validation
  if (!nameOrId || typeof nameOrId !== 'string' || nameOrId.length > 50) {
    return res.status(400).json({ message: 'Invalid value for Pokémon name or id' });
  }

  try {
    const pokemon = await getPokemonData(nameOrId);

    if (!pokemon) {
      return res.status(404).json({ message: 'Pokémon not found' });
    }

    res.json({status: 'success', data: pokemon});
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Pokémon themed story route
app.get('/pokemon/:nameOrId/story/:theme', storyLimiter, async (req, res) => {
  const { nameOrId, theme } = req.params;

  // Input validation
  if (!nameOrId || typeof nameOrId !== 'string' || nameOrId.length > 50) {
    return res.status(400).json({ message: 'Invalid value for Pokémon name or id' });
  }

  if (!theme || typeof theme !== 'string' || theme.length > 100) {
    return res.status(400).json({ message: 'Invalid value for theme' });
  }

  try {
    // Get Pokémon data 
    const pokemon = await getPokemonData(nameOrId);

    if (!pokemon) {
      return res.status(404).json({ message: 'Pokémon not found' });
    }

    const prompt = createStoryPrompt(pokemon, theme);

    const response = await openAi.responses.create({
      model: "gpt-4o",
      input: prompt,
    });

    res.json({ status: 'success', data: response.output_text})
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to generate story. Please try again later.' });
  }
});

// Fetch Pokémon data from PokéApi
async function getPokemonData(nameOrId) {
  const key = nameOrId.toLowerCase();

  // Return from cache if available
  if (pokemonCache[key]) {
    return pokemonCache[key];
  }

  try {
    const response = await pokedex.getPokemonByName(key);

    // Retrieve desired values  
    const pokmeonData = {
      name: response.name,
      types: response.types,
      abilities: response.abilities,
      image: response.sprites.front_default
    };

    // Save to cache
    pokemonCache[key] = pokmeonData;

    return pokmeonData;
  } catch (error) {
    // Pokémon not found
    return null;
  }
}

function createStoryPrompt(pokemon, theme) {
  // Use types and abilities as optional data in the story
  const types = pokemon.types.map(a => a.type.name).join(', ');
  const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');

  // Build the prompt for OpenAI
  return `Write a short story about the Pokémon ${pokemon.name} with the theme of ${theme}. 
    A comma-separated list of types this Pokémon has is ${types}. 
    A comma-separated list of abilities this Pokémon has is ${abilities}.
    The type and abilities information may or may not be used in creating the story.`;
}

export default app;