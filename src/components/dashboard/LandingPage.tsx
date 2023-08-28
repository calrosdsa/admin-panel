import axios from "axios";
import { useEffect, useState } from "react";
import EsqueletonPost from "./facebook/SqueletonPost";
import PostItem from "./facebook/PostItem";
import { Post } from "@/data/models/type/dashboard-model";
import { useAppSelector } from "@/context/reduxHooks";
const LandingPage = () =>{
  const [posts,setPosts]  = useState<Post[]>([])
  const [loading,setLoading]=useState(false)
  const settings = useAppSelector(state=>state.auth.settings)
  const getPosts = async()=>{
    if(settings == undefined) return
    try{
      const id = settings?.idPageFacebook
      const facebook_uri = `https://graph.facebook.com/v15.0/${id}?fields=feed.limit(10)%7Bfull_picture%2Cmessage%2Ccreated_time%2Cfrom%2Cpermalink_url%2Creactions.limit(0).summary(total_count)%2Cactions%7D&access_token=${settings?.tokenPageFacebook}`
      // setLoading(true)
      const response = await axios.get(facebook_uri)
      // console.log(response)
      // setLoading(false)
      const feed = response.data.feed
      setPosts(feed.data)
    }catch(err){
      console.log(err)
      // setLoading(false)
    }
  }


 

  useEffect(()=>{
      getPosts()
       // eslint-disable-line react-hooks/exhaustive-deps
  },[settings])
  
    return(
      <div  className="mx-auto max-w-6xl pt-10 xl:pt-0">
              {loading?
              <div className="max-w-xl mx-auto rounded-lg grid gap-y-2">
              <EsqueletonPost/>
              </div>
              :
            <div className="mx-auto max-w-xl ">
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

