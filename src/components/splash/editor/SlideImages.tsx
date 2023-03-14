import { useAppSelector } from '@/context/reduxHooks';
import { uploadImage } from '@/utils/uploadImage';
import axios from 'axios';
import { Button, Card, TextInput } from 'flowbite-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { toast } from 'react-toastify';
import UploadMedia from './UploadMedia';

  
  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px'
  }
  
  type ImageSlider = {
    url?:string
    titulo: string | null | undefined
    descripcion: string | null | undefined
    index:number
  }
  
  interface Props {
    htmlCode:string | undefined
  }
  const SlideImages = ({htmlCode}:Props) => {
    const [images,setImages] = useState<(ImageSlider)[]>([])
    // const splashState = useAppSelector(state=>state.splash)
    const base_url = process.env.PUBLIC_URL

    const appendImage = (imgs:string[])=>{
      imgs.filter(item => item != undefined).map((item,index)=>{
        console.log(typeof item)
        const titulo = document.querySelector(`#img-t-${index}`)
        const descripcion = document.querySelector(`#img-d-${index}`)
        const image = {url:item,titulo:titulo?.textContent,descripcion:descripcion?.textContent,index:index}
          console.log("-------------",image)
          setImages((value)=>[...value,image])
      })

    }

    const onChangeImageFondo = async(e:React.ChangeEvent<HTMLInputElement>,id:string,idx:number) => {
      console.log("eqweqw")
      const imageBack:any = document.querySelector(id)
      console.log(imageBack)
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
              uploadImage(formData).then(res=>{
                const imgHref:string = res.data
                const image = {...images[idx],url:imgHref}
                const newArray = images.filter((_,index)=>index != idx)
                setImages([image,...newArray])
                imageBack.src = imgHref
              })
            
              toast.update(id, {render:"La carga de la imagen se ha realizado con éxito.",type: "success", isLoading: false,autoClose:5000,
              position:"bottom-center"});
              
            }catch(err:any){
               toast.update(id, {render:err.message, type: "error", isLoading: false ,autoClose:5000,position:"bottom-center"});
            }
          }
          return
      } 
  }
  const onChangeText = async(e:React.ChangeEvent<HTMLInputElement>,id:string)=>{
    const textElement = document.querySelector(id)
    if(textElement != undefined){
      textElement.textContent = e.target.value
    }
  }

  const addNewCard = (htmlContent:string,indicatorContent:string) =>{
    console.log(htmlContent)
    console.log(indicatorContent)
    if(images.length < 4){
    const indicatorWrapper = document.querySelector(`#indicatorWrapper`)
    indicatorWrapper?.insertAdjacentHTML('beforeend',indicatorContent)
    const wrapper = document.querySelector("#imageWrapper")
    wrapper?.insertAdjacentHTML('beforeend',htmlContent)
    console.log(images.length)
      const newImage = {url:"https://teclu-portal.s3.sa-east-1.amazonaws.com/media/Yellow-Logo-512-x-512-trans.png",
      titulo:"New card",descripcion:"Add description to image",index:images.length}
      setImages([...images,newImage])
    }
  }

  const removeImageFromCard = (id:string,index:number) =>{
    document.querySelector(id)?.remove()
    document.querySelector(`#img-indicator-${index}`)?.remove()
    console.log(images)
    const newArrayImages= images.filter(item=>item.index!= index)
    setImages(newArrayImages)
  }

    useEffect(()=>{
      setImages([])
      const image:any = document.querySelector("#image-0") || ""
      const image2:any = document.querySelector("#image-1") || ""
      const image3:any = document.querySelector("#image-2") || ""
      const image4:any = document.querySelector("#image-3") || ""
      if(htmlCode != undefined){
        appendImage([image.src,image2.src,image3.src,image4.src])
      }
      // image != null &&  setImages([...images,image.src])
      // image2 != null &&  setImages([...images,image2.src])
    },[htmlCode])
    return (
      <>
      {images.length > 1 &&
        <div className="pt-2">
          <span className="text-xl font-semibold">Editar Slide images</span>
        <div className="flex  overflow-auto space-x-3 p-3">
      {images.length != 0 &&
           images.sort((a,b)=>a.index - b.index).map((item, index)=> (
             <div key={index} className="">
                <div className=' flex justify-center items-center'>
                  <Card className='flex items-center relative'>
                    <div className='w-64 h-64 p-2'>
                    {index > 1 && images.length == (index + 1) && 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                        onClick={()=>removeImageFromCard(`#image-content-${item.index}`,item.index)}
                        strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 absolute right-2 top-2 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    }
                    {/* <Image
                    src={item.url as string}
                    height={350}
                    width={350}
                    alt={item.url as string}
                  /> */}
                     <UploadMedia
                      originSource={item.url}
                      source={item.url}
                      onChange={(e)=>onChangeImageFondo(e,`#image-${item.index}`,item.index)}
                      text="Sube una imagen"
                      id={`image-l-${item.index}`}
                      />
                    </div>
                    <div>
                      <TextInput
                      className='p-2'
                      defaultValue={item.titulo as string}
                      onChange={(e)=>onChangeText(e,`#img-t-${item.index}`)}
                      // value={item.titulo as string}
                      />
                      <TextInput
                      defaultValue={item.titulo as string}
                      className='p-2'
                      onChange={(e)=>onChangeText(e,`#img-d-${item.index}`)}
                      // value={item.titulo as string}
                      />
                  </div>

                  </Card>
                </div>
              </div>
            ))
          }
          {images.length < 4 &&
        <Card onClick={()=>addNewCard(`<div id="image-content-${images.length}" 
        class="u-carousel-item u-effect-fade u-gallery-item u-carousel-item-${images.length + 1}" data-image-width="1280" 
        data-image-height="640">
        <div class="u-back-slide">
        <img id="image-${images.length}" class="u-back-image u-expanded" 
                          src="https://teclu-portal.s3.sa-east-1.amazonaws.com/media/vbvbvb-min.jpg" alt="Croissant">
                        </div>
                        <div class="u-align-center u-over-slide u-shading u-valign-bottom u-over-slide-${images.length + 1}">
                        <h3 id="img-t-${images.length}" class="u-gallery-heading">Croissant22222</h3>
                        <p id="img-d-${images.length}" class="u-gallery-text">Butter, flour, sugar, salt, yeast, and milk</p>
                        </div>
                        </div>`,` <li id="img-indicator-${images.length}" data-u-target="#carousel-f035" data-u-slide-to="${images.length}" 
                        class="u-grey-70 u-shape-rectangle" style="width: 30px; height: 3px;"></li>`)}>
        <div className='w-64 h-64 flex justify-center items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className="w-16 h-16 text-gray-500 cursor-pointer">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        </div>
        </Card>
        }

        </div>
        </div>   
      }
        </>
      )
  }

  export default SlideImages;