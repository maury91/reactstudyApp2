import "whatwg-fetch";

/**
 * This class handle all the communication with the server
 * Providing a set of methods that returns Promises
 */
export default class ServerCommunication {

    /**
     * @param {string} [baseUrl=''] - Location of the api
     */
    constructor(baseUrl = '') {
        /**
         * Location of the api
         * @type {string}
         */
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
        return (await fetch(`${this.baseUrl}/api/timers`)).body;
    }

    /**
     * Start a timer
     * @param {Object} arg
     * @param {string} arg.id
     * @param {number} arg.start
     * @returns {Promise}
     */
    async startTimer({id, start = Date.now()}) {
        return await fetch(`${this.baseUrl}/api/timers/start`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, start})
        });
    }

    /**
     * Stop a timer
     * @param {Object} arg
     * @param {string} arg.id
     * @param {number} arg.stop
     * @returns {Promise}
     */
    async stopTimer({id, stop = Date.now()}) {
        return await fetch(`${this.baseUrl}/api/timers/stop`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, stop})
        });
    }

    /**
     * Create a new timer
     * @param {APITimer} attrs
     * @returns {Promise}
     */
    async createTimer(attrs) {
        return await fetch(`${this.baseUrl}/api/timers`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(attrs)
        });
    }

    /**
     * Change a property of a timer
     * @param {APITimer} attrs
     * @returns {Promise}
     */
    async updateTimer(attrs) {
        return await fetch(`${this.baseUrl}/api/timers`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(attrs)
        });
    }

    /**
     * Delete a timer
     * @param {string} id
     * @returns {Promise}
     */
    async deleteTimer(id) {
        return await fetch(`${this.baseUrl}/api/timers`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: id})
        });
    }

}
