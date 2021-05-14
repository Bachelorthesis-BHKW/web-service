export function setupErrorHandling(): void {
  process.on("uncaughtException", (err: Error) => {
    console.error("------------------------------------");
    console.error(
      `${new Date().toISOString()} uncaughtException: ${err.message}`
    );
    console.error(err.stack);
    console.error("------------------------------------\n");
    // reason: this is the error handling
    /* eslint-disable-next-line no-process-exit*/
    process.exit(1);
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.error("------------------------------------");
    console.error(
      `${new Date().toISOString()} unhandledRejection: ${JSON.stringify(
        promise
      )}`
    );
    console.error(reason);
    console.error("------------------------------------\n");
    // reason: this is the error handling
    /* eslint-disable-next-line no-process-exit*/
    process.exit(1);
  });
}
