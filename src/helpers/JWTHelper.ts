import config from "../config";
import jwt from "jsonwebtoken";

export default class JWTHelper {
  private static instance: JWTHelper;

  secret: string;

  private constructor(secret: string | undefined) {
    if (!secret) throw new Error("JWT secret undefined!");
    this.secret = secret;
  }

  public static getInstance(): JWTHelper {
    if (!JWTHelper.instance) {
      JWTHelper.instance = new JWTHelper(config.jwtSecret);
    }
    return JWTHelper.instance;
  }

  generateJWT(userId: number): string {
    const payload: TokenPayload = {
      userId,
    };
    return jwt.sign(payload, this.secret);
  }

  verifyJWT(token: string): number {
    const payload: TokenPayload = jwt.verify(
      token,
      this.secret
    ) as TokenPayload;
    return payload.userId;
  }
}

interface TokenPayload {
  userId: number;
}
