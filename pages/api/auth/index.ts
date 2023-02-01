import { NextApiRequest,NextApiResponse } from "next";
import axios from "axios";
import cookie from 'cookie';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
export default async function auth(req:NextApiRequest,res:NextApiResponse){
    if (req.method === 'POST') {
        console.log(req.body)
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
            console.log(data)
            setCookie('access_token', data.access_token, { req, res,
                httpOnly:true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24,
                sameSite: 'strict',
                path:"/api/",
                });
            res.status(200).json({
                res:data
            })
        } 
        catch(err:any) {
            console.log(err)
            const errorMessage =  err.response.data
           if(err.response.status === 400){
               return res.status(400).json({
                   error: 'Credenciales incorrectas.'
                });
           }
           else if(err.response.status == 401){
                res.status(401).json({
                    error: errorMessage
                 });
           } else{
            return res.status(500).json({
                error: 'Something went wrong when authenticating'
             });
           }
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} now allowed` });
    } 
}
