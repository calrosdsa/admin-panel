import Loader from "@/components/util/loaders/Loader";
import { useAppSelector } from "@/context/reduxHooks";
import { UserWifi } from "@/data/models/type/user-models";
import Image from "next/image";
import { useEffect } from "react";



interface Props{
    user:UserWifi | undefined
}
const UserDetail = ({user}:Props)=>{
    const uiState = useAppSelector(state=>state.ui)
    const validateImageNullOrBlank = (value?:string):string =>{
        console.log("value es",value)
        if(value == null || value == "") return "/images/user-icon-placeholder.webp"
        return value

    }

    return(
        <div className="grid gap-y-4 w-full relative">
            {uiState.loading &&
            <div className="h-[90vh]">
            <Loader
            className=" absolute -translate-x-1/2 top-1/2 left-1/2 -translate-y-1/2 "
            />
            </div>
            }
            {user != undefined &&
            <>
                <div className="flex flex-col items-center">
            {user.image == "" ?
            <Image
            src={validateImageNullOrBlank(user.image)}
            width={100}
            height={100}
            alt={user.image}
            className="rounded-full border-2"
            />
            :
            <Image
            src={user.image}
            width={100}
            height={100}
            alt={""}
            className="rounded-full"
            />
            
        }
            <span className="italic text-sm">{user.mail}</span>
        </div>


        <div>
            
            <div className="detailInfo">
                <span className="font-medium">Nombre</span>
                <span>{user.fullName}</span>
            </div>
            {user.birthday != "" &&
            <div className="detailInfo">
                <span className="font-medium">Fecha de Nacimiento</span>
                <span>{user.birthday}</span>
            </div>
            }
            {user.gender != "" &&
            <div className="detailInfo">
                <span className="font-medium">Genero </span>
                <span>{user.gender}</span>
            </div>
            }
            {user.ci != "" &&
            <div className="detailInfo">
                <span className="font-medium">Ci</span>
                <span>{user.ci}</span>
            </div>
            }
            {user.movil != "" &&
             <div className="detailInfo">
                <span className="font-medium">Numero</span>
                <span>{user.movil}</span>
            </div>
            }
        </div>
            <div className="grid sm:grid-cols-2 place-items-center pt-5 "> 

                {/* <div className="card w-min">
                    <span className=" font-medium">Dispositivos</span>
                    <div className="p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 002.25-2.25v-15a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 4.5v15a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    <span>{user.cantDispositivo}</span>
                    </div>
                </div>

                <div className="card w-min">
                    <span className=" font-medium">Conexiones</span>
                    <div className="p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <span>{user.cantConexion}</span>
                    </div>
                </div> */}


            </div>
        </>
}
            </div>
    )
}

export default UserDetail;