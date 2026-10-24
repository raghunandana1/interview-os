import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    customId: { type: String, unique: true, sparse: true },
    category: {
      type: String,
      required: true,
      enum: ['System Design', 'Behavioral', 'Conflict Resolution', 'Engineering Culture'],
      default: 'Behavioral',
    },
    title: { type: String, required: true },
    company: { type: String, default: 'General' },
    drillCount: { type: Number, default: 0 },
    situation: { type: String, default: '' },
    task: { type: String, default: '' },
    action: { type: String, default: '' },
    result: { type: String, default: '' },
    lastPracticed: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret.customId || ret._id.toString();
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const Question = mongoose.model('Question', questionSchema);
