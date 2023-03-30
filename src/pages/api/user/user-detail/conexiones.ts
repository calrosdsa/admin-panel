
import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { API_URL } from "@/config";

// import { json } from "node:stream/consumers";
export default async function splashPages(req:NextApiRequest,res:NextApiResponse){
    const access_token = getCookie("access_token", { req, res })
    if(req.method == 'GET'){
        const { id } = req.query
        try{
            const response = await axios.post(`${API_URL}/apiFB/public/conexionwifi/listbyid`,
            new URLSearchParams({idUserWifi:id as string})
            ,{
                headers:{
                    'Authorization':`Bearer ${access_token}`
                }
            }
            )
            const data = response.data
            return res.status(200).json({
                result:data.data
            })
        }catch(err:any){
            console.log(err)
            return res.status(err.response.status).json({
                message:err.response.message
            })
        }
    }
    

   
}