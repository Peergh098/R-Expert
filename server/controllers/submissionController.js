const fs = require('fs');
const path = require('path');
const { readAll, appendRow, findById, updateById, generateId } = require('../utils/csvStore');
const { sendSubmissionConfirmation, sendAdminReply, sendOtp } = require('../utils/email');
const { generateOtp, saveOtp, verifyOtp } = require('../utils/otpStore');

// Adds _id alias so frontend RTK Query cache tags (which use _id) work correctly
const withId = (row) => row ? { ...row, _id: row.id } : row;

const createSubmission = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName = '',
      email,
      phone,
      country = 'India',
      service,
      pages = 1,
      language = 'English',
      message = '',
    } = req.body;

    const now = new Date().toISOString();
    const submission = {
      id: generateId(),
      firstName,
      lastName,
      email: email.toLowerCase().trim(),
      phone,
      country,
      service,
      pages,
      language,
      message,
      fileUrl: '',
      fileName: '',
      originalFileName: '',
      status: 'pending',
      adminNotes: '',
      estimatedPrice: '',
      createdAt: now,
      updatedAt: now,
      fileDeletedAt: '',
    };

    if (req.file) {
      submission.fileUrl = `/uploads/${req.file.filename}`;
      submission.fileName = req.file.filename;
      submission.originalFileName = req.file.originalname;
    }

    appendRow(submission);

    sendSubmissionConfirmation(submission).catch(err =>
      console.error('Submission email error:', err.message)
    );

    res.status(201).json({
      message: 'Submission received successfully',
      submissionId: submission.id,
    });
  } catch (err) {
    next(err);
  }
};

const getAllSubmissions = (req, res, next) => {
  try {
    const { status, page = 1, limit = 20, search } = req.query;
    let rows = readAll();

    if (status) {
      rows = rows.filter(r => r.status === status);
    }
    if (search) {
      const s = search.toLowerCase();
      rows = rows.filter(r =>
        r.firstName.toLowerCase().includes(s) ||
        r.lastName.toLowerCase().includes(s) ||
        r.email.toLowerCase().includes(s)
      );
    }

    rows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const total = rows.length;
    const p = parseInt(page);
    const l = parseInt(limit);
    const submissions = rows.slice((p - 1) * l, p * l).map(withId);

    res.json({
      submissions,
      pagination: { total, page: p, pages: Math.ceil(total / l) },
    });
  } catch (err) {
    next(err);
  }
};

const getSubmissionById = (req, res, next) => {
  try {
    const submission = findById(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    res.json(withId(submission));
  } catch (err) {
    next(err);
  }
};

const updateSubmissionStatus = async (req, res, next) => {
  try {
    const { status, adminNotes, replyMessage, estimatedPrice } = req.body;
    const existing = findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Submission not found' });

    const updates = {};
    if (status !== undefined) updates.status = status;
    if (adminNotes !== undefined) updates.adminNotes = adminNotes;
    if (estimatedPrice !== undefined) updates.estimatedPrice = estimatedPrice;

    const submission = updateById(req.params.id, updates);

    if (replyMessage) {
      const subject = `Update on your ${submission.service} request`;
      sendAdminReply(submission.email, submission.firstName, replyMessage, subject).catch(err =>
        console.error('Reply email error:', err.message)
      );
    }

    res.json({ message: 'Submission updated', submission: withId(submission) });
  } catch (err) {
    next(err);
  }
};

const getDashboardStats = (req, res, next) => {
  try {
    const rows = readAll();
    const count = s => rows.filter(r => r.status === s).length;
    const recentSubmissions = [...rows]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map(withId);

    res.json({
      total: rows.length,
      pending: count('pending'),
      inProgress: count('in-progress'),
      completed: count('completed'),
      cancelled: count('cancelled'),
      recentSubmissions,
    });
  } catch (err) {
    next(err);
  }
};

const sendOtpHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const otp = generateOtp();
    saveOtp(email, otp);

    await sendOtp(email.toLowerCase().trim(), otp);
    res.json({ message: 'OTP sent to your email' });
  } catch (err) {
    next(err);
  }
};

const getSubmissionsByEmail = (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });
    if (!otp) return res.status(400).json({ message: 'OTP is required' });

    if (!verifyOtp(email, otp)) {
      return res.status(401).json({ message: 'Invalid or expired OTP' });
    }

    const submissions = readAll()
      .filter(r => r.email === email.toLowerCase().trim())
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(r => ({
        _id: r.id,
        service: r.service,
        status: r.status,
        pages: r.pages,
        language: r.language,
        estimatedPrice: r.estimatedPrice,
        adminNotes: r.adminNotes,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
      }));

    res.json({ submissions });
  } catch (err) {
    next(err);
  }
};

const exportSubmissions = (req, res, next) => {
  try {
    const csvPath = path.join(__dirname, '../data/submissions.csv');
    if (!fs.existsSync(csvPath)) {
      return res.status(404).json({ message: 'No submissions data found' });
    }
    const date = new Date().toISOString().slice(0, 10);
    res.download(csvPath, `submissions-${date}.csv`);
  } catch (err) {
    next(err);
  }
};

const deleteSubmissionFile = (req, res, next) => {
  try {
    const submission = findById(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    if (!submission.fileUrl) return res.status(400).json({ message: 'No file attached to this submission' });

    // Delete physical file from disk
    if (submission.fileName) {
      const filePath = path.join(__dirname, '../uploads', submission.fileName);
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch (e) {
          console.error('File delete error:', e.message);
        }
      }
    }

    const updated = updateById(req.params.id, {
      fileUrl: '',
      fileName: '',
      originalFileName: '',
      fileDeletedAt: new Date().toISOString(),
    });

    res.json({ message: 'File deleted successfully', submission: withId(updated) });
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
  deleteSubmissionFile,
  exportSubmissions,
  sendOtpHandler,
};
