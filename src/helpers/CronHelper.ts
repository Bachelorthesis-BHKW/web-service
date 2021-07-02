import { CronJob, CronTime } from "cron";

export class CronHelper {
  static jobs: Map<number, CronJob> = new Map<number, CronJob>();

  static upsertJob(time: string, jobId: number, func: () => void): void {
    let job = this.jobs.get(jobId);
    if (!job) {
      job = new CronJob(time, func, null, true);
      this.jobs.set(jobId, job);
    } else {
      this.updateJobTiming(job, time);
    }
  }

  static stopJobWithId(jobId: number): void {
    const job = this.jobs.get(jobId);
    if (job) job.stop();
  }

  private static updateJobTiming(job: CronJob, time: string): void {
    job.stop();
    job.setTime(new CronTime(time));
    job.start();
  }
}
