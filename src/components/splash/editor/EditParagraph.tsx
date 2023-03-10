import { ChangeEvent } from "react"

interface Props {
    descripcion:string
    setValue:(s:string)=>void
    id:string
}
const EditParagraph = ({descripcion,setValue,id}:Props)=>{
    const onChange=(e:ChangeEvent<HTMLTextAreaElement>)=>{
        setValue(e.target.value)
        const textValue:any = document.querySelector(id)
        if(textValue != undefined){
            textValue.textContent = e.target.value
        }
    }
    return(
        <div className="w-full p-1">
            <textarea name="descripcion" className="p-2 rounded-lg w-full outline-primary border-2 border-gray-500"
             rows={5} value={descripcion} onChange={onChange}/>
     </div>
    )
}

export default EditParagraph;