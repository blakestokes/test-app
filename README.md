# Pokémon Story Generator Test Project

## Objective

This test project challenges developers to build a Node.js application that integrates the Pokémon API (PokeAPI) and OpenAI API to create a Pokémon-themed story generator. Developers must implement all core functionality based on the outlined requirements.

---

## Features to Implement

1. **Fetch Pokémon Data**:
   - Create a route to fetch Pokémon details (name, types, abilities, and an image) from the PokeAPI.

2. **Generate Pokémon Stories**:
   - Create a route to generate creative stories based on a Pokémon and a user-provided theme using the OpenAI API.

## Bonus Objectives

3. **Caching**:
   - Implement a caching layer to reduce redundant API calls to the PokeAPI. This will optimize performance for frequently requested Pokémon.

4. **Input Validation**:
   - Ensure inputs (Pokémon name and theme) are validated. For example, check that the Pokémon name is a non-empty string.

5. **Request Logging**:
   - Create middleware to log incoming requests and responses for debugging and monitoring purposes.

6. **Rate Limiting**:
   - Implement rate limiting to prevent abuse of the API endpoints.

7. **Testing**:
   - Write unit tests for the routes to ensure functionality and reliability.

8. **Documentation**:
   - Add comments to your code and include details in the README about how caching, validation, and rate-limiting mechanisms are implemented.

---

## Blake Stokes - Implementation

1. **Caching**
   - I implemented a simple in-memory cache object that keeps previously-fetched Pokémon values stored for potential re-use. It's viable for a small app like this one, but doesn't ever get emptied until the server stops, so a better solution would be needed for a longer running instance.

2. **Validation**
   - For validation, I'm checking for existence, type, and length of the two input values Pokémon name/id and the story theme if given.

3. **Rate-limiting**
   - The api routes are being limited to reasonable amounts using the package _express-rate-limit_. The Pokémon data route allows for 100 requests over 15     minutes whereas the story route (which is accessing a paid OpenAI API route) needs to be a litte more restrictive at 10 requests per 15 minutes.

4. **Request Logging**
   - The details about requests made to the server are being logged in the console using a custom middleware _requestLogger_. 

5. **Testing**
   - Using the _Jest_ and _Supertest_ libraries, I implemented a few tests to check for correct status codes and responses for each route depending on if correct route variables were given or not.

---

## PokeAPI documentation

https://pokeapi.co/docs/v2
