import axios from "axios";
import PostItem from "./facebook/PostItem";
import { useEffect, useState } from "react";
import { Post } from "../types/facebook";
import qs from 'qs';
const LandingPage = () =>{
  const [posts,setPosts]  = useState<Post[]>([])
  const facebook_uri = process.env.facebook_url as string
  const getPosts = async()=>{
    const response = await axios.get(facebook_uri)
    const feed = response.data.feed
    setPosts(feed.data)
  }

  const sendRequestWithAxios = async()=>{
    // const formData = new FormData()
    // formData.append('username',"marca")
    // formData.append('password',"201120")
    // formData.append('buttonClicked',"4")
    const username ="marca"
    const password = "201120"
    const buttonClicked = "4"
    const data = qs.stringify({
      username:username,
      password:password,
      buttonClicked:buttonClicked
    })
    const response = await axios.post("http://192.0.2.1/login.html",data,{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    })
    console.log(response)
  }

  function sendRequest () {
    console.log("sending request")
        let form = document.createElement("form");
        let element1 = document.createElement("input"); 
        let element2 = document.createElement("input");  
        let element3 = document.createElement("input");  


        form.method = "POST";
        form.action = "http://192.0.2.1/login.html";   

        element1.value="marca";
        element1.name="username";
        form.appendChild(element1);  

        element2.value="201120";
        element2.name="password";
        form.appendChild(element2);

        
        element3.value="4";
        element3.type = "hidden";
        element3.name="buttonClicked";
        form.appendChild(element3);

        document.body.appendChild(form);

        form.submit();
    // console.log(username)
    
    // window.location.replace(window.location.origin + '/about/') {% endcomment %}
    }

  useEffect(()=>{
      getPosts()
  },[])
  
    return(
      <div className="grid lg:grid-cols-2 mx-auto max-w-6xl">
           <div className="mt-20">
            <button onClick={()=>sendRequest()}>Send Request</button>
            <button onClick={()=>sendRequestWithAxios()}>Send Request with axios</button>
           </div>
            <div className="mt-20 mx-auto max-w-xl">
         {posts.map((item:Post)=> (
           <div className="p-1" key={item.id}>
           <PostItem
           post={item}
           />
           </div>
           ))}
           </div>
         </div>
    )
}

export default LandingPage;

