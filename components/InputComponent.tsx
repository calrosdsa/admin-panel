import { MutableRefObject } from "react";
import { forwardRef, ForwardedRef } from "react";
interface Props {
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    tipo:string,
    name:string,
    value:string,
    titulo:string,
    patron?:string
    errorMessage?:string;
    onKeyPress?:(e:any)=>void;
}
const InputComponent = (
    props:Props,
    ref:ForwardedRef<HTMLInputElement>
    // onChange,tipo,name,value,titulo,errorMessage,patron,onKeyPress
)=>{

    

    return(
       <div>
         <div className="relative mt-7">
              <input ref={ref}
              required
              onKeyDown={props.onKeyPress}
              id={props.name} name={props.name} type={props.tipo}
              pattern={props.patron}
              onChange={props.onChange} 
              value={props.value}
              className="border-b-2  peer  p-2  h-14 w-full
              border-gray-500 
              text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-500 "
              placeholder="john@doe.com" />
              <label htmlFor={props.name} className="absolute left-2  text-gray-500 transition-all
               peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500  -top-1
               peer-placeholder-shown:top-4
                peer-focus:-top-1 peer-focus:text-gray-500 peer-focus:text-sm">{props.titulo}</label>
                 <span className="text-red-500 pl-2 absolute left-0 text-sm -bottom-6 line-clamp-1"
         >{props.errorMessage}</span>
            </div>
       </div>
    )
}

export default forwardRef(InputComponent);