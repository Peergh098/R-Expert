const Submission = require('../models/Submission');
const { sendSubmissionConfirmation, sendAdminReply } = require('../utils/email');

const createSubmission = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, country, service, pages, language, message } =
      req.body;

    const submissionData = {
      firstName,
      lastName,
      email,
      phone,
      country,
      service,
      pages: parseInt(pages),
      language,
      message,
    };

    if (req.file) {
      submissionData.fileUrl = `/uploads/${req.file.filename}`;
      submissionData.fileName = req.file.filename;
      submissionData.originalFileName = req.file.originalname;
    }

    const submission = await Submission.create(submissionData);

    // Send confirmation email (non-blocking)
    sendSubmissionConfirmation(submission).catch((err) =>
      console.error('Submission email error:', err.message)
    );

    res.status(201).json({
      message: 'Submission received successfully',
      submissionId: submission._id,
    });
  } catch (err) {
    next(err);
  }
};

const getAllSubmissions = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Submission.countDocuments(filter);
    const submissions = await Submission.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      submissions,
      pagination: { total, page: parseInt(page), pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

const getSubmissionById = async (req, res, next) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    res.json(submission);
  } catch (err) {
    next(err);
  }
};

const updateSubmissionStatus = async (req, res, next) => {
  try {
    const { status, adminNotes, replyMessage, estimatedPrice } = req.body;
    const submission = await Submission.findById(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });

    if (status) submission.status = status;
    if (adminNotes !== undefined) submission.adminNotes = adminNotes;
    if (estimatedPrice !== undefined) submission.estimatedPrice = estimatedPrice;
    await submission.save();

    if (replyMessage) {
      const subject = `Update on your ${submission.service} request`;
      sendAdminReply(submission.email, submission.firstName, replyMessage, subject).catch((err) =>
        console.error('Reply email error:', err.message)
      );
    }

    res.json({ message: 'Submission updated', submission });
  } catch (err) {
    next(err);
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    const [total, pending, inProgress, completed, cancelled] = await Promise.all([
      Submission.countDocuments(),
      Submission.countDocuments({ status: 'pending' }),
      Submission.countDocuments({ status: 'in-progress' }),
      Submission.countDocuments({ status: 'completed' }),
      Submission.countDocuments({ status: 'cancelled' }),
    ]);

    const recentSubmissions = await Submission.find().sort({ createdAt: -1 }).limit(5);

    res.json({ total, pending, inProgress, completed, cancelled, recentSubmissions });
  } catch (err) {
    next(err);
  }
};

const getSubmissionsByEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const submissions = await Submission.find({ email: email.toLowerCase().trim() })
      .select('_id service status pages language estimatedPrice adminNotes createdAt updatedAt')
      .sort({ createdAt: -1 });

    res.json({ submissions });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmissionStatus,
  getDashboardStats,
  getSubmissionsByEmail,
};
