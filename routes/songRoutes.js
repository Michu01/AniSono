const express = require('express');

const songController = require('../controllers/songController');

const router = express.Router();

router.get('/', songController.song_get);
router.get('/list', songController.song_get_all);
router.get('/add', songController.song_add_get);
router.post('/add', songController.song_add_post);
router.delete('/:title', songController.song_delete);
router.get('/:pattern', songController.song_pattern);
router.get('/details/:title', songController.song_get_details);

module.exports = router;