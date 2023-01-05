import axios from "axios";
import PostItem from "./facebook/PostItem";
import { useEffect, useState } from "react";
import { Post } from "../types/facebook";

const LandingPage = () =>{
  const [posts,setPosts]  = useState<Post[]>([])
  const facebook_uri = process.env.facebook_url as string
  const getPosts = async()=>{
    const response = await axios.get(facebook_uri)
    const feed = response.data.feed
    setPosts(feed.data)
  }

  useEffect(()=>{
      getPosts()
  },[])
  
    return(
      <div className="grid lg:grid-cols-2 mx-auto max-w-6xl">
           <div className="mt-20">
            sdmksa
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

