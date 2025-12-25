import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // ajuste para o seu grupo/rotas
    const isPrivate = pathname.startsWith("/dashboard") || pathname.startsWith("/settings");

    if (!isPrivate) return NextResponse.next();

    // exemplo: cookie com token/sessão
    const token = req.cookies.get("token")?.value;

    if (!token) {
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        url.searchParams.set("next", pathname);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// aplica só no que interessa (mais eficiente)
export const config = {
    matcher: ["/dashboard/:path*", "/settings/:path*"],
};
