import { NextApiRequest,NextApiResponse } from "next";
import axios from "axios";
import cookie from 'cookie';
export default async(req:NextApiRequest,res:NextApiResponse)=>{

    if (req.method === 'POST') {
        console.log(req.body)
        const { email, password } = req.body;
        // const formData = new FormData()
        // formData.append('email',email)
        // formData.append('password',password)
        console.log(email,password)
        try {
            const BASE_URL = process.env.NEXT_API_URL
            console.log(BASE_URL)
            const apiRes = await axios.post(`${BASE_URL}/apiFB/public/auth/login/`, req.body)
            console.log(apiRes)
            const data =  apiRes.data;
            console.log(data)
            // const roleRes = await axios.get(`${API_URL}/auth/user/`, { headers: {
            //     "Authorization":`Bearer ${data.access_token}`
            // }})
            if (apiRes.status === 200) {

                // response.cookies.set('vercel', 'fast', { path: '/test' })
                res.setHeader('Set-Cookie', [
                    cookie.serialize(
                        'access', data.access_token, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'development',
                            maxAge: 60 * 60 * 24,
                            sameSite: 'strict',
                            path: '/api/'
                        }
                    ),
                    
                    cookie.serialize(
                        'email', data.user.email, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'development',
                            maxAge: 60 * 60 * 24,
                            sameSite: 'strict',
                            path: '/api/'
                        }
                    ),
                    cookie.serialize(
                        'name', data.user.name, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'development',
                            maxAge: 60 * 60 * 24,
                            sameSite: 'strict',
                            path: '/api/'
                        }
                    )
                ]);
                return res.status(200).json({
                    auth:data,
                    // role:roleRes.data
                });
            } else {
                return res.status(apiRes.status).json({
                    error: 'Authentication failed'
                });
            }
        } 
        catch(err:any) {
            console.log(err)
        //     const errorMessage =  err.response.data
        //    if(err.response.status === 400){
        //        return res.status(400).json({
        //            error: 'Credenciales incorrectas.'
        //         });
        //    }
        //    else if(err.response.status == 401){
        //         res.status(401).json({
        //             error: errorMessage
        //          });
        //    } else{
        //     return res.status(500).json({
        //         error: 'Something went wrong when authenticating'
        //      });
        //    }
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} now allowed` });
    } 
}
