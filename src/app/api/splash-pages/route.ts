import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import { API_URL } from "../../../config";
import { getCookie } from 'cookies-next';
import {cookies } from "next/headers"
import { NextResponse } from "next/server";
// import { json } from "node:stream/consumers";

export async function GET(request:Request,
    { params }: { params: { uuid: string } }) {
   const nextCookies = cookies(); // Get cookies object
   const token = nextCookies.get('access_token')?.value
//    console.log(token)
   if(token == undefined){
    return NextResponse.json("Usuario no authorizado",{status:401})
  }
  try{
    //   const body:Cupo = await request.json()
      const res = await fetch(`${API_URL}/apiFB/public/splashPage/list`,
      {
         headers:{
         'Authorization':`Bearer ${token}`
      }})
      const data =await res.json()
      // console.log(data)
      return NextResponse.json(data,{status:200})
   }catch(err){
      // console.log(err)
      return NextResponse.json("Error Request",{status:500})
   }
}

// export default async function splashPages(req:NextApiRequest,res:NextApiResponse){
//     const access_token = getCookie("access_token", { req, res })
//     if(req.method == 'GET'){
//         try{
//             const response = await axios.get(`${API_URL}/apiFB/public/splashPage/list`,{
//                 headers:{
//                     'Authorization':`Bearer ${access_token}`
//                 }
//             })
//             const data = response.data
//             return res.status(200).json({
//                 portales:data.Likes
//             })
//         }catch(err:any){
//             return res.status(err.response.status).json({
//                 message:err.response.message
//             })
//         }
//     }

//     if(req.method == 'POST'){
//         const { code}  = req.body
//         console.log("code.......",code)
//         try{
//             const response = await axios.get(`${API_URL}/apiFB/public/splashPage/findById/${code}`,{
//                 headers:{
//                     'Authorization':`Bearer ${access_token}`
//                 }
//             })
//             const data = response.data
//             // console.log(data)
//             return res.status(200).json({
//                 portal:data.Likes
//             })
//         }catch(err:any){
//             return res.status(err.response.status).json({
//                 message:err.response.message
//             })
//         }
//     }
// }