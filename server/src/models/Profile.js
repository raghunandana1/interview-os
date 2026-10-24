import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Raghunandan G.' },
    targetRole: { type: String, default: 'Staff Software Engineer / Distributed Systems' },
    practiceStreak: { type: Number, default: 12 },
    targetComp: { type: String, default: '$380k TC' },
    walkAwayFloor: { type: String, default: '$290k TC' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const Profile = mongoose.model('Profile', profileSchema);
