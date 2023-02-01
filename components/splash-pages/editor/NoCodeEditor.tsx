import axios from "axios"
import { DetailedHTMLProps, ImgHTMLAttributes, useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../../../context/reduxHooks"
import useEffectOnce from "../../../utils/hooks/useEffectOnce"
import useUpdateEffect from "../../../utils/hooks/useUpdateEffect"
import EditBanner from "../../editor/EditBanner"
import EditParagraph from "../../editor/EditParagraph"
import EditText from "../../editor/EditText"
import ImageEdit from "../../editor/ImageEdit"
import UploadMedia from "../../editor/UploadMedia"

interface Props{
  htmlCode: string | undefined
  isCodeEditor:boolean
}
const NoCodeEditor = ({htmlCode,isCodeEditor}:Props)=>{
   const base_url = process.env.PUBLIC_URL
  const [titulo,setTitulo] = useState({
    text:"",
    color:""
  })
  const [portalData,setPortalData]=useState({
    imageFondo:"",
    image:"",
    video:"",
    poster:"",
    titulo:"",
    descripcion:"",
    color:""
  })
  const [descripcion,setDescripcion] = useState("")
  const [loading,setLoading]=useState(false)
  const [source,setSource] = useState("")
  const [imageSrc,setImageSrc] = useState<string | undefined>(undefined)
  const [videoSrc,setVideoSrc] = useState<string | undefined>(undefined)
  const [imageFondo,setImageFondo] = useState<string | undefined>(undefined)
  
  const updateHtmlCode = ()=>{
    if (htmlCode != undefined){
      const logoSource:any = document.querySelector("#logo")
      const tituloP:any = document.querySelector("#titulo")
      const descripcionId:any = document.querySelector("#descripcion")
      const imageB:any = document.querySelector("#image-b")
      const videoB:any  = document.querySelector("#video-b")
      const imageFondo2:any =  document.querySelector("#image-fondo")
      console.log(imageFondo2)
      if(logoSource != undefined){
      setSource(logoSource.src)
    }
    if(descripcionId != undefined){
      setDescripcion(descripcionId.textContent)
    }
    if(imageB != undefined){
      console.log(imageB)
      setImageSrc(imageB.src)
    }
    if(videoB != undefined){
      setVideoSrc(videoB)
    }
    if(tituloP != undefined){
      setTitulo({
        text:tituloP.textContent as string,
        color:tituloP.style.color as string
      })
    }
    if(imageFondo2 != undefined){
      setPortalData({...portalData,imageFondo:imageFondo2.src as string})
      setImageFondo(imageFondo2.src)
    }
  }
  }

  const onChangeImageFondo = async(e:React.ChangeEvent<HTMLInputElement>)=>{
    const imageBack:any = document.querySelector("#image-fondo")
    if(imageBack != undefined){   
        if (e.target.files && e.target.files[0]) {
            const formData = new FormData()
            formData.append("file",e.target.files[0])
            setLoading(true)
            const response = await axios.post(`${base_url}/upload/media/`,formData)
            setLoading(false)
            const imgHref = response.data
            setImageFondo(imgHref)
            imageBack.src = imgHref
            // const fileN = getInputFileName()
            // setFileNameVideo(fileN)
        }
        return
    }
    const fondo:any = document.querySelector("#image-fondo")
    if (e.target.files && e.target.files[0]) {
        const formData = new FormData()
        formData.append("file",e.target.files[0])
        setLoading(true)
        const response = await axios.post(`${base_url}/upload/media/`,formData)
        setLoading(false)
        const imgHref = response.data
        setImageFondo(imgHref)
        fondo.src = imgHref
        // setFileNamePoster(fileN)
      }
}

const deletedSubmitedImage = () =>{
  setImageFondo(portalData.imageFondo)
  const image:any = document.querySelector("#image-fondo")
  image.src = portalData.imageFondo
}
 
  useEffect(()=>{
    console.log("rendering")
   updateHtmlCode()
    // eslint-disable-line react-hooks/exhaustive-deps
  },[htmlCode,isCodeEditor])



    return(
        <div className={`grid grid-cols-2 w-full ${htmlCode == undefined? " transition-all opacity-0 duration-1000":
        " transition-all opacity-100 duration-1000 bg-gray-100"}`}>
            {/* <textarea className="w-1/2" name="" id="" cols={30} rows={10}
            value={htmlString}></textarea> */}
            <div className="overflow-auto h-screen p-3 space-y-4" >
              <div className="p-2 flex justify-between">
            <span className="text-2xl font-semibold">Portal Cautivo</span>
              </div>
              <div className="">
              <span className="text-xl font-semibold">Editar Logo</span>
              <ImageEdit
              id="#logo"
              src={source}
              />
              </div>
              <div>
              <span className="text-xl font-semibold">Editar Titulo</span>
              <EditText
              titulo={titulo.text}
              colorValue = {titulo.color}
              id="#titulo"
              setValueText={(s,c)=>setTitulo({text:s,color:c})}
              />
              </div>
              <div>
              <span className="text-xl font-semibold">Editar Descripcion</span>
              <EditParagraph
              descripcion={descripcion}
              setValue={(s)=>setDescripcion(s)}
              id="#descripcion"
              />
              </div>
              <div>
              <span className="text-xl font-semibold">Editar Portada</span>
              <EditBanner
              videoSource={videoSrc}
              imageSource={imageSrc}/>
              </div>

              <div className="pt-2">
              <span className="text-xl font-semibold">Editar Imagen de fondo</span>
             <UploadMedia
             originSource={portalData.imageFondo}
             source={imageFondo}
             onChange={onChangeImageFondo}
             text="Sube una imagen"
             loading={loading}
             id="fondo"
             restore={deletedSubmitedImage}
             />
              </div>     
           </div>
            <div
            id="core"
            className="relative "
            dangerouslySetInnerHTML={{__html:htmlCode as string}}
            />
             </div>
    )
}

export default NoCodeEditor
 