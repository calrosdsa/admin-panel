import axios from "axios";
import { useEffect, useState } from "react";
import qs from 'qs';
import { Post } from "../../types/facebook";
import EsqueletonPost from "./facebook/SqueletonPost";
import PostItem from "./facebook/PostItem";
import useEffectOnce from "../../utils/hooks/useEffectOnce";
const LandingPage = () =>{
  const [posts,setPosts]  = useState<Post[]>([])
  const [loading,setLoading]=useState(false)
  const facebook_uri = process.env.facebook_url as string
  const getPosts = async()=>{
    try{
      setLoading(true)
      const response = await axios.get(facebook_uri)
      setLoading(false)
      const feed = response.data.feed
      setPosts(feed.data)
    }catch(err){
      setLoading(false)
    }
  }


 

  useEffectOnce(()=>{
      getPosts()
  })
  
    return(
      <div className="mx-auto max-w-6xl ">
      
              {loading?
              <div className="max-w-xl mx-auto mt-10 rounded-lg grid gap-y-2">
              <EsqueletonPost/>
              </div>
              :
            <div className="mt-10 mx-auto max-w-xl ">
         {posts.map((item:Post)=> (
           <div className="p-1" key={item.id}>
           <PostItem
           post={item}
           />
           </div>
           ))}
           </div>
           
          }
          
         </div>
    )
}

export default LandingPage;

