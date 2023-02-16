import { useState } from "react";
import  SideNavContent from './SideNavContent';

export default function Sidenav() {
  return (

    <div className= {`bg-white h-screen overflow-auto  z-10 shadow-xl min-w-[250px] hidden xl:block`}>
    
      <SideNavContent />

  </div>
  )
}
