import { NextApiRequest,NextApiResponse } from "next";
import axios from "axios";
import cookie from 'cookie';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import { NextResponse } from "next/server";
import { Console } from "console";
import { cookies } from "next/headers";
export async function POST(req:Request) {
        const nextCookies = cookies()
        const rp = require('request-promise');
        const { email,password } = await req.json();
        // const formData = new FormData()
        // formData.append('email',email)
        // formData.append('password',password)
        try {
            var options = {
                method: 'POST',
                uri: 'https://teclu.com/apiFB/public/auth/login',
                form: {
                    email: email,
                    password: password
                },
            };
            const response = await rp.post(options)
            const data = JSON.parse(response);
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
            const oneDay = 24 * 60 * 60 * 1000
            nextCookies.set("rol",data.user.idRol,{ 
                expires: Date.now() - oneDay,
                httpOnly:true
            })
            return new Response(JSON.stringify(data)    ,{
                headers: { 
                    "Set-Cookie": `access_token=${data.access_token};path:/;httpOnly=true;maxAge=60*60*24`,
                },
                status:200
                // headers: { 'Set-Cookie': `access_token=${data.access_token}` },
             })
        } 
        catch(err:any) {
            console.log(err)
            return NextResponse.json("Error Request",{status:500})
        }
}
