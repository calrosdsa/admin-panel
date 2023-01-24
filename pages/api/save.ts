

import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
// import { json } from "node:stream/consumers";
export default async function save(req:NextApiRequest,res:NextApiResponse){
    const {htmlCode} = req.body
    if(req.method == 'POST'){
        var fs = require('fs');
        console.log(htmlCode)
        
       fs.writeFile('/about.html', htmlCode, (error:any) => {
        console.log(error)
       });
        const formData = new FormData()
      const sendRequest = await axios.post("http://localhost:1323/upload",formData
        // ,{headers:{
        //          "Access-Control-Allow-Origin": "*",
        //         " Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        //          "Access-Control-Allow-Headers":"Content-Type, Authorization, X-Requested-With",
        // }}
      )
      console.log(sendRequest)
          //  if(sendRequest.status == 200){
             res.status(200).json({
              ok:"Pk"
             })
            // }else{
              // res.status(500)
            // }
    }
}