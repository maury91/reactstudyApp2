import request from 'superagent';

export default class ServerCommunication {

    constructor(baseUrl = '') {
        this.baseUrl = baseUrl;
    }

    /**
     * @typedef {Object} APITimer
     * @property {string} title - Title of the Timer
     * @property {string} project - Name of the Project
     * @property {number} elapsed - Elapsed milliseconds
     * @property {string} id - UUIDv4 of the timer
     * @property {number|null} runningSince - Unix Timestamp of when the timer was started
     */

    /**
     *
     * @returns {Promise<Array<APITimer>>}
     */
    async getTimers() {
        return (await request.get(`${this.baseUrl}/api/timers`)).body;
    }

    /**
     * Start a timer
     * @param {Object} arg
     * @param {string} arg.id
     * @param {number} arg.start
     * @returns {Promise}
     */
    async startTimer({id, start = Date.now() }) {
        return await request.post(`${this.baseUrl}/api/timers/start`, {id, start});
    }

    /**
     * Stop a timer
     * @param {Object} arg
     * @param {string} arg.id
     * @param {number} arg.stop
     * @returns {Promise}
     */
    async stopTimer({id, stop = Date.now() }) {
        return await request.post(`${this.baseUrl}/api/timers/stop`, {id, stop});
    }

    /**
     * Create a new timer
     * @param {APITimer} attrs
     * @returns {Promise}
     */
    async createTimer( attrs ) {
        return await request.post(`${this.baseUrl}/api/timers` , attrs );
    }

    /**
     * Change a property of a timer
     * @param {APITimer} attrs
     * @returns {Promise}
     */
    async updateTimer( attrs ) {
        return await request.put(`${this.baseUrl}/api/timers` , attrs );
    }

    /**
     * Delete a timer
     * @param {string} id
     * @returns {Promise}
     */
    async deleteTimer( id ) {
        return await request.delete(`${this.baseUrl}/api/timers` , { data : id } );
    }

}
