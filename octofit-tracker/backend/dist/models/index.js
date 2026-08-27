import mongoose from 'mongoose';
const { Schema } = mongoose;
const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    avatarColor: { type: String, required: true },
}, { timestamps: true });
const teamSchema = new Schema({
    name: { type: String, required: true, trim: true },
    motto: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    calories: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, required: true },
}, { timestamps: true });
const leaderboardSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
}, { timestamps: true });
const workoutSchema = new Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    difficulty: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    target: { type: String, required: true, trim: true },
}, { timestamps: true });
function getModel(name, schema) {
    return mongoose.models[name] ||
        mongoose.model(name, schema);
}
export const User = getModel('User', userSchema);
export const Team = getModel('Team', teamSchema);
export const Activity = getModel('Activity', activitySchema);
export const LeaderboardEntry = getModel('LeaderboardEntry', leaderboardSchema);
export const Workout = getModel('Workout', workoutSchema);
