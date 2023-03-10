
interface Props {
    children:React.ReactNode
}
const CreatePortalLayout = ({children}:Props) =>{

    return(
        <div className="grid xl:grid-cols-2 h-screen overflow-auto">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative h-[40vh] xl:h-full">
                <span className="text-white font-semibold text-4xl text-center
                 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    Añade tu página de bienvenida
                </span>
            </div>
            <div className="relative pb-20 ">
            {children}
            </div>
            
        </div>
    )
}

export default CreatePortalLayout;