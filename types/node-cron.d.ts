declare module 'node-cron' {
    export interface ScheduleOptions {
        scheduled?: boolean;
        timezone?: string;
    }

    export interface ScheduledTask {
        start: () => this;
        stop: () => this;
        destroy: () => this;
        getStatus: () => 'scheduled' | 'running' | 'stopped';
    }

    export function schedule(cronExpression: string, func: () => void, options?: ScheduleOptions): ScheduledTask;
}