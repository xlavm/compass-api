const express = require('express');
const { postsHandler } = require('../../controllers/postsHandler');
 
const router = express.Router();
router.get('/', postsHandler);
 
module.exports = router;