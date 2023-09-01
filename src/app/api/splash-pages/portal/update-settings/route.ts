import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import { PUBLIC_URL } from "@/config";
import {cookies } from "next/headers"
import { NextResponse } from "next/server";

// import { json } from "node:stream/consumers";
export async function POST(request:Request) {
    // const nextCookies = cookies(); // Get cookies object
    // const token = nextCookies.get('access_token')?.value
    // if(token == undefined){
    //   return NextResponse.json("Usuario no authorizado",{status:401})
    // }
   //  console.log(token)
  try{
      const body = await request.json()
      const res = await fetch(`${PUBLIC_URL}/portal/save/settings/`,{
        method:"POST",
        body:JSON.stringify(body),
        headers:{
        'Content-Type' :'application/json',
       }}
     )
     let data;
     switch(res.status){
      case 200:
        data =await res.text()
        return NextResponse.json(data,{status:res.status})
        default:
           data =await res.json()
        return NextResponse.json(data,{status:res.status})
     }
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