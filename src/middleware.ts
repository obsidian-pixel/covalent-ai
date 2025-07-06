import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

export function middleware() {
  // Example: allow all requests (customize as needed)
  return NextResponse.next();
}
