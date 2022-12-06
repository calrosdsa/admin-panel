import LoginButton from "./LoginButton";
import Image from "next/image";
const LandingPage = () =>{

    return(
        <div className='mx-auto fixed w-11/12 sm:w-2/3 lg:w-1/2 2xl:w-1/3 rounded-xl 
        inset-x-0 top-1/2 -translate-y-1/2 z-20 bg-white'>
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

      </div>
         </div>
    )
}

export default LandingPage;