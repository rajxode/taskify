
import { getTokenData } from "@/utils/getTokenData";
import { handleApiError } from "@/utils/handleApiError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        const token = await getTokenData(req);
        if(!token) {
            return NextResponse.json({
                    success:false,
                    message:"Unauthorized"
                },{
                    status:401
                }
            )
        }

        const response = NextResponse.json({
                success:true,
                message:"user logged out"
            },{
                status:200
            }
        )
        response.cookies.delete("token");
        return response;
    } catch (error:unknown) {
        return handleApiError(error);
    }
}