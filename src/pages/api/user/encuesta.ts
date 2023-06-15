
import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import { API_URL } from "../../../config";
import { getCookie } from 'cookies-next';

// import { json } from "node:stream/consumers";
export default async function splashPages(req:NextApiRequest,res:NextApiResponse){
    const access_token = getCookie("access_token", { req, res })
    if(req.method == 'GET'){
        // const { param } = req.query
        try{
            const response = await axios.post(`${API_URL}/apiFB/public/userwifi/listencuesta`,{},{
                headers:{
                    'Authorization':`Bearer ${access_token}`
                }
            })
            // const response = await axios.post(`${API_URL}/apiFB/public/userwifi/list`,{
            //     headers:{
            //         'Authorization':`Bearer ${access_token}`
            //     }
            // }
            // )

            // console.log(response.status)
            const data = response.data
            // console.log(data)
            return res.status(200).json({
                users:data.data
            })
        }catch(err:any){
            console.log(err)
            return res.status(err.response.status).json({
                message:err.response.message
            })
        }
    }
    

   
}