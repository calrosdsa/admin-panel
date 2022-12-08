import axios from 'axios'
import LoginButton from "./LoginButton";
import Image from "next/image";
const LandingPage = () =>{
    const username = "marca"
    const password  = "201120"
    const sendToRadius = async() =>{
          const send = await axios.post("http://www.msftconnecttest.com/redirect",{username,password})
      console.log(send)
          
    }

    const sendToRadius2 = async() =>{
      const send = await axios.post("securelogin.arubanetworks.com",{username,password})
      console.log(send)
}
const sendToRadius3 = async() =>{
  const send = await axios.post("https://securelogin.arubanetworks.com",{username,password})
  console.log(send)
  
}
const sendToRadius4 = async() =>{
  const send = await axios.post("https://www.securelogin.arubanetworks.com",{username,password})
  console.log(send)
  
}


    return(
        <div className=' absolute w-11/12 sm:w-2/3 lg:w-1/2 2xl:w-1/3 rounded-xl 
         -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2 z-20 bg-white'>
            <div className="grid grid-cols-1 items-center place-items-center py-3 xl:py-10 gap-y-10 2xl:gap-y-20">      
        <Image 
      src='/images/logo.png'
      width={210}
      height={100}
      alt="logo ypfb"
      />
      <div className="grid grid-cols-1 items-center place-items-center px-10 gap-y-5">
      <h1 className="text-2xl font-bold text-center">Bienvenido al Portal Cautivo de YPFB</h1>
      <p className="p-4 border-2 border-b-gray-500 text-xs sm:text-sm md:text-base text-center"
      >Para acceder a la red debera iniciar sesion con su cuenta de facebook y posteriormente dar like a una publicacion de la 
        pagina oficial de YPFB 
      </p>
      </div>

        <div className="grid grid-cols-1 items-center place-items-center gap-y-1">
       <LoginButton/>
       <a href="https://www.freeprivacypolicy.com/live/83964b85-328e-46c5-a236-33e4fd63a5a6" 
    //    target="_blank"
        className=" underline text-facebook cursor-pointer font-medium">Politicas de Privacidad</a>
        </div>

      <button onClick={sendToRadius}>
        Send to Radius
      </button>

      <button onClick={sendToRadius2}>
        Send to Radius2
      </button>

      <button onClick={sendToRadius3}>
        Send to Radius3
      </button>

      <button onClick={sendToRadius4}>
        Send to Radius4
      </button>


      </div>
         </div>
    )
}

export default LandingPage;