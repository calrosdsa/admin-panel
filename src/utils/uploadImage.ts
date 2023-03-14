import axios from "axios"

const base_url = process.env.PUBLIC_URL
export const uploadImage = async(formData:FormData)=>{
    const response = await axios.post(`${base_url}/upload/converter/`,formData)
    // const da = response.data
    return response
}