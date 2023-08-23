import ColorPaletteDialog from "@/components/dialog/ColorPaletteDialog";
import { ContentPortal } from "@/data/models/redux-models/splash-data";
import { useState } from "react";
import { Color, useColor } from "react-color-palette";
import ColorPicker from "./ColorPicker";

interface Props{
    color:string
    onChangeColor:(value:string)=>void
    apply:()=>void
    label:string
}
const ColorEdit = ({onChangeColor,apply,label,color}:Props) =>{
    const [buttonColor, setColor] = useColor("hex",color);
    return(
        <div className="card  w-min flex space-x-5 items-center">
            <div>
        <ColorPicker
        color={buttonColor}
        onChangeColor={(e)=>{
            setColor(e)
            onChangeColor(e.hex)
        }}
        title={label}
        />
        </div>
        <button onClick={()=>apply()} className="buttonPrimary">Apply</button>
        </div>
    )
}

export default ColorEdit;