import { NextApiRequest,NextApiResponse } from "next";
import axios from "axios";
import cookie from 'cookie';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
export default async function auth(req:NextApiRequest,res:NextApiResponse){
    if (req.method === 'POST') {
        const rp = require('request-promise');
        const { email,password } = req.body;
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
            setCookie('access_token', data.access_token, { req, res,
                httpOnly:true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24,
                // sameSite: 'strict',
                path:"/api/",
                });
            setCookie('rol', data.user.idRol, { req, res,
                httpOnly:true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24,
                // sameSite: 'strict',
                path:"/api/",
                });
            res.status(200).json({
                res:data
            })
        } 
        catch(err:any) {
            console.log(err)
            // console.log(err.response.statusCode)
            // console.log(err.response.body)
            const errorMessage = JSON.parse(err.response.body);
                res.status(err.response.statusCode).json({
                    error: errorMessage
                 });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} now allowed` });
    } 
}
