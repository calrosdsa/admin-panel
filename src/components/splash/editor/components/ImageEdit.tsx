import { useAppDispatch } from "@/context/reduxHooks";
import { splashActions } from "@/context/slices/splash-slice";
import { ImagePortal } from "@/data/models/type/splash-data";
import { shimmer, toBase64 } from "@/utils";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import { ChangeEvent, ChangeEventHandler, Fragment, useEffect,useRef,useState } from "react";

interface Props {
    image?:ImagePortal
    onChange:(e:any)=>void
    onChangeVideo?:(e:any)=>void
    id:string
    applyChanges:()=>void
    applyChangesVideo?:()=>void
    noEdit?:boolean
    deleteEnabled?:boolean
    remove?:()=>void
    includeVideo?:boolean
    showVideo?:boolean
    changeMedia?:(bool:boolean)=>void
    idVideo?:string
}

enum TabMediaPortal {
    Imagen,
    Video
}

const ImageEdit = ({image,onChange,id,applyChanges,applyChangesVideo,noEdit = false,deleteEnabled = false,
    remove,includeVideo =false,changeMedia,idVideo="",onChangeVideo,showVideo = false
}:Props) =>{ 
    const [currentTab,setCurrentTab] = useState(TabMediaPortal.Imagen)
    const videoRef = useRef<HTMLVideoElement | null>(null);
    useEffect(()=>{
        if(videoRef.current != undefined){
            videoRef.current.load()
        }
        console.log(image?.video_url,"VIDEO URL")
        if(showVideo){
            setCurrentTab(TabMediaPortal.Video)
        }
        console.log(image?.video_url,"video_url")
    },[image])
    return(
        <div >
            <div className="card relative">
            {includeVideo&&
            <div className="flex absolute top-0 z-10">
                <button onClick={()=>{
                setCurrentTab(TabMediaPortal.Imagen)
                if(changeMedia != undefined){
                    changeMedia(false)
                }
                }
            } 
                className={`button rounded-tl-xl ${currentTab == TabMediaPortal.Imagen && "buttonInverse"}`}>Imagen</button>
                <button onClick={()=>{
                    setCurrentTab(TabMediaPortal.Video)
                    if(changeMedia != undefined){
                        changeMedia(true)
                    }
                }} 
                className={`button ${currentTab == TabMediaPortal.Video && "buttonInverse"}`}>Video</button>
                </div>    
            }
            <div className="h-44">
            <Transition
            as={Fragment}
            show={currentTab == TabMediaPortal.Imagen }
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            >
             <Image
             alt="Mountains"
             src={image?.url || "/images/placeholder-image.webp"}
             className={`h-44 object-contain ${includeVideo && "absolute"}`}
             placeholder="blur"
             blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(400, 275))}`}
             width={400}
             height={275}
             />
             </Transition>
             <Transition
            as={Fragment}
            show={currentTab == TabMediaPortal.Video}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            >
             <video ref={videoRef} controls className=" h-44 left-1/2 absolute -translate-x-1/2  ">
                <source src={image?.video_url}/>
                Your browser does not support the video tag.
             </video>
            </Transition>

            </div>
        <span className="h-5"/>

        <div className="py-5 border-t-2 flex  w-full justify-between">

        {currentTab == TabMediaPortal.Imagen &&
        <div>
            <input type="file" id={id} className="hidden" onChange={onChange}
            accept="image/png, image/jpeg, image/webp"/>
            <label htmlFor={id} className="buttonPrimary">
                Subir una imagen
            </label>
        </div>
        }

        {currentTab == TabMediaPortal.Video &&
        <div>
            <input type="file" id={idVideo} className="hidden" onChange={onChangeVideo}
            accept="video/mp4"/>
            <label htmlFor={idVideo} className="buttonPrimary">
                Subir un video
            </label>
        </div>
        }


        {(deleteEnabled && image?.url != "") &&
        <div>
            <button className="buttonPrimary" onClick={remove}
            >Remover imagen</button>
        </div>
        } 
        </div>


        {!noEdit &&
        <div className="grid grid-cols-2 gap-2 ">

        <div className="grid">
        <span>Alto</span>
        <div className="rounded-lg border-[1px] border-gray-400 pl-2 h-9 flex w-32 ">
        <input type="text"  className=" outline-none w-[82px]" value={image?.height}
        onChange={onChange} name="height"/>
        <select name="" className=" outline-none bg-gray-300 h-[34px] rounded-r-lg w-[37px] " id="">
            <option value="px">px</option>
        </select>
        </div>
        </div>

        <div className="grid ">
        <span>Fit</span>
        <select className="input w-24" name="object_fit" id="" 
        onChange={onChange} value={image?.object_fit}>
            <option value="contain">Contain</option>
            <option value="cover">Cover</option>
        </select>
        {/* <input type="text"  className="input" value={image?.object_fit} */}
        {/* onChange={onChange} name="object_fit"/> */}
        </div>

        <div className="grid">
        <span>Ancho</span>
        <div className=" rounded-lg border-[1px] border-gray-400 pl-2 h-9 flex items-center">
        <input type="text"  className=" outline-none" value={image?.width}
        onChange={onChange} name="width"/>
        <select name="" className=" outline-none bg-gray-300 h-[34px] rounded-r-lg w-[37px]" id="">
            <option value="%"> % </option>
        </select>
        </div>
        </div>

        {image?.border_radius != undefined &&
        <div className="grid ">
        <span>Border Radius</span>
        <input type="text"  className="input" value={image?.border_radius}
        name="border_radius" onChange={onChange}/>
        </div>
    }
        </div>
        }

        <div className="flex justify-end pt-2">
            {/* <button className="buttonPrimary">Resear cambios</button> */}
            
            <button onClick={()=>{
                if(currentTab == TabMediaPortal.Video){

                    if(applyChangesVideo!=undefined){
                        applyChangesVideo()
                    }
                }else{
                    applyChanges()
                }
            }} className="buttonPrimary">Apply</button>
        </div>
        </div>
        </div>
    )
}

export default ImageEdit;