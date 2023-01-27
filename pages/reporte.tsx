import Image from "next/image";
import Layout from "../components/layout/Layout";


const Reporte = ()=>{

    return(
        <Layout title="Panel Admin">
        <div className="grid grid-cols-1 place-items-center h-screen w-full">
            <Image
            src="/images/logo.png"
            alt="logo"
            />
        </div>
        </Layout>
    )
}

export default Reporte;