import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    customId: { type: String, unique: true, sparse: true },
    company: { type: String, required: true },
    role: { type: String, required: true },
    stage: {
      type: String,
      required: true,
      enum: ['Applied', 'Phone Screen', 'Technical', 'Onsite Loop', 'Offer', 'Rejected'],
      default: 'Applied',
    },
    appliedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
    location: { type: String, default: 'Remote' },
    salary: { type: String, default: '$200,000 - $240,000' },
    matchScore: { type: Number, default: 90 },
    notes: { type: String, default: '' },
    history: [
      {
        stage: { type: String, required: true },
        date: { type: String, required: true },
        note: { type: String, default: '' },
      },
    ],
    contacts: [{ type: String }],
    companyDossier: {
      products: [{ type: String }],
      techStack: [{ type: String }],
      funding: { type: String, default: 'Public / Profitable' },
      valuation: { type: String, default: '' },
      cultureNotes: { type: String, default: '' },
      stages: [{ type: String }],
    },
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

export const Application = mongoose.model('Application', applicationSchema);
