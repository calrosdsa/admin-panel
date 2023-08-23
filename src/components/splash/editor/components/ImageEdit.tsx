import { useAppDispatch } from "@/context/reduxHooks";
import { splashActions } from "@/context/slices/splash-slice";
import { ImagePortal } from "@/data/models/redux-models/splash-data";
import { shimmer, toBase64 } from "@/utils";
import Image from "next/image";
import { ChangeEvent, ChangeEventHandler, useEffect } from "react";

interface Props {
    image?:ImagePortal
    onChange:(e:any)=>void
    id:string
    applyChanges:()=>void
    noEdit?:boolean
    deleteEnabled?:boolean
    remove?:()=>void
}

const ImageEdit = ({image,onChange,id,applyChanges,noEdit = false,deleteEnabled = false,remove}:Props) =>{   
    useEffect(()=>{
        console.log(image?.width)
    },[])
    return(
        <div >
            <div className="card">
             <Image
      alt="Mountains"
      src={image?.url || "/images/placeholder-image.webp"}
      className="h-44 object-contain"
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(400, 275))}`}
      width={400}
      height={275}
        />
        <span className="h-5"/>

        <div className="py-5 border-t-2 flex  w-full justify-between">
        <div>
            <input type="file" id={id} className="hidden" onChange={onChange}
            accept="image/png, image/jpeg"/>
            <label htmlFor={id} className="buttonPrimary">
                Subir otra imagen
            </label>
        </div>

        {(deleteEnabled && image?.url != "") &&
        <div>
            <button className="buttonPrimary" onClick={remove}
            >Remover imagen</button>
        </div>
        } 
        </div>


        {!noEdit &&
        <div className="grid grid-cols-2 gap-2 place">
        <div className="grid ">
        <span>Alto</span>
        <div className=" rounded-lg border-[1px] border-gray-400 flex items-center pl-2 h-9">
        <input type="text"  className=" outline-none" value={image?.height}
        onChange={onChange} name="height"/>
        <select name="" className=" outline-none bg-gray-300 h-[34px] rounded-r-lg w-[37px] " id="">
            {/* <option value="%">%</option> */}
            <option value="px">px</option>
        </select>
        </div>
        </div>
        <div className="grid ">
        <span>Fit</span>
        <select className="input" name="object_fit" id="" 
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
            {/* <option value="px">px</option> */}
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
            <button onClick={applyChanges} className="buttonPrimary">Apply</button>
        </div>
        </div>
        </div>
    )
}

export default ImageEdit;