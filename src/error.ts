export function crashProcessOnExceptionOrError(): void {
  process.on("uncaughtException", (err: Error) => {
    console.error("------------------------------------");
    console.error(
      `${new Date().toISOString()} uncaughtException: ${err.message}`
    );
    console.error(err.stack);
    console.error("------------------------------------\n");
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
    process.exit(1);
  });
}

export default class ExpressError extends Error {
  status: ErrorCode;
  constructor(status: ErrorCode) {
    super();
    this.status = status;
  }
}

export enum ErrorCode {
  BAD_REQUEST_400 = 400,
  UNAUTHORIZED_401 = 401,
  FORBIDDEN_403 = 403,
  NOT_FOUND_404 = 404,
  INTERNAL_SERVER_ERROR_500 = 500,
}
