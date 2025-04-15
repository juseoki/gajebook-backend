const express = require('express');
const app = express();
require('dotenv').config();
const { sequelize } = require('./models');

app.use(express.json());
app.use('/card-usage', require('./routes/cardUsage'));

app.listen(3000, () => {
  console.log('✅ 서버 실행 중: http://localhost:3000');
});
