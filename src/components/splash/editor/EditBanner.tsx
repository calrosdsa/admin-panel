import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import { uiActions } from "@/context/slices/ui-slice";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import ImageEdit from "./ImageEdit";
import UploadMedia from "./UploadMedia";

interface Props {
    imageSource:string | undefined
    videoSource:any | undefined
}
const EditBanner = ({imageSource,videoSource}:Props)=>{
    const base_url = process.env.PUBLIC_URL
    const dispatch = useAppDispatch()
    const uiState = useAppSelector(state=>state.ui)
    const [select,setSelect] = useState(false)
    const [changeVideoScreen,setChangeVideoScreen] = useState(true)
    const imgRef = useRef<HTMLInputElement>(null)
    const [contentBase64, setContentBase64] = useState<string | undefined>(undefined)
    const [contentBase64ForVideo, setContentBase64ForVideo] = useState<string | undefined>(undefined)
    const [contentBase64ForPoster, setContentBase64ForPoster] = useState<string | undefined>(undefined)
    const [enableImage,setEnableImage]=useState(false)
    const [enableVideo,setEnableVideo]=useState(false)

  
    const selectMedia =(e:boolean)=>{
        if(e){
            setEnableImage(true)
            setEnableVideo(false)
            setSelect(true)
        } else{
            setEnableImage(false)
            setEnableVideo(true)
            setSelect(false)
        }
    }

    const onChangeImageByVideo = async(e:React.ChangeEvent<HTMLInputElement>)=>{
        console.log("imageChange")
        const videoPortada:any = document.querySelector("#video-b")
        if(videoPortada != undefined){   
            if (e.target.files && e.target.files[0]) {
                const formData = new FormData()
                formData.append("file",e.target.files[0])
                dispatch(uiActions.setLoading(true))
                const response = await axios.post(`${base_url}/upload/media/`,formData)
                dispatch(uiActions.setLoading(false))
                const imgHref = response.data
                setContentBase64ForVideo(imgHref)
                videoPortada.src = imgHref
                // const fileN = getInputFileName()
                // setFileNameVideo(fileN)
            }
            return
        }
        const image = document.getElementById("image-b")
        const video:any = document.createElement("video")
        if (e.target.files && e.target.files[0]) {
            const formData = new FormData()
            formData.append("file",e.target.files[0])
            dispatch(uiActions.setLoading(true))
            try{
                const response = await axios.post(`${base_url}/upload/media/`,formData)
                dispatch(uiActions.setLoading(false))
                const imgHref = response.data
                setContentBase64ForVideo(imgHref)
                video.src = imgHref
                // video.className = "object-contain rounded-lg"
                video.controls = true
                const parent  = image?.parentNode
                parent?.insertBefore(video,image)
                if (image != null){
                    parent?.removeChild(image)
                }
            }catch(err:any){
                dispatch(uiActions.setLoading(false))
                toast.error(err.message)
                console.log(err)
            }
        }
    }
    
    const onChangeVideoByImage = async(e:React.ChangeEvent<HTMLInputElement>)=>{
        const imagePortada:any = document.querySelector("#image-b")

        if(imagePortada != undefined){   
            if (e.target.files && e.target.files[0]) {
                const formData = new FormData()
                formData.append("file",e.target.files[0])
                dispatch(uiActions.setLoading(true))
                try{
                    const response = await axios.post(`${base_url}/upload/media/`,formData)
                    dispatch(uiActions.setLoading(false))
                    const imgHref = response.data
                    setContentBase64(imgHref)
                    imagePortada.src = imgHref
                    console.log(imagePortada)
                }catch(err){
                    dispatch(uiActions.setLoading(false))
                }
                // const fileN = getInputFileName()
                // setFileNameVideo(fileN)
            }
            return
        }
        const videoTag = document.getElementById("video-b")
        let imageTag:any = document.createElement("img")
        if (e.target.files && e.target.files[0]) {
            const formData = new FormData()
            formData.append("file",e.target.files[0])
            dispatch(uiActions.setLoading(true))
            try{
                const response = await axios.post(`${base_url}/upload/media/`,formData)
                dispatch(uiActions.setLoading(false))
                const imgHref = response.data
                setContentBase64(imgHref)
                imageTag.src = imgHref
                
                imageTag.id = "image-b"
                imageTag.style = "width: 100%; max-height: 280px;object-fit: contain;border-radius: 0.5rem;"
                imageTag.className = "image_placeholder"
                imageTag.controls = true
                // setFileNameVideo(fileN)
                const parent  = videoTag?.parentNode
                parent?.insertBefore(imageTag,videoTag)
                if (videoTag != null){
                    parent?.removeChild(videoTag)
                }
            }catch(err:any){
                toast.error(err.message)
                dispatch(uiActions.setLoading(false))
                // const fileN = getInputFileName()
            }
        }
        }

    const onChangePoster = async(e:React.ChangeEvent<HTMLInputElement>)=>{
        const video:any = document.querySelector("#video-b")
        if (e.target.files && e.target.files[0]) {
            const formData = new FormData()
            formData.append("file",e.target.files[0])
            dispatch(uiActions.setLoading(true))
            try{

                // const response = await axios.post(`http://localhost:1323/upload/media/`,formData)
                const response = await axios.post(`${base_url}/upload/media/`,formData)
                console.log(response)
                dispatch(uiActions.setLoading(false))
                const imgHref = response.data
                console.log(imgHref)
                setContentBase64ForPoster(imgHref)
                video.poster = imgHref
            }catch(err){
                dispatch(uiActions.setLoading(false))
                console.log(err)
            }
            // setFileNamePoster(fileN)
          }
    }

    const clearInput = () =>{
        setContentBase64(imageSource)
        const image:any = document.querySelector("#image-b")
        image.src = imageSource
    }
    
   

    useEffect(()=>{
        if(imageSource != undefined){
            setEnableImage(true)
            setSelect(true)
            setContentBase64(imageSource)
        }
        if(videoSource != undefined){
            console.log(videoSource,'dasmdka')
            setEnableVideo(true)
            setSelect(false)
            setContentBase64ForVideo(videoSource.src as string)
            setContentBase64ForPoster(videoSource.poster as string)
        }
    },[imageSource,videoSource])
    return(
        <div>
            {/* <div className="grid gap-y-3 py-2">
            <SwitchComponent
            title="Usar una imagen para la portada"
            isChecked={enableImage}
            onChange={(e)=>{
                setSelect(true)
                selectMedia(e)
            }}
            />
            <SwitchComponent
            title="Usar un video para la portada"
            isChecked={enableVideo}
            onChange={(e)=>{
                setSelect(false)
                selectMedia(!e)
            }}
            />
            </div> */}
            <div>
         
            </div>
            <div className="w-full m-1 h-72 p-2 place-items-center grid">
                <UploadMedia
                source={contentBase64}
                onChange={onChangeVideoByImage}
                text="Sube una imagen"
                id="image"
                loading={uiState.loading}
                restore={()=>clearInput()}
                originSource={imageSource}
                />
            </div>

            {/* <section>
            {select ?
            <div className="w-full m-1 h-72 p-2 place-items-center grid">
                <UploadMedia
                source={contentBase64}
                onChange={onChangeVideoByImage}
                text="Sube una imagen"
                id="image"
                loading={uiState.loading}
                restore={()=>clearInput()}
                originSource={imageSource}
                />
            </div>
            :
            <div className="m-1 h-72">
            <div className="flex space-x-5 font-semibold">
            <span className={`${changeVideoScreen&& "text-primary"} p-1 cursor-pointer`} onClick={()=>setChangeVideoScreen(true)}>Video</span>
                <span className={`${!changeVideoScreen&& "text-primary"} p-1 cursor-pointer`} onClick={()=>setChangeVideoScreen(false)}>Poster</span>
            </div>
            <div className={`bg-primary h-1 w-[58px] rounded-xl
            ${changeVideoScreen ? "transition-all translate-x-0 transform": "rounded-xl transition-all translate-x-20 transform"}`}/>
            {changeVideoScreen ?
                <UploadMedia
                source={contentBase64ForVideo}
                onChange={onChangeImageByVideo}
                text="Sube un video"
                loading={uiState.loading}
                isVideo={true}
                id="video"
                originSource={videoSource == undefined ? undefined :videoSource.src}

                />
                :
                <UploadMedia
                source={contentBase64ForPoster}
                onChange={onChangePoster}
                text="Sube un imagen"
                loading={uiState.loading}
                id="poster"
                originSource={videoSource == undefined ? undefined : videoSource.poster}
                />
                }
            </div>
            }
            </section> */}
        </div>
    )
}

export default EditBanner;