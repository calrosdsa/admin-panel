import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import { API_URL } from "../../../config";
import { deleteCookie } from "cookies-next";
// import { json } from "node:stream/consumers";
export default async function token(req:NextApiRequest,res:NextApiResponse){

    if(req.method == 'GET'){
      try{
        deleteCookie('access_token', { req, res });
        deleteCookie('rol', { req, res });
        res.status(200).json({
            message:"successfully"
        })
        }catch(err:any){
                return res.status(err.response.status).json({
                    error: 'Ha ocurrido un error'
            })
        }
    }
}