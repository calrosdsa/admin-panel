import { formatDistanceToNow } from 'date-fns'
import moment from 'moment'
import Image from "next/image";
import PostOptions from "../../dialog/DialogFilter";
import { useState } from "react";
import { Post } from '@/data/models/type/dashboard-model';
interface Props{
    post:Post
}
const PostItem = ({post}:Props) =>{
    const [openDialog,setOpenDialog] = useState(false)
    const hasPicture = post.full_picture == undefined || false

    return(
        <>
        <PostOptions
        open={openDialog}
        closeDialog={()=>setOpenDialog(false)}
        permalink={post.permalink_url}
        id={post.id}
        />
        <div className="bg-white rounded-lg p-1 px-2">
            <div className="flex justify-between items-center">
                <div className="flex flex-col ">
                    <span className="text-sm font-semibold">{post.from.name}</span>
                    <span className="text-xs">
                        {moment(post.created_time).format('MMMM DD,  h:mm a')}
                    {/* {formatDistanceToNow(
                        new Date(moment.utc(post.created_time).local().format()),
                        {
                            addSuffix: true,
                        }
                    )} */}
                        </span>
                </div>
                <svg onClick={()=>setOpenDialog(true)}
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                    className="w-8 h-8  mr-3 hover:bg-gray-200 rounded-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
            </div>
            
           <div className="sm:p-1 border-b-[1px]">
            <span className={`${hasPicture ? "text-2xl":"text-sm "} px-2`}>{post.message}</span>
            {hasPicture ||
            <img src={post.full_picture} alt={post.id}
            className="rounded-lg w-full"
            />
        }
           </div>
           <div className="flex p-1 mt-1 space-x-2"> 
            <Image
            src="/images/like.png"
            height={1}
            width={21}
            alt={post.id}
            />
               <span>{post.reactions.summary.total_count}</span>
           </div>
        </div>
    </>
    )
}

export default PostItem;