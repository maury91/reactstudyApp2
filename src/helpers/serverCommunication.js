import request from 'superagent';

export default class ServerCommunication {

    constructor(baseUrl = '') {
        this.baseUrl = baseUrl;
    }

    async getTimers() {
        return (await request.get(`${this.baseUrl}/api/timers`)).body;
    }

    async startTimer({id, start = Date.now() }) {
        return await request.post(`${this.baseUrl}/api/timers/start`, {id, start});
    }

    async stopTimer({id, stop = Date.now() }) {
        return await request.post(`${this.baseUrl}/api/timers/stop`, {id, stop});
    }
    
    async createTimer( attrs ) {
        return await request.post(`${this.baseUrl}/api/timers` , attrs );
    }

    async updateTimer( attrs ) {
        return await request.put(`${this.baseUrl}/api/timers` , attrs );
    }

    async deleteTimer( id ) {
        return await request.delete(`${this.baseUrl}/api/timers` , { data : id } );
    }

}
