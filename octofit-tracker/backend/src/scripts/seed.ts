import mongoose from 'mongoose';

import {
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout,
} from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Maya Chen', email: 'maya.chen@example.com', avatarColor: '#e07a5f' },
      { name: 'Jordan Brooks', email: 'jordan.brooks@example.com', avatarColor: '#3d405b' },
      { name: 'Alex Rivera', email: 'alex.rivera@example.com', avatarColor: '#81b29a' },
      { name: 'Sam Okafor', email: 'sam.okafor@example.com', avatarColor: '#f2cc8f' },
    ]);

    const teams = await Team.create([
      {
        name: 'Summit Striders',
        motto: 'Small steps, strong peaks.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Trail Blazers',
        motto: 'Find your next mile.',
        members: [users[2]._id, users[3]._id],
      },
    ]);

    await Activity.create([
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        activityType: 'Run',
        durationMinutes: 42,
        calories: 410,
        completedAt: new Date('2026-08-25T07:30:00Z'),
      },
      {
        userId: users[1]._id,
        teamId: teams[0]._id,
        activityType: 'Strength',
        durationMinutes: 35,
        calories: 280,
        completedAt: new Date('2026-08-25T18:00:00Z'),
      },
      {
        userId: users[2]._id,
        teamId: teams[1]._id,
        activityType: 'Cycling',
        durationMinutes: 55,
        calories: 520,
        completedAt: new Date('2026-08-26T06:45:00Z'),
      },
      {
        userId: users[3]._id,
        teamId: teams[1]._id,
        activityType: 'Yoga',
        durationMinutes: 30,
        calories: 150,
        completedAt: new Date('2026-08-26T19:15:00Z'),
      },
    ]);

    await LeaderboardEntry.create([
      { userId: users[0]._id, teamId: teams[0]._id, points: 860, rank: 1 },
      { userId: users[2]._id, teamId: teams[1]._id, points: 790, rank: 2 },
      { userId: users[1]._id, teamId: teams[0]._id, points: 640, rank: 3 },
      { userId: users[3]._id, teamId: teams[1]._id, points: 510, rank: 4 },
    ]);

    await Workout.create([
      {
        name: 'Tempo Run Builder',
        description: 'A progressive run to build speed and aerobic strength.',
        activityType: 'Run',
        durationMinutes: 35,
        difficulty: 'Intermediate',
        target: 'Cardio endurance',
      },
      {
        name: 'Core and Mobility Reset',
        description: 'A low-impact sequence for a stronger, more mobile core.',
        activityType: 'Mobility',
        durationMinutes: 20,
        difficulty: 'Beginner',
        target: 'Core stability',
      },
      {
        name: 'Full Body Power',
        description: 'Compound movements designed to improve full-body strength.',
        activityType: 'Strength',
        durationMinutes: 45,
        difficulty: 'Advanced',
        target: 'Strength',
      },
    ]);

    console.log('Seeded 4 users, 2 teams, 4 activities, 4 leaderboard entries, and 3 workouts');

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
