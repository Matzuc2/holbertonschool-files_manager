import { createClient } from 'redis';

class RedisClient{
    constructor(){
        this.client = createClient()
            .on('error', (err) => {
                console.log(err)
            })
    }
    isAlive(){
        try{
            this.client.connect()
            return true
        }
        catch(err){
            return false
        }
        
    }
    async get(key){
       const value = this.client.get(key)
       return value
    }
    async set(key, value, duration){
        return this.client.set(key,value, {EX: duration})
    }

    async del(key){
       return this.client.del(key)
    }
}

export default new RedisClient();