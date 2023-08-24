import { API_URL } from "@/config";
import {cookies} from 'next/headers'
import { NextResponse } from "next/server";

// import { json } from "node:stream/consumers";
export async function GET(request:Request) {
    const { searchParams } = new URL(request.url)
    const param = searchParams.get('param')
    const nextCookies = cookies(); // Get cookies object
    const token = nextCookies.get('access_token')
    // console.log(token,"--------------------")
  try{
      const body = await request.json()
      const res = await fetch(`${API_URL}/apiFB/public/solicitud/list/${param}`,{
        headers:{
        'Authorization':`Bearer ${token}`
       }}
     )
     const data =await res.text()
      return NextResponse.json(data,{status:200})
   }catch(err){
      console.log(err)
      return NextResponse.json("Error Request",{status:500})
   }
}

// import type { NextApiRequest, NextApiResponse } from "next";
// import axios from 'axios';
// import { API_URL } from "../../../../config";
// import { getCookie } from 'cookies-next';

// // import { json } from "node:stream/consumers";
// export default async function splashPages(req:NextApiRequest,res:NextApiResponse){
//     const access_token = getCookie("access_token", { req, res })
//     if(req.method == 'GET'){
//         const { param } = req.query
//         try{
//             const response = await axios.get(`${API_URL}/apiFB/public/solicitud/list/${param}`,{
//                 headers:{
//                     'Authorization':`Bearer ${access_token}`
//                 }
//             })
//             const data = response.data
//             return res.status(200).json({
//                 solicitudes:data.Likes
//             })
//         }catch(err:any){
//             console.log(err)
//             return res.status(err.response.status).json({
//                 message:err.response.message
//             })
//         }
//     }   
// }