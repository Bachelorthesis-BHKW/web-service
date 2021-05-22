import express from "express";

export default function respondAsJson(
  data: unknown,
  res: express.Response
): void {
  if (data != null) {
    res.json(data);
  } else {
    res.status(500);
  }
  res.end();
}
