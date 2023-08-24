import { API_URL, PUBLIC_URL } from "@/config";
import {cookies } from "next/headers"
import { NextResponse } from "next/server";

// import { json } from "node:stream/consumers";
export async function GET(request:Request) {
    const nextCookies = cookies(); // Get cookies object
    const token = nextCookies.get('access_token')?.value
  try{
    //   const body = await request.json()
      const res = await fetch(`${API_URL}/apiFB/public/settings`,{
        method:"POST",
        headers:{
        'Content-Type' :'application/json',
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



// import { json } from "node:stream/consumers";

// export default async function splashPages(req:NextApiRequest,res:NextApiResponse){
//     const access_token = getCookie("access_token", { req, res })
//     if(req.method == 'GET'){
//         // const { param } = req.query
//         try{
//             const response = await axios.post(`${API_URL}/apiFB/public/settings`,{},{
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
//                 data:data.data
//             })
//         }catch(err:any){
//             console.log(err)
//             return res.status(err.response.status).json({
//                 message:err.response.message
//             })
//         }
//     }
// }