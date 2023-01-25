import Image from "next/image";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../context/reduxHooks";
import { uiActions } from "../context/slices/ui-slice";
import { useRouter } from "next/router";
export default function Home() {
  const uiState = useAppSelector(state=>state.ui)
  const dispatch = useAppDispatch()
  const router = useRouter()
 
  useEffect(()=>{
    dispatch(uiActions.setInitAnimation(false))
    setTimeout(()=>{
      router.push('./dashboard')
    },1500)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className={`grid place-items-center h-screen
    `}>
          <Image
            src='/images/teclu-logo.png'
            alt="splash-logo"
            height={100}
            width={200}
            className={`
            ${uiState.initAnimation  ? " opacity-0 transform transition-all duration-1000":
            " opacity-100 transform transition-all duration-1000"}
            `}
            />
    </div>
  );
};


//https://76.76.21.241/?cmd=login&mac=ac:12:03:9c:ae:05&essid=radius&ip=172.31.98.4&apname=40%3Ae3%3Ad6%3Acc%3A62%3Aa8&apmac=40%3Ae3%3Ad6%3Acc%3A62%3Aa8&vcname=SetMeUp-CC%3A62%3AA8&switchip=securelogin.arubanetworks.com&url=http%3A%2F%2Fwww.msftconnecttest.com%2Fredirect

//https://community.arubanetworks.com/community-home/digestviewer/viewthread?MID=16648#bmbd935f86-6b5b-4ee5-9a0d-33b606b01d67

//https://login.webhook-murex.vercel.app/swarm.cgi