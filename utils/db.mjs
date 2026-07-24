import mongodb from 'mongodb';

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}`;

class DBClient {
  constructor() {
    this.db = null;

    mongodb.MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
      if (error) {
        console.error('MongoDB connection error:', error);
        return;
      }
      if (client) {
        this.db = client.db(database);
      }
    });
  }

  isAlive() {
    return !!this.db;
  }

  async nbUsers() {
    if (!this.db) return 0;
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    if (!this.db) return 0;
    return this.db.collection('files').countDocuments();
  }
}

export default new DBClient();
