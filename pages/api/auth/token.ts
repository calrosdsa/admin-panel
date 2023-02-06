

import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import { API_URL } from "../../../config";
import { getCookie } from "cookies-next";
// import { json } from "node:stream/consumers";
export default async function token(req:NextApiRequest,res:NextApiResponse){
    const access_token =  getCookie('access_token', { req, res }) ?? false; 
    const rol =  getCookie('rol', { req, res }) ?? false; 
    if (access_token === false) {
        return res.status(401).json({
            error: 'User unauthorized to make this request'
        });
    }
    if(req.method == 'GET'){
      try{
        console.log(rol)
            res.status(200).json({
                access_token:access_token,
                rol:rol
            })
        }catch(err:any){
                return res.status(err.response.status).json({
                    error: 'Ha ocurrido un error'
            })
        }
    }
}