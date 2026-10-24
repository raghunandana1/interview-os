import mongoose from 'mongoose';

const calendarEventSchema = new mongoose.Schema(
  {
    customId: { type: String, unique: true, sparse: true },
    company: { type: String, required: true },
    round: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    interviewer: { type: String, default: 'Interview Panel' },
    interviewerRole: { type: String, default: 'Engineering Manager' },
    meetLink: { type: String, default: 'https://meet.google.com' },
    focus: { type: String, default: 'System Architecture & Technical Depth' },
    status: { type: String, default: 'Upcoming' },
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

export const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);
