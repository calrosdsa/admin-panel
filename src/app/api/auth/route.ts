import { NextApiRequest,NextApiResponse } from "next";
import axios from "axios";
import cookie from 'cookie';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import { NextResponse } from "next/server";
import { Console } from "console";
import { cookies } from "next/headers";
import { API_URL } from "@/config";
export async function POST(req:Request) {
        const nextCookies = cookies()
        const rp = require('request-promise');
        const { email,password } = await req.json();
        // const formData = new FormData()
        // formData.append('email',email)
        // formData.append('password',password)
        try {
            const res = await fetch(`${API_URL}/apiFB/public/auth/login`,{
                method:"post",
                body:new URLSearchParams({email:email,password:password}),
            }
             )
             console.log(res.status,"ESTATUS")
             const data =await res.json()
             if(res.status == 200){
                 console.log(data)
            const oneDay = 24 * 60 * 60 * 1000
            nextCookies.set("rol",data.user.idRol,{ 
                expires: Date.now() + oneDay,
                httpOnly:true
            })
            nextCookies.set("access_token",data.access_token,{ 
                expires: Date.now() + oneDay,
                httpOnly:true
            })
           return NextResponse.json(data,{status:200})
           
            // return new Response(JSON.stringify(data)    ,{
            //     headers: { 
                //         "Set-Cookie": `access_token=${data.access_token};path:/;httpOnly=true;maxAge=60*60*24`,
            //     },
            //     status:200
            //  })
        } else {
            return NextResponse.json(data,{status:res.status})
        }
        }catch(err:any) {
            // console.log(err.response.data)
            return NextResponse.json("Ocurrio un error inesperado",{status:500})
        }
}

   // var options = {
            //     method: 'POST',
            //     uri: 'https://teclu.com/apiFB/public/auth/login',
            //     form: {
            //         email: email,
            //         password: password
            //     },
            // };
            // const response = await rp.post(options)
            // const data = JSON.parse(response);

            // console.log(data)
            // setCookie('access_token', data.access_token, { res, req,
            //     httpOnly:true,
            //     secure: process.env.NODE_ENV !== 'development',
            //     maxAge: 60 * 60 * 24,
            //     // sameSite: 'strict',
            //     path:"/api/",
            //     });
            // setCookie('rol', data.user.idRol, { req, res,
            //     httpOnly:true,
            //     secure: process.env.NODE_ENV !== 'development',
            //     maxAge: 60 * 60 * 24,
            //     // sameSite: 'strict',
            //     path:"/api/",
            //     });
            
            // console.log(data)