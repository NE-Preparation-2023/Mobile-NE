const express = require ('express');
const router = express.Router();
const { protect , isAdmin}= require('../middlewares/protect')

router.use('/auth/', require('./auth.routes'));
// router.use('/carOwner/', require('./carOwner.routes'));

module.exports = router;
