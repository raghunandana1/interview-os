import mongoose from 'mongoose';

const cheatSheetSchema = new mongoose.Schema(
  {
    elevatorPitch: { type: String, required: true },
    keyMetrics: [{ type: String }],
    compensationBounds: {
      targetBase: { type: String, default: '$240,000' },
      walkAwayFloor: { type: String, default: '$210,000' },
      targetTotalComp: { type: String, default: '$380,000' },
      equityCeiling: { type: String, default: '$140,000/yr' },
    },
    reverseQuestions: [{ type: String }],
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

export const CheatSheet = mongoose.model('CheatSheet', cheatSheetSchema);
