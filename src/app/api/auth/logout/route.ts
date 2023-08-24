import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import { PUBLIC_URL } from "@/config";
import {cookies } from "next/headers"
import { NextResponse } from "next/server";

// import { json } from "node:stream/consumers";
export async function GET(request:Request) {
    const nextCookies = cookies(); // Get cookies object
   console.log(nextCookies.get("rol"))
   console.log(nextCookies.get("access_token"))
  try{
    //   nextCookies.delete("access_token")
    nextCookies.delete("rol")
    nextCookies.delete("access_token")
    //   nextCookies.delete("rol")
      return NextResponse.json("data",{status:200})
   }catch(err){
      console.log(err)
      return NextResponse.json("Error Request",{status:500})
   }
}
// export default async function sa(req:NextApiRequest,res:NextApiResponse){

//     if(req.method == 'POST'){
//         const body   = req.body
//         try{
//             // const response = await axios.post(`${PUBLIC_URL}/portal/save/settings/`,body)
//             const response = await axios.post(`${PUBLIC_URL}/portal/basic/update/`,body)
//             const data = response.data
//             return res.status(200).json({
//                 portal:data
//             })
//         }catch(err:any){
//             return res.status(err.response.status).json({
//                 message:err.response.message
//             })
//         }
//     }
// }