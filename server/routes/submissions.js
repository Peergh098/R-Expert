const express = require('express');
const router = express.Router();
const {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmissionStatus,
  getDashboardStats,
  getSubmissionsByEmail,
  deleteSubmissionFile,
  exportSubmissions,
  sendOtpHandler,
} = require('../controllers/submissionController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', upload.single('file'), createSubmission);
router.post('/send-otp', sendOtpHandler);
router.post('/track', getSubmissionsByEmail);
router.get('/stats', protect, adminOnly, getDashboardStats);
router.get('/export', protect, adminOnly, exportSubmissions);
router.get('/', protect, adminOnly, getAllSubmissions);
router.get('/:id', protect, adminOnly, getSubmissionById);
router.put('/:id/status', protect, adminOnly, updateSubmissionStatus);
router.delete('/:id/file', protect, adminOnly, deleteSubmissionFile);

module.exports = router;
