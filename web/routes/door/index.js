const express = require('express');
const router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', require('../../controllers/door/home'));
router.get('/table', require('../../controllers/door/table'));

module.exports = router;