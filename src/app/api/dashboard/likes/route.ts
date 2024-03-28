import { API_URL, PUBLIC_URL } from "@/config";
import {cookies } from "next/headers"
import { NextResponse } from "next/server";

// import { json } from "node:stream/consumers";
export async function GET(request:Request) {
    const nextCookies = cookies(); // Get cookies object
    const token = nextCookies.get('access_token')?.value
    if(token == undefined){
        return NextResponse.json("Usuario no authorizado",{status:401})
      }
  try{
    //   const body = await request.json()
      const res = await fetch(`${API_URL}/apiFB/public/facebook/reactionSeven`,{
        method:"GET",
        headers:{
        'Content-Type' :'application/json',
        'Authorization':`Bearer ${token}`
       }}
     )
     const data =await res.json()
     console.log(data)
      return NextResponse.json(data.data,{status:200})
   }catch(err){
      console.log(err)
      return NextResponse.json("Error Request",{status:500})
   }
}

// import type { NextApiRequest, NextApiResponse } from "next";
// import axios from 'axios';
// import { API_URL } from "../../../../config";
// import { getCookie } from "cookies-next";
// // import { json } from "node:stream/consumers";
// export default async function likes(req:NextApiRequest,res:NextApiResponse){
//     const access_token =  getCookie('access_token', { req, res }) ?? false; 
//     if (access_token === false) {
//         return res.status(401).json({
//             error: 'User unauthorized to make this request'
//         });
//     }
//     if(req.method == 'GET'){
//       try{
//           const response = await axios.get(`${API_URL}/apiFB/public/facebook/reactionSeven`,{
//               headers:{
//                   'Authorization':`Bearer ${access_token}`
//                 }
//             })
//             res.status(200).json({
//                 res:response.data.data
//             })
//         }catch(err:any){
//                 return res.status(err.response.status).json({
//                     error: 'Ha ocurrido un error'
//             })
//         }
//     }
// }