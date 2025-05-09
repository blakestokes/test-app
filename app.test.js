import request from 'supertest';
import app from './app.js';

// Tests for pokemon data route
describe('GET /pokemon/:nameOrId', () => {
  it('should return data for a valid Pokémon', async () => {
    const response = await request(app).get('/pokemon/pikachu');
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe('pikachu');
    expect(response.body.data.types).toBeDefined();
    expect(response.body.data.abilities).toBeDefined();
    expect(response.body.data.image).toBeDefined();
  });

  it('should return 404 for an invalid Pokémon', async () => {
    const response = await request(app).get('/pokemon/invalidpokemon');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Pokémon not found');
  });
});

// Tests for pokemon themed story route (longer timeout for OpenAI request)
describe('GET /pokemon/:nameOrId/story/:theme', () => {
  it('should return a story for a valid Pokémon and theme', async () => {
    const response = await request(app).get('/pokemon/charmander/story/adventure');
    expect(response.status).toBe(200);
    expect(typeof response.body.data).toBe('string');
  }, 30000);

  it('should return 400 for an invalid theme', async () => {
    const response = await request(app).get('/pokemon/squirtle/story/' + 'a'.repeat(101));
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid value for theme');
  });
});
