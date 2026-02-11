import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");

  // Exceção: webmail deve redirecionar sempre
  if (host === "webmail.ippur.pa.gov.br") {
    return NextResponse.redirect("https://mail.hostinger.com", 308);
  }

  return NextResponse.next();
}
