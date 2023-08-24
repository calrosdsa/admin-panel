import { NextApiRequest,NextApiResponse } from "next";
import axios from "axios";
import cookie from 'cookie';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'; // Import cookies
import { PUBLIC_URL } from "@/config";


export async function POST(request:Request) {
   const nextCookies = cookies(); // Get cookies object
   const token = nextCookies.get('access_token')?.value
   if(token == undefined){
       return NextResponse.json("Usuario no authorizado",{status:401})
     }
   // console.log("TOKEN",token)
 try{
    console.log("spplashpages ------------")
     const body = await request.formData()
   //   console.log(body.get("name"))
     const res = await fetch(`${PUBLIC_URL}/upload/converter/`,{
           method:'POST',
           body:body,
       })
       const data = await res.text()
       console.log("RESPONSE",data)
     return NextResponse.json(data,{status:res.status})
  }catch(err){
     console.log(err)
     return NextResponse.json("Error Request",{status:500})
  }
}
