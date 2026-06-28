import { NextRequest, NextResponse } from "next/server";
import { error } from "./apiResponse";

export const withApiHandler = (
  handler: (request: NextRequest) => Promise<Response>,
) => {
  return async (request: NextRequest) => {
    try {
      return await handler(request);
    } catch (err: any) {
      console.error("API error", err);
      return NextResponse.json(error(err.message || "Internal Server Error"), {
        status: 500,
      });
    }
  };
};
