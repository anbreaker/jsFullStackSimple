const {Router} = require('express');
const router = Router();

// Routes of Server
router.get('/', (req, res) => res.json({text: 'Hello World'}));

module.exports = router;
