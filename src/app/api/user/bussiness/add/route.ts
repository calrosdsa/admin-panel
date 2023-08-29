import { API_URL } from "@/config";
import {cookies} from 'next/headers'
import { NextResponse } from "next/server";

// import { json } from "node:stream/consumers";
export async function POST(request:Request) {
    // const { searchParams } = new URL(request.url)
    // const id = searchParams.get('id')
    const nextCookies = cookies(); // Get cookies object
    const token = nextCookies.get('access_token')?.value
    if(token == undefined){
        return NextResponse.json("Usuario no authorizado",{status:401})
      }
  try{
      const body = await request.json()
      console.log(body)
      console.log(body.fullName)
      console.log(body.email)
      console.log(body.idRol)

      const res = await fetch(`${API_URL}/apiFB/public/userbusiness/add`,{
        method:"POST",
        body:new URLSearchParams({
          fullName:body.fullName,
          email:body.email,
          idRol:body.idRol
        }),
        headers:{
        'Authorization':`Bearer ${token}`
       }}
     )
     const data =await res.json()
     console.log(data)
      return NextResponse.json(data,{status:res.status})
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
//         // const { param } = req.query
//         try{
//             const response = await axios.post(`${API_URL}/apiFB/public/userwifi/listencuesta`,{},{
//                 headers:{
//                     'Authorization':`Bearer ${access_token}`
//                 }
//             })
//             // const response = await axios.post(`${API_URL}/apiFB/public/userwifi/list`,{
//             //     headers:{
//             //         'Authorization':`Bearer ${access_token}`
//             //     }
//             // }
//             // )

//             // console.log(response.status)
//             const data = response.data
//             // console.log(data)
//             return res.status(200).json({
//                 users:data.data
//             })
//         }catch(err:any){
//             console.log(err)
//             return res.status(err.response.status).json({
//                 message:err.response.message
//             })
//         }
//     } 
// }