
interface Props{
    closeSideBar:boolean
    setCloseSideBar:(bool:boolean)=>void
}
const SideNavEditor = ({setCloseSideBar,closeSideBar}:Props) =>{

    return(
        <div className={`h-screen p-1 ${closeSideBar ? "w-72 transition-all":"w-10 transition-all"}`}>
        {closeSideBar?
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
      className="w-7 h-7" onClick={()=>setCloseSideBar(!closeSideBar)}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
       </svg>
       :
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
       stroke="currentColor" className="w-7 h-7" onClick={()=>setCloseSideBar(!closeSideBar)}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
</svg>

      }

      <div className="grid grid-cols-2 place-content-center cursor-pointer">
        <div className="border-2 p-2">Preview</div>
        <div className="border-2 p-2">HTML</div>
      </div>

      <div className="grid gap-y-1 px-2 absolute mt-2">
        <button className="button">Descartar Cambios</button>
        <button className="button">Guardar Cambios</button>
      </div>

      </div>
    )
}

export default SideNavEditor;