interface Props {
    loading?:boolean
    originSource:string | undefined
    source:string | undefined
    text:string
    onChange:(e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
    isVideo?:boolean
    id:string
    restore?:()=>void
}

const UploadMedia = ({source,loading,onChange,text,id,restore,originSource}:Props) =>{
    return(
        <div className="w-full">
                {source == undefined ?
                <div className="h-64 borderC p-2 m-1 place-items-center grid">
                    <div className="grid ">
                        {loading?
                          <div className="flex items-center justify-center space-x-2 my-3">
                          <div className="w-4 h-4 rounded-full animate-pulse bg-gray-400"></div>
                          <div className="w-4 h-4 rounded-full animate-pulse bg-gray-400"></div>
                          <div className="w-4 h-4 rounded-full animate-pulse bg-gray-400"></div>
                      </div>
                    :    
                    <div className="grid place-content-center">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
             className="w-10 h-10 place-self-center">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <input type="file" id={id} className="hidden" onChange={onChange}/>
            <label htmlFor={id} className=" hover-effect cursor-pointer flex justify-center mx-auto">{text}</label>
                 </div>
            }
                </div>
                </div>
               :
               <div className="h-64 ma-auto relative grid place-content-center">
                   {originSource != source &&
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                     onClick={restore}
                     stroke="currentColor" className="w-8 h-8 absolute z-10 right-10 top-2 bg-gray-200 rounded-lg p-1 cursor-pointer">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                   </svg>
                    }
                {loading ?
                 <div className="flex items-center justify-center space-x-2 my-3">
                 <div className="w-4 h-4 rounded-full animate-pulse bg-gray-400"></div>
                 <div className="w-4 h-4 rounded-full animate-pulse bg-gray-400"></div>
                 <div className="w-4 h-4 rounded-full animate-pulse bg-gray-400"></div>
             </div>
                :
//                 isVideo ?
                
//                 <div>
//             <input type="file" id={id} className="hidden" onChange={onChange}/>
//                 <label htmlFor={id}>
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
//                 className="w-8 h-8 cursor-pointer absolute top-1/2 left-1/2 -mt-3 z-10 bg-gray-200 rounded-lg p-1">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
//             </svg>
//                     </label>
                    
//                     <video controls className="h-64 m-2 mx-auto"
//                     src={source}></video>
//                     </div>
//                     :
                    <div>
                <input type="file" id={id} className="hidden" onChange={onChange}/>
                <label htmlFor={id}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="w-8 h-8 cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                 z-10 bg-gray-200 rounded-lg p-1">
               <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
                    </label>
                    <img 
                    // width={450}
                    // height={100}
                    // style={{objectFit:"contain"}}
                    src={source} alt={source} className="h-64 mx-auto m-2 object-contain"/>
                    </div>
                }
                </div>
                }
            </div>
    )
}

export default UploadMedia;