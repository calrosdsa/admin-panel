import ColorPaletteDialog from "@/components/dialog/ColorPaletteDialog";
import { ContentPortal } from "@/data/models/redux-models/splash-data";
import { useState } from "react";
import { Color, useColor } from "react-color-palette";
import ColorPicker from "./ColorPicker";

interface Props{
    content:ContentPortal
    onChangeColor:(name:string,value:string)=>void
}
const ContentEdit = ({content,onChangeColor}:Props) =>{
    const [buttonColor, setColor] = useColor("hex",content.button_color);
    return(
        <div className="card  w-min">
        <ColorPicker
        color={buttonColor}
        onChangeColor={(e)=>{
            setColor(e)
            onChangeColor('button_color',e.hex)
        }}
        title="Color de los botones"
        />
        </div>
    )
}

export default ContentEdit;