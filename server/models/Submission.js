const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    service: {
      type: String,
      required: true,
      enum: [
        'plagiarism-check',
        'plagiarism-removal',
        'proofreading',
        'citation-formatting',
        'thesis-writing',
        'document-formatting',
      ],
    },
    pages: { type: Number, required: true, min: 1 },
    language: { type: String, required: true, trim: true },
    message: { type: String, default: '' },
    fileUrl: { type: String, default: null },
    fileName: { type: String, default: null },
    originalFileName: { type: String, default: null },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    adminNotes: { type: String, default: '' },
    estimatedPrice: { type: Number, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Submission', submissionSchema);
