import axios from "axios"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface Props{
    src:string
    id:string
}
const ImageEdit = ({src,id}:Props)=>{
  const base_url = process.env.PUBLIC_URL

  const fileRef = useRef<HTMLInputElement>(null)
  const [contentBase64, setContentBase64] = useState("")
  const [fileName,setFileName] = useState<string | undefined>(undefined)
  
 
  
  const onChange = async(e:React.ChangeEvent<HTMLInputElement>) =>{
    console.log(id)
    console.log(src)
    const imgLogo:any = document.querySelector(id)
    console.log(imgLogo)
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData()
      formData.append("file",e.target.files[0])
      const response = await axios.post(`${base_url}/upload/media/`,formData)
      const imgHref = response.data
      // console.log(response)
      // const imgHref = URL.createObjectURL(e.target.files[0])
      setContentBase64(imgHref)
      imgLogo.src = imgHref
      const fileN = getInputFileName()
      setFileName(fileN)
    }
  }
  const getInputFileName = ()=>{
    let fullPath = fileRef.current?.value
    if (fullPath) {
      let startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
      let filename = fullPath.substring(startIndex);
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
          filename = filename.substring(1);
      }
      return filename
  }
  }
  const clearInput = async() =>{
    const file = fileRef.current
    if (file?.files != undefined && file.files[0].name != fileName){
      // console.log(fileName)
      // console.log(file?.files[0].name)
      const formData = new FormData()
      formData.append("file",file.files[0])
      await axios.post(`${base_url}/delete/media/`,formData)
    }
    setFileName(undefined)
    if(fileRef.current != null){    
        fileRef.current.value = ""
    }
    const image:any = document.querySelector(id)
    image.src = src
    setContentBase64(src)
    console.log(fileRef.current?.value)
  }
  useEffect(()=>{
    setContentBase64(src)
  },[src])
    return(
        <div className="grid grid-cols-2  border-2 border-gray-400 rounded-xl m-2">
            <div className="flex flex-col space-y-2 border-r-2 border-gray-400 p-2">
            <input className="hidden" ref={fileRef} type="file" id="files" onChange={onChange}/>
            <label htmlFor="files" className=" hover-effect cursor-pointer flex justify-center w-1/2 mx-auto">Select file </label>
            {fileName != undefined &&
            <div className="grid grid-cols-6 hover-effect cursor-default">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className="w-6 h-6 place-self-center">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span className="truncate  col-span-4">{fileName}</span>
            <svg xmlns="http://www.w3.org/2000/svg" onClick={clearInput}
            fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className="w-6 h-6 place-self-center cursor-pointer">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
           </svg>
            </div>
            }
            </div>
        <Image src={contentBase64}
        width={200}
        height={50}
        style={{objectFit:"contain"}}
         className="object-contain h-24" alt=""/>
        </div>
    )
}

export default ImageEdit;