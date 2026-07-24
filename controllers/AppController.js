import db from '../utils/db';
import redis from '../utils/redis';

exports.getStatus = (req, res) => {
  res.status(200).json({
    redis: redis.isAlive(),
    db: db.isAlive(),
  });
};

exports.getStats = async (req, res) => {
  res.status(200).json({
    users: await db.nbUsers(),
    files: await db.nbFiles(),
  });
};
