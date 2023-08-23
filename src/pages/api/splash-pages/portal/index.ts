
import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { API_URL, PUBLIC_URL } from "@/config";

// import { json } from "node:stream/consumers";
export default async function getPortal(req:NextApiRequest,res:NextApiResponse){
    if(req.method == 'GET'){
        const { code } = req.query
        console.log(code)
        try{
            const response = await axios.get(`${PUBLIC_URL}/portal/basic/${code}/`)
            const data = response.data
            // console.log(data)
            return res.status(200).json({
                portal:data
            })
        }catch(err:any){
            return res.status(err.response.status).json({
                message:err.response.message
            })
        }
    }
    

   
}