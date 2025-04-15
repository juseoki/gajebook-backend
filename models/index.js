const Sequelize = require('sequelize');
const config = require('../config/config').development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const connectWithRetry = async () => {
  let connected = false;
  let retryCount = 0;
  while (!connected && retryCount < 10) {
    try {
      await sequelize.authenticate();
      console.log('✅ DB 연결 성공');
      connected = true;
    } catch (error) {
      console.log(`❌ DB 연결 실패 (재시도 ${retryCount + 1}/10):`, error.message);
      retryCount++;
      await new Promise(res => setTimeout(res, 3000));
    }
  }
  if (!connected) throw new Error('DB 연결에 10번 실패했습니다.');
  await sequelize.sync();
};

connectWithRetry();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.CardUsage = require('./CardUsage')(sequelize, Sequelize.DataTypes);

module.exports = db;
