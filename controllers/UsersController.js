import cryptoSample from 'crypto';
import db from '../utils/db';

function hashPassword(password) {
  const hashValue = cryptoSample.createHash('sha1');
  hashValue.update(password);
  return hashValue.digest('hex');
}

exports.postNew = async (req, res) => {
  const { email } = req.body; // destructurarion ES6
  let { password } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Missing email' });
  }
  if (!password) {
    return res.status(400).json({ error: 'Missing password' });
  }
  const existingUser = await db.db.collection('users').findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      error: 'Already exist',
    });
  }
  password = hashPassword(password);
  const result = await db.db.collection('users').insertOne({
    email,
    password,
  });
  const { insertedId } = result;
  const id = insertedId;
  return res.status(201).json({
    id,
    email,
  });
};
