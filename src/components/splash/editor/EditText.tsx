import ColorPaletteDialog from "@/components/dialog/ColorPaletteDialog";
import { ChangeEvent, useEffect, useState } from "react";
import { Color, useColor } from "react-color-palette";

interface Props{
    titulo:string
    id:string
    colorValue:string
    setValueText:(s:string,c :string)=>void
}
const EditText = ({titulo,id,setValueText,colorValue    }:Props) =>{
    const [color, setColor] = useColor("hex", "#121212");
    const [openPalette,setOpenPalette]  = useState(false)
    const onChangeColor = (e:Color)=>{
        setValueText(titulo,e.hex)
        const textValue:any = document.querySelector(id)
        const textValue2:any = document.querySelector("#privacidad")
        textValue.style.color = e.hex
        textValue2.style.color = e.hex
        setColor(e)
    }
    const onChangeTitulo = (e:ChangeEvent<HTMLInputElement>)=>{
        setValueText(e.target.value,colorValue)
        const textValue:any = document.querySelector(id)
        if(textValue != undefined){
            textValue.textContent = e.target.value
        }
    }
   
    return(
        <>
        {openPalette &&
        <ColorPaletteDialog
        open={openPalette}
        closeDialog={()=>setOpenPalette(false)}
        onChangeColor={onChangeColor}
        color={color}
        />
        }
        <div className="grid gap-y-2 p-1">
           <input type="text" onChange={onChangeTitulo} name="titulo" value={titulo}
           className=" font-semibold borderC p-2 focus:outline-primary rounded-lg "/>
           <div className="rounded-lg borderC  flex items-center space-x-2 w-min whitespace-nowrap p-1">
            <div style={{background:colorValue}} className={`w-14 h-8 rounded-lg`}/>
            <span className="underline">{color.hex}</span>
            <span className="cursor-pointer" onClick={()=>setOpenPalette(true)}>Escoger color</span>
           </div>
        </div>
        </>
    )
}

export default EditText;