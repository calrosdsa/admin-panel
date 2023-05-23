import SplashLayout from "@/components/layout/splashlayout"
import "react-toastify/dist/ReactToastify.css";
import NoCodeEditor from "@/components/splash/editor/NoCodeEditor";
import useEffectOnce from "@/utils/hooks/useEffectOnce";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import EditLayout from "@/components/layout/EditLayout";


const AddSplashPage = () =>{
    const router = useRouter()
    const base_url = process.env.PUBLIC_URL
    const [ htmlCode,setHtmlCode ] = useState<string | undefined>(undefined)
    const [value, setValue] = useState("")
    const [isCodeEditor,setIsCodeEditor] = useState(true)


  
  const getHtmlFromApi = async() =>{
    // const response = await axios.get(`http://localhost:1323/transporte3/`)
    const response = await axios.get("http://127.0.0.1:5555/test.html")
    const codeHtml = response.data
    setHtmlCode(codeHtml)
    setValue(codeHtml)
 
    // updateHtmlCode()
  }

  const createPortal = async() =>{
    const html = document.getElementById("core")?.innerHTML
    // const parsed = queryString.parse(window.location.search);  
    const formData = new FormData()
    //   parsed.edit == "html" ? formData.append('html',value) : formData.append('html',html as string)
    formData.append('html',html as string)
      formData.append('filename', 'test')
      const id = toast.loading("Porfavor espere...")
      try{
          const res =await axios.post(`${base_url}/upload/template/`,formData)
          // const res =await axios.post(`http://localhost:1323/upload2`,formData)
            toast.update(id, {render: res.data, type: "success", isLoading: false,autoClose:5000});
      }catch(err:any){
        toast.update(id, {render:err.message, type: "error", isLoading: false ,autoClose:5000});
      }
  }

  useEffectOnce(()=>{
    getHtmlFromApi()
  })


    return(
        // <SplashLayout>
        <EditLayout>
        <ToastContainer/>
            <div>
            {/* <NoCodeEditor
                // htmlCode={htmlCode}
                // isCodeEditor={isCodeEditor}
                /> */}
            </div>
        </EditLayout>
        // </SplashLayout>
    )
}

export default AddSplashPage;