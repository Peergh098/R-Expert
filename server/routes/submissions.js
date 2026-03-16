const express = require('express');
const router = express.Router();
const {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmissionStatus,
  getDashboardStats,
  getSubmissionsByEmail,
} = require('../controllers/submissionController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', upload.single('file'), createSubmission);
router.post('/track', getSubmissionsByEmail);
router.get('/stats', protect, adminOnly, getDashboardStats);
router.get('/', protect, adminOnly, getAllSubmissions);
router.get('/:id', protect, adminOnly, getSubmissionById);
router.put('/:id/status', protect, adminOnly, updateSubmissionStatus);

module.exports = router;
