import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import ImageEdit from "./components/ImageEdit";
import { uiActions } from "@/context/slices/ui-slice";
import { splashActions } from "@/context/slices/splash-slice";
import axios, { AxiosResponse } from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import useDebounce from "@/utils/hooks/useDebounce";
import { BasicPortal, ContentPortal, ImagePortal } from "@/data/models/redux-models/splash-data";
import useEffectOnce from "@/utils/hooks/useEffectOnce";
import ColorEdit from "./components/ColorEdit";
import { URL } from "url";
import { Blob } from "buffer";
import { saveSplashPage, updatePortal } from "@/context/actions/splashActions";
import DialogConfirmation from "@/components/dialog/DialogConfirmation";
import { PUBLIC_URL } from "@/config";
interface Props {
  basicPortal:BasicPortal
}
const NoCodeEditor = ({basicPortal}:Props)=>{
  const baseUrl = PUBLIC_URL
  const htmlCode = useAppSelector(state=>state.splash.htmlCode)
  const [portada,setPortada] = useState(basicPortal.image)
  const [imageBackground,setImageBackground] = useState<ImagePortal>({
    url:basicPortal.properties.image_background,
    id:0
  })
  const [showDialog,setShowDialog] = useState(false)
  const execute = useAppSelector(state=>state.ui.execute)
  const [submit,setSubmit] = useState(false)
  const [file,setFile] = useState<File>()
  const [fileLogo,setFileLogo] = useState<File>()
  const [fileImgBackground,setFileImgBackground] = useState<File>()
  const dispatch = useAppDispatch()
  const getHtmlFromApi = async() =>{
    dispatch(updatePortal(basicPortal))
  }
const updatedIFrame =async()=>{
  // console.log("updating")
  const iframe:any = document.getElementById("myiframe")
  if(iframe != undefined){
      iframe.srcdoc = htmlCode
      // getHtmlFromApi()
  }
}

const uploadImage = async(file:File,label:string,current:string | undefined)=>{
    const formData = new FormData()
    // const lastDot = file?.name.lastIndexOf(".") as number
    let imgWebp = ""
    if(current == `${basicPortal.portal.id_portal}${label}.webp`){
      imgWebp = `${basicPortal.portal.id_portal}${label}2.webp`
    }else{
      imgWebp = `${basicPortal.portal.id_portal}${label}.webp`
    }
    // const imgWebp = file?.name.substring(0,lastDot +1) + "webp"
    formData.append("file",file as File)
    formData.append("filename",imgWebp)
    formData.append("bucketName",basicPortal.portal.bucket_name)
    formData.append("pathName",basicPortal.portal.path_name + "/media/")
    const res = await axios.post<string>(`${baseUrl}/upload/converter/`,formData)
    // console.log(res.data)
    return res.data
}
const onChangeImage= (e: ChangeEvent<HTMLInputElement>)=>{
  if (e.target.files != null){
    const file = e.target.files[0];
    console.log(file.name)
    setFile(file)
    const objectUrl = window.URL.createObjectURL(file);
    console.log(objectUrl);
    setPortada({
      ...portada,
      url:objectUrl
})
  return
  }
   setPortada({
            ...portada,
            [e.target.name]:e.target.value
    })
    dispatch(splashActions.setSplashData({
      ...basicPortal,
      image:{
          ...basicPortal.image,
          [e.target.name]:e.target.value
      }
  }))
}

const onChangeLogo = (e: ChangeEvent<HTMLInputElement>)=>{
  if (e.target.files != null){
    const file = e.target.files[0];
    setFileLogo(file)
    const objectUrl = window.URL.createObjectURL(file);
    // console.log(objectUrl);
    dispatch(splashActions.setSplashData({
      ...basicPortal,
      logo:{
          ...basicPortal.logo,
          url:objectUrl
      }
  }))
  return
  }
  dispatch(splashActions.setSplashData({
      ...basicPortal,
      logo:{
          ...basicPortal.logo,
          [e.target.name]:e.target.value
      }
  }))
}
const onChangeImageBackground = (e:ChangeEvent<HTMLInputElement>) => {
  if (e.target.files != null){
    const file = e.target.files[0];
    setFileImgBackground(file)
    const objectUrl = window.URL.createObjectURL(file);
    setImageBackground({
      ...imageBackground,
      url:objectUrl
    })
  return
  }
}

const onChangeColor = (name:string,value:string)=>{
  console.log(name,value)
  // dispatch(splashActions.setHtmlCode(undefined))
  dispatch(splashActions.setSplashData({
    ...basicPortal,
    properties:{
        ...basicPortal.properties,
        [name]:value
    }
}))
}

const applyChangeColor = ()=>{
      getHtmlFromApi()
}

const applyChanges = async() =>{
  if(file != undefined){
    dispatch(splashActions.setHtmlCode(undefined))
    const last = basicPortal.image.url?.lastIndexOf("/") || 0
    const current = basicPortal.image.url?.substring(last+1)
    await uploadImage(file,"portada",current).then(res=>{
        setSubmit(!submit)
        setFile(undefined)
        // console.log("uploading")
        dispatch(splashActions.setSplashData({
          ...basicPortal,
          image:{
              ...basicPortal.image,
              url:res
          }
      }))
    })
  }else {
    dispatch(splashActions.setHtmlCode(undefined))
    getHtmlFromApi()
  }
}
const applyChangesImageBackground = async() =>{
  if(fileImgBackground != undefined){
    dispatch(splashActions.setHtmlCode(undefined))
    const last = basicPortal.properties.image_background?.lastIndexOf("/") || 0
    const current = basicPortal.properties.image_background?.substring(last+1)
    await uploadImage(fileImgBackground,"background",current).then(res=>{
        setSubmit(!submit)
        setFile(undefined)
        // console.log("uploading image background",res)
        dispatch(splashActions.setSplashData({
          ...basicPortal,
          properties:{
              ...basicPortal.properties,
              image_background:res
          }
      }))
    })
  }else {
    dispatch(splashActions.setHtmlCode(undefined))
    getHtmlFromApi()
  }
}

const removeImageBackground = async() =>{
  dispatch(splashActions.setSplashData({
    ...basicPortal,
    properties:{
        ...basicPortal.properties,
        image_background:""
    }
   }))
   setImageBackground({...imageBackground,url:""})
   setSubmit(!submit)
}
const applyChangesLogo = async() =>{
  if(fileLogo != undefined){
    const last = basicPortal.logo.url?.lastIndexOf("/") || 0
    const current = basicPortal.logo.url?.substring(last+1)
    dispatch(splashActions.setHtmlCode(undefined))
    await uploadImage(fileLogo,"logo",current).then(res=>{
        // console.log("uploading")
        setSubmit(!submit)
        setFileLogo(undefined)
        dispatch(splashActions.setSplashData({
          ...basicPortal,
          logo:{
              ...basicPortal.logo,
              url:res
          }
      }))
    })
  }else {
    dispatch(splashActions.setHtmlCode(undefined))
    getHtmlFromApi()  
  }
}



// const applyImage = async()=>{
//   if(fileLogo != undefined){
//   await uploadImage(fileLogo,"logo").then(res=>{
//     // console.log("uploading")
//     // setSubmit(!submit)
//     setFileLogo(undefined)
//     dispatch(splashActions.setSplashData({
//       ...basicPortal,
//       logo:{
//           ...basicPortal.logo,
//           url:res
//       }
//   }))
// })
// }
// if(file != undefined){
//   await uploadImage(file,"portada").then(res=>{
//     console.log("uploading")
//     // setSubmit(!submit)
//     setFileLogo(undefined)
//     dispatch(splashActions.setSplashData({
//       ...basicPortal,
//       image:{
//         ...basicPortal.image,
//         url:res
//       }
//     }))
//   })
// }
// setSubmit(true)
// }



  useEffect(()=>{
      // console.log('submit')
      getHtmlFromApi()
  },[submit])

  useEffect(()=>{
    updatedIFrame()
  },[htmlCode])

  useEffect(()=>{
    if(execute){
      console.log(file,fileLogo)
      // if(file == undefined && fileLogo == undefined){
        dispatch(saveSplashPage())
      // }else{
        // setShowDialog(true)
        // dispatch(uiActions.setExecute(false))
      // }
    }
  },[execute])



  return(
    <>
    {showDialog&&
     <DialogConfirmation
     title="Hay cambios hechos sin guardar. ¿Desea guardarlos?"
     descripcion="Los cambios realizados serán guardados si decide continuar."
     openModal={showDialog}
     closeModal={()=>setShowDialog(false)}
     buttonText2="Guardar cambios"
     descartar={()=>setShowDialog(false)}
     performAction={async()=>{
       dispatch(uiActions.setLoading(true))
       dispatch(uiActions.setOpenDialog(false))
       setShowDialog(false)
      // await applyImage()
      dispatch(uiActions.setLoading(false))
      dispatch(uiActions.setOpenDialog(true))
     }}
     />
    }
    <div className="grid gap-y-3 w-full">
        {/* {basicPortal != undefined && */}
        <div className="lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-3 w-full">
          
          <div className="lg:col-span-1 xl:col-span-2 overflow-auto h-[91vh]">
            <div>
            <h2 className="title text-center text-xl underline">Portal Cautivo</h2>
                  <div className="flex space-x-4">
                    <ColorEdit
                    onChangeColor={(e)=>{
                      onChangeColor("color",e)
                    }}
                    label="Color"
                    color={basicPortal.properties.color}
                    apply={applyChangeColor}
                    />
                    <ColorEdit
                    onChangeColor={(e)=>{
                      onChangeColor("background",e)
                    }}
                    label="Fondo"
                    color={basicPortal.properties.background}
                    apply={applyChangeColor}
                    />
                     <ColorEdit
                    onChangeColor={(e)=>{
                      onChangeColor("text_color",e)
                    }}
                    label="Text color"
                    color={basicPortal.properties.text_color}
                    apply={applyChangeColor}
                    />
                    </div>
                  {/* } */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2  gap-4 mt-3">
                    <ImageEdit
                    image={portada}
                    onChange={onChangeImage}
                    id="image"
                    applyChanges={applyChanges}
                    />
                    <ImageEdit
                    image={basicPortal?.logo}
                    onChange={onChangeLogo}
                    applyChanges={applyChangesLogo}
                    id="logo"
                    />

                    <ImageEdit
                    image={imageBackground}
                    onChange={onChangeImageBackground}
                    applyChanges={applyChangesImageBackground}
                    id="background"
                    noEdit={true}
                    deleteEnabled={true}
                    remove={removeImageBackground}
                    />
                    
                    </div>
            </div>


      </div>

      <div id="iframe-container" className="relative h-screen lg:h-full border-l-2">
        {/* <iframe onChange={(e)=>console.log(e)} className= "w-full h-screen justify-center flex relative"
        src="/transporte2.html"></iframe> */}
        {(htmlCode == undefined) ?
        <div className= " flex fixed animate-pulse bg-gray-400 w-full h-screen lg:h-full "/>
         :
        <iframe className= "w-full h-full  flex relative"
        src={basicPortal.portal.url}
        id="myiframe"></iframe>
        }
      </div>

      </div>
    </div>
    </>
  )
}

export default NoCodeEditor;