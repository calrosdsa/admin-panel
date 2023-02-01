

import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import { API_URL } from "../../../config";
import { getCookie } from "cookies-next";
// import { json } from "node:stream/consumers";
export default async function likes(req:NextApiRequest,res:NextApiResponse){
    console.log(req.headers.cookie)
    const access_token =  getCookie('access_token', { req, res }) ?? false; 
    if (access_token === false) {
        return res.status(401).json({
            error: 'User unauthorized to make this request'
        });
    }
    if(req.method == 'GET'){
      try{
          const response = await axios.get(`${API_URL}/apiFB/public/facebook/reactionSeven`,{
              headers:{
                  'Authorization':`Bearer ${access_token}`
                }
            })
            res.status(200).json({
                res:response.data.data
            })
        }catch(err:any){
                return res.status(err.response.status).json({
                    error: 'Ha ocurrido un error'
            })
        }
    }
}