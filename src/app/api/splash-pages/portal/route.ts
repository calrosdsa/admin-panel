
import { API_URL, PUBLIC_URL } from "@/config";
import {cookies } from "next/headers"
import { NextResponse } from "next/server";

// import { json } from "node:stream/consumers";
export async function GET(request:Request) {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
//    const nextCookies = cookies(); // Get cookies object
//    const token = nextCookies.get('access_token')?.value
// //    console.log(token)
//    if(token == undefined){
//     return NextResponse.json("Usuario no authorizado",{status:401})
//   }
  try{
    //   const body:Cupo = await request.json()
      const res = await fetch(`${PUBLIC_URL}/portal/basic/${code}/`)
      const data =await res.json()
      // console.log(data)
      return NextResponse.json(data,{status:res.status})
   }catch(err){
      console.log(err)
      return NextResponse.json("Error Request",{status:500})
   }
}
// export default async function getPortal(req:NextApiRequest,res:NextApiResponse){
//     if(req.method == 'GET'){
//         const { code } = req.query
//         console.log(code)
//         try{
//             const response = await axios.get(`${PUBLIC_URL}/portal/basic/${code}/`)
//             const data = response.data
//             // console.log(data)
//             return res.status(200).json({
//                 portal:data
//             })
//         }catch(err:any){
//             // console.log(err,"ERROR")
//             return res.status(err.response.status).json({
//                 message:err.response.message
//             })
//         }
//     }
    

   
// }