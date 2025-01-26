import express from 'express';
const router = express.Router();

// Example routes
router.post('/register', (req, res) => {
    res.status(200).json({ message: 'User added successfully' });
});

export default router;