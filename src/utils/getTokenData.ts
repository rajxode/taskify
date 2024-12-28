
import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

export async function getTokenData(req:NextRequest) {
    try {
        const token = req.cookies.get("token")?.value || "";
        if(!token) {
            return false;
        }
        const isVerified = await jwtVerify(token, secret);
        if(!isVerified){
            return false
        }
        return isVerified.payload;
    } catch (error:unknown) {
        return false;
    }
}