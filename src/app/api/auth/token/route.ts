import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import { PUBLIC_URL } from "@/config";
import {cookies } from "next/headers"
import { NextResponse } from "next/server";

// import { json } from "node:stream/consumers";
export async function GET(request:Request) {
    try{
      const nextCookies = cookies(); // Get cookies object
    //   nextCookies.delete("access_token")
    const rol = nextCookies.get("rol")?.value
    const access_token = nextCookies.get("access_token")?.value
    //   nextCookies.delete("rol")
      return NextResponse.json({
        access_token:access_token,
        rol:rol,
      },{status:200})
   }catch(err){
      console.log(err)
      return NextResponse.json("Error Request",{status:500})
   }
}
