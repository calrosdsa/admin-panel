
import { API_URL } from "@/config";
import {cookies} from 'next/headers'
import { NextResponse } from "next/server";

// import { json } from "node:stream/consumers";
export async function GET(request:Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const nextCookies = cookies(); // Get cookies object
    const token = nextCookies.get('access_token')?.value
    if(token == undefined){
      return NextResponse.json("Usuario no authorizado",{status:401})
    }
    // console.log(token,"--------------------")
  try{
    //   const body = await request.json()
      const res = await fetch(`${API_URL}/apiFB/public/userwifi/getUserWifi`,{
        method:"POST",
        body:new URLSearchParams({idUserWifi:id as string}),
        headers:{
        'Authorization':`Bearer ${token}`
       }}
     )
     const data =await res.json()
      return NextResponse.json(data.data,{status:200})
   }catch(err){
      console.log(err)
      return NextResponse.json("Error Request",{status:500})
   }
}
// export default async function splashPages(req:NextApiRequest,res:NextApiResponse){
//     const access_token = getCookie("access_token", { req, res })
//     if(req.method == 'GET'){
//         const { id } = req.query
//         try{
//             const response = await axios.post(`${API_URL}/apiFB/public/userwifi/getUserWifi`,
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