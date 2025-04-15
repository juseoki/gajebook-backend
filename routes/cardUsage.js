const express = require('express');
const router = express.Router();
const { CardUsage } = require('../models');

router.get('/', async (req, res) => {
  const usages = await CardUsage.findAll();
  res.json(usages);
});

module.exports = router;
