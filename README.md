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

## PokeAPI documentation

https://pokeapi.co/docs/v2
