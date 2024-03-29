
import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import { API_URL } from "../../../config";
import { getCookie } from 'cookies-next';

import { PUBLIC_URL } from "@/config";
import {cookies } from "next/headers"
import { NextResponse } from "next/server";

// import { json } from "node:stream/consumers";
export async function GET(request:Request) {
    const nextCookies = cookies(); // Get cookies object
    const token = nextCookies.get('access_token')?.value
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    const limit = searchParams.get('limit')
    if(token == undefined){
        return NextResponse.json("Usuario no authorizado",{status:401})
      }
  try{
      const res = await fetch(`${API_URL}/apiFB/public/userwifi/list`,{
        method:"POST",
        body:JSON.stringify({
          page:page,
          limit:limit
        }),
        headers:{
        'Content-Type' :'application/json',
        'Authorization':`Bearer ${token}`
       }}
     )
    //  console.log(res)
     const data =await res.json()
     console.log(data)
      return NextResponse.json(data,{status:200})
   }catch(err){
      console.log(err)
      return NextResponse.json("Error Request",{status:500})
   }
}

// SELECT DISTINCT usuariowifi.id, usuariowifi.fullName, usuariowifi.mail,
// (SELECT COUNT(*) FROM conexion JOIN accesspoint AS ac ON ac.id = conexion.idHardware
// JOIN establecimiento AS est ON est.id = ac.idEstablishment 
// JOIN grupo AS grup ON grup.id = est.idGroup 
// WHERE conexion.idUserWifi = usuariowifi.id) as conexiones
// FROM conexion 
// JOIN usuariowifi ON usuariowifi.id = conexion.idUserWifi 
// JOIN accesspoint AS ac ON ac.id = conexion.idHardware 
// JOIN establecimiento AS est ON est.id = ac.idEstablishment 
// JOIN grupo AS grup ON grup.id = est.idGroup 
// WHERE grup.idClient = 7

// import { json } from "node:stream/consumers";
// export default async function splashPages(req:NextApiRequest,res:NextApiResponse){
//     const access_token = getCookie("access_token", { req, res })
//     if(req.method == 'GET'){
//         // const { param } = req.query
//         try{
//             const response = await axios.post(`${API_URL}/apiFB/public/userwifi/list`,{},{
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