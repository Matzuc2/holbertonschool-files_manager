import { createClient } from 'redis';

class RedisClient{
    constructor(){
        this.client = createClient()
            .on('error', (err) => {
                console.log(err)
            })
        this.client.connect()
    }
    isAlive(){
            if(this.client.isReady){

                return true
            }
            return false
        
    }
    async get(key){
        try{
            const value = this.client.get(key)
            return value
        }
        catch{
            return null
        }
    }
    async set(key, value, duration){
        return this.client.set(key,value, {EX: duration})
    }

    async del(key){
       return this.client.del(key)
    }
}

export default new RedisClient();