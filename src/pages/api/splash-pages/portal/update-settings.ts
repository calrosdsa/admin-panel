import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { PUBLIC_URL } from "@/config";

// import { json } from "node:stream/consumers";
export default async function sa(req:NextApiRequest,res:NextApiResponse){

    if(req.method == 'POST'){
        const body   = req.body
        try{
            const response = await axios.post(`${PUBLIC_URL}/portal/save/settings/`,body)
            const data = response.data
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