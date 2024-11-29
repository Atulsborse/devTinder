const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { userAuth, isAdmin } = require('../middlewares/auth');

// Get all users
router.get('/users', userAuth, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a user
router.delete('/users/:id', userAuth, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Suspend a user for 7 days
router.post('/users/:id/suspend', userAuth, isAdmin, async (req, res) => {
  const suspensionPeriod = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.isSuspended = true;
    user.suspensionEndTime = new Date(Date.now() + suspensionPeriod);
    await user.save();
    res.json({ message: 'User suspended for 7 days successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 
