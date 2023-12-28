const schedule = require('node-schedule');
// export const  scheduler = (func , seconds) => {

// const date = new Date(2023, 11, 7, 17, 30, 0); // 7th Nov 2023 at 5:30pm

// const job = schedule.scheduleJob(`*/${seconds} * * * *`, func);
// }

export class Scheduler {
    constructor(func, seconds) {
        this.func = func
        this.seconds = seconds
        
        
    }
    schedule = schedule.scheduleJob(`*/${seconds} * * * *`, () => { func(this.schedule) });
}