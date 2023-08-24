import { API_URL, PUBLIC_URL } from "@/config";
import {cookies } from "next/headers"
import { NextResponse } from "next/server";

// import { json } from "node:stream/consumers";
export async function GET(request:Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
   const nextCookies = cookies(); // Get cookies object
   const token = nextCookies.get('access_token')?.value
//    console.log(token)
   if(token == undefined){
    return NextResponse.json("Usuario no authorizado",{status:401})
  }
  try{
    //   const body:Cupo = await request.json()
      const res = await fetch(`${API_URL}/apiFB/public/conexionwifi/listbyid`,{
        method:'POST',
        body:new URLSearchParams({idUserWifi:id as string}),
        headers:{
            'Authorization':`Bearer ${token}`
        }
      })
      const data =await res.json()
    //   console.log(data)
      return NextResponse.json(data.data,{status:200})
   }catch(err){
      console.log(err)
      return NextResponse.json("Error Request",{status:500})
   }
}
// import type { NextApiRequest, NextApiResponse } from "next";
// import axios from 'axios';
// import { getCookie } from 'cookies-next';
// import { API_URL } from "@/config";

// // import { json } from "node:stream/consumers";
// export default async function splashPages(req:NextApiRequest,res:NextApiResponse){
//     const access_token = getCookie("access_token", { req, res })
//     if(req.method == 'GET'){
//         const { id } = req.query
//         try{
//             const response = await axios.post(`${API_URL}/apiFB/public/conexionwifi/listbyid`,
//             new URLSearchParams({idUserWifi:id as string})
//             ,{
//                 headers:{
//                     'Authorization':`Bearer ${access_token}`
//                 }
//             }
//             )
//             const data = response.data
//             return res.status(200).json({
//                 result:data.data
//             })
//         }catch(err:any){
//             console.log(err)
//             return res.status(err.response.status).json({
//                 message:err.response.message
//             })
//         }
//     }
// }