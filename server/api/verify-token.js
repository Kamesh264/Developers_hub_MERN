// /api/verify-token.js
const jwt = require('jsonwebtoken');

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }

    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ message: 'Token not found' });
    }

    try {
        const decoded = jwt.verify(token, 'jwtPassword');
        return res.status(200).json({ valid: true, user: decoded.user });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'Authentication Error' });
    }
}
