import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    customId: { type: String, unique: true, sparse: true },
    name: { type: String, required: true },
    company: { type: String, required: true },
    role: { type: String, default: 'Engineering Lead' },
    relationship: { type: String, default: 'Former Colleague' },
    cadence: { type: String, default: 'Active' },
    lastContact: { type: String, default: () => new Date().toISOString().split('T')[0] },
    notes: { type: String, default: '' },
    avatar: { type: String, default: 'AL' },
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

export const Contact = mongoose.model('Contact', contactSchema);
