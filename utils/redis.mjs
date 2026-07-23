import redis from 'redis';

class RedisClient {
    constructor() {
        this.client = redis.createClient()
            .on('error', (err) => {
                console.log(err);
            });
    }

    isAlive() {
        return this.client.connected;
    }

    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) reject(err);
                else resolve(value);
            });
        });
    }

    async set(key, value, duration) {
       return this.client.setex(key, duration, value);
    }

    async del(key) {
        this.client.del(key);
    }
}

export default new RedisClient();