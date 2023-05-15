import { uploadImage } from "@/utils/uploadImage"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import EditBanner from "./EditBanner"
import EditParagraph from "./EditParagraph"
import EditText from "./EditText"
import ImageEdit from "./ImageEdit"
import SlideImages from "./SlideImages"
import UploadMedia from "./UploadMedia"

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
      const imageB:any = document.querySelector("#image-main")
      const videoB:any  = document.querySelector("#video-b")
      const imageFondo2:any =  document.querySelector("#image-fondo")
      // const image = document.querySelector("#image-1")
      // console.log("image-1:....")
      // console.log("image",image)
      if(logoSource != undefined){
      setSource(logoSource.src)
    }
    if(descripcionId != undefined){
      setDescripcion(descripcionId.textContent)
    }
    if(imageB != undefined){
      setImageSrc(imageB.src)
      setPortalData({...portalData,image:imageB.src as string})
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

  const onChangeImageFondo = async(e:React.ChangeEvent<HTMLInputElement>,id:string,callback:(src:string)=>void) => {
    const imageBack:any = document.querySelector(id)
    if(imageBack != undefined){   
        if (e.target.files && e.target.files[0]) {
          const id = toast.loading("Porfavor espere...",{position:"bottom-center"})
          try{
            const formData = new FormData()
            const filename = e.target.files[0].name
            const lastdot = filename.lastIndexOf(".")
            const imagewebp = filename.slice(0,lastdot) +".webp"
            formData.append("file",e.target.files[0])   
            formData.append("filename",imagewebp)
            // const response = await axios.post(`${base_url}/upload/media/`,formData)
            toast.update(id, {render:"La carga de la imagen se ha realizado con éxito.",type: "success", isLoading: false,autoClose:5000,position:"bottom-center"});
            setLoading(false)
            uploadImage(formData).then(res=>{
              console.log(res)
              const imgHref = res.data
              // setImageSrc(imgHref)
              callback(imgHref)
              imageBack.src = imgHref
            })
          }catch(err:any){
             toast.update(id, {render:err.message, type: "error", isLoading: false ,autoClose:5000,position:"bottom-center"});
          }
            // const fileN = getInputFileName()
            // setFileNameVideo(fileN)
        }
        return
    } 
}

const deletedSubmitedImage = () =>{
  setImageFondo(portalData.imageFondo)
  const image:any = document.querySelector("#image-fondo")
  image.src = portalData.imageFondo
}
 
  useEffect(()=>{
   updateHtmlCode()
    // eslint-disable-line react-hooks/exhaustive-deps
  },[htmlCode,isCodeEditor])



    return(
      <>
      {/* <h1 className="pt-20 mt-20">dskadmaksmkasm</h1> */}
        <div className={`max-w-6xl mx-auto ${htmlCode == undefined? " transition-all opacity-0 duration-1000":
        " transition-all opacity-100 duration-1000 "}`}>
            {/* <textarea className="w-1/2" name="" id="" cols={30} rows={10}
            value={htmlString}></textarea> */}
            <div className="overflow-auto h-screen p-3 space-y-4" >
              <div className="p-2 flex justify-between pt-16 mt-2">
            <span className="text-lg font-medium">Portal Cautivo</span>
              </div>
              <div className="">
              <span className="text-lg font-medium">Editar Logo</span>
              <ImageEdit
              id="#logo"
              src={source}
              />
              </div>
              {titulo.text != "" &&
              <div>
                <span className="text-lg font-medium">Editar Titulo</span>
              <EditText
              titulo={titulo.text}
              colorValue = {titulo.color}
              id="#titulo"
              setValueText={(s,c)=>setTitulo({text:s,color:c})}
              />
              </div>
            }
            {descripcion != ""  && 
              <div>
              <span className="text-lg font-medium">Editar Descripcion</span>
              <EditParagraph
              descripcion={descripcion}
              setValue={(s)=>setDescripcion(s)}
              id="#descripcion"
              />
              </div>
            }
              {imageSrc != undefined &&
              <div>
              <span className="text-lg font-medium">Editar Portada</span>
              {/* <EditBanner
              videoSource={videoSrc}
            imageSource={imageSrc}/> */}
            <UploadMedia
            originSource={portalData.image}
             source={imageSrc}
             onChange={(e)=>onChangeImageFondo(e,"#image-main",(src:string)=>setImageSrc(src))}
             text="Sube una imagen"
             loading={loading}
             id="image-1a"
             restore={deletedSubmitedImage}
             />
              </div>
            }

             
                <SlideImages
                htmlCode={htmlCode}
                />

            {imageFondo != undefined &&
              <div className="pt-2">
              <span className="text-lg font-medium">Editar Imagen de fondo</span>
             <UploadMedia
             originSource={portalData.imageFondo}
             source={imageFondo}
             onChange={(e)=>onChangeImageFondo(e,"#image-fondo",(src:string)=>setImageFondo(src))}
             text="Sube una imagen"
             loading={loading}
             id="fondo"
             restore={deletedSubmitedImage}
             />
              </div>  
            }


              {/* <div className="pt-2 pb-20">
              <span className="text-lg font-medium">Metodos de authenticacion</span>
              <ButtonsLogin/>
            </div>   */}
           </div>

       
            <div
            id="core"
            className="relative hidden"
            dangerouslySetInnerHTML={{__html:htmlCode as string}}
            />
             </div>
            </>
    )
}

export default NoCodeEditor
 