const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, default: '', trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    country: { type: String, default: 'India', trim: true },
    service: {
      type: String,
      required: true,
      enum: [
        'plagiarism-report',
        'ai-detection-report',
        'drillbit-report',
        'ai-content-reduction',
        'writing-assistance',
        'data-analysis',
        'document-formatting',
        'proofreading',
        'grammar-enhancement',
        'reference-formatting',
        'presentation-design',
        'reviewer-comments-revision',
      ],
    },
    pages: { type: Number, default: 1, min: 1 },
    language: { type: String, default: 'English', trim: true },
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
