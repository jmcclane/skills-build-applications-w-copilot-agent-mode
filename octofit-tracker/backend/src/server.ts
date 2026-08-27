import express from 'express';
import type { Model } from 'mongoose';

import './config/database.js';
import {
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout,
  type ResourceDocument,
} from './models/index.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

  
app.use(express.json());

app.get('/', (_request, response) => {
  response.json({
    name: 'OctoFit Tracker API',
    status: 'ok',
    health: `${apiBaseUrl}/api/health`,
    endpoints: ['/api/users/', '/api/teams/', '/api/activities/', '/api/leaderboard/', '/api/workouts/'],
  });
});

function registerResourceRoutes(
  path: string,
  model: Model<ResourceDocument>,
): void {
  app.get(path, async (_request, response) => {
    try {
      response.json(await model.find().lean());
    } catch (error) {
      response.status(500).json({ error: 'Unable to load resources', details: error });
    }
  });

  app.post(path, async (request, response) => {
    try {
      const resource = await model.create(request.body);
      response.status(201).json(resource);
    } catch (error) {
      response.status(400).json({ error: 'Unable to create resource', details: error });
    }
  });
}

registerResourceRoutes('/api/users/', User);
registerResourceRoutes('/api/teams/', Team);
registerResourceRoutes('/api/activities/', Activity);
registerResourceRoutes('/api/leaderboard/', LeaderboardEntry);
registerResourceRoutes('/api/workouts/', Workout);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
  console.log(`OctoFit API base URL: ${apiBaseUrl}`);
});
