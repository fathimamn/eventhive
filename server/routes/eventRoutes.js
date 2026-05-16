const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const protect = require('../middleware/authMiddleware');
const upload = require('../config/multer');

// @route   GET /api/events
// @route   POST /api/events
router.route('/')
  .get(getEvents)
  .post(protect, upload.single('bannerImage'), createEvent);

// @route   GET /api/events/:id
// @route   PUT /api/events/:id
// @route   DELETE /api/events/:id
router.route('/:id')
  .get(getEventById)
  .put(protect, upload.single('bannerImage'), updateEvent)
  .delete(protect, deleteEvent);

module.exports = router;
