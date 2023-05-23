import ColorPaletteDialog from "@/components/dialog/ColorPaletteDialog";
import { useState } from "react";
import { Color } from "react-color-palette";

interface Props{
    color:Color
    onChangeColor:(e:Color)=>void
    title:string
}
const ColorPicker = ({color,onChangeColor,title}:Props) =>{
    const [openPalette,setOpenPalette] = useState(false)   

    return(
        <>
            {openPalette&&
            <ColorPaletteDialog
            closeDialog={()=>setOpenPalette(false)}
            open={true} 
            onChangeColor={(e: Color)=> {
                onChangeColor(e)
            } } color={color}/>
        }
        <div className="grid gap-y-1">
        <span className=" font-semibold">{title}</span>
        <div className=" flex space-x-3 items-center">
        <span style={{background:color.hex}} className={` h-5 w-8 rounded-md`}/>
        <span className="underline cursor-pointer" onClick={()=>setOpenPalette(true)}>{color.hex}</span>
        </div>
        </div>
        </>
    )
}

export default ColorPicker;