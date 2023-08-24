import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import { API_URL } from "../../../config";
import { getCookie } from 'cookies-next';

// import { json } from "node:stream/consumers";
export default async function splashPages(req:NextApiRequest,res:NextApiResponse){
    const access_token = getCookie("access_token", { req, res })
    // if(req.method == 'GET'){
    //     try{
    //         const response = await axios.get(`${API_URL}/apiFB/public/splashPage/list`,{
    //             headers:{
    //                 'Authorization':`Bearer ${access_token}`
    //             }
    //         })
    //         const data = response.data
    //         return res.status(200).json({
    //             portales:data.Likes
    //         })
    //     }catch(err:any){
    //         return res.status(err.response.status).json({
    //             message:err.response.message
    //         })
    //     }
    // }

    if(req.method == 'POST'){
        const { code}  = req.body
        console.log(code)
        try{
            const response = await axios.get(`${API_URL}/apiFB/public/splashPage/add`,{
                headers:{
                    'Authorization':`Bearer ${access_token}`
                }
            })
            const data = response.data
            console.log(data)
            return res.status(200).json({
                portal:data.Likes
            })
        }catch(err:any){
            return res.status(err.response.status).json({
                message:err.response.message
            })
        }
    }
}