import { Dna } from "react-loader-spinner"

interface Props{
    className?:string
}
const Loader = ({className =''}:Props) =>{

    return(
        <div className={` absolute top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2 ${className}`}>
            <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
            />
        </div>
    )
}

export default Loader