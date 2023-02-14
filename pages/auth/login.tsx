// import { login } from '../../context/actions/auth-actions'
import RegisterLayer from '../../components/layout/RegisterLayer'
// import useRouter from 'next/router'
import { useState,useEffect,useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../context/reduxHooks'
import InputComponent from '../../components/InputComponent';
import { login } from '../../context/actions/authActions';
import { authActions } from '../../context/slices/auth-slice';

const LoginPage = () => {
    // const dispatch=useAppDispatch();
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null);
    const authState = useAppSelector(state=>state.auth)
    // const router = useRouter();
    const isAuthenticated=useAppSelector(state=>state.auth.isAuthenticated);
    const dispatch = useAppDispatch()
    const [show, setShow] = useState<boolean>(false)
    const uiState = useAppSelector(state=>state.ui)
    const [formData,setFormData] = useState({
        email: "",
        password: "",
      })
    const { email, password} = formData;
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
      dispatch(authActions.setErrrorLogin(undefined))
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }

    const onSubmit = (e:any) =>{
      e.preventDefault()
      dispatch(login(email,password))
    }

    useEffect(()=>{
      if(isAuthenticated){
        //  router.push('/casos')
      }
    },[isAuthenticated])

    return(
        <RegisterLayer>
<div className="bg-white opacity-90 ">

  <div className="px-3 sm:px-10  pt-4 pb-8 bg-white rounded-tr-4xl">
      <div className='flex  md:grid-cols-3  pb-5 items-center'>
    <h1 className="text-xl mx-auto font-semibold text-gray-900">Log in</h1>
      </div>
 {
   uiState.errorMessage !=null &&
   <span className='text-red-600 absolute'>{uiState.errorMessage}</span>
  }
    <form
    onSubmit={onSubmit}
    className="mt-2 ">

    <InputComponent
    onChange={onChange}
    tipo='email'
    onKeyPress={(e)=>{
      if(e.key == 'Enter'){
          passwordRef.current?.focus()
      }
    }}
    name='email'
    errorMessage={authState.errorLogin?.email}
    titulo='Email'
    value={email}
    ref={emailRef}
    />

{/* <InputComponent
    onChange={onChange}
    tipo='password'
    onKeyPress={(e)=>{
      if(e.key == 'Enter'){
          // passwordRef.current?.focus()
      }
    }}
    name='password'
    titulo='Password'
    value={password}
    ref={passwordRef}
    />
       */}
      <div className="relative mt-7">
        <input 
        required
        ref={passwordRef}
        onKeyDown={(e)=>{
          if(e.key == 'Enter'){
            // dispatch(login(email,password))
          }
        }}
        value={password}
        onChange={onChange}
        id="password" name="password" type={show? 'text':`password`}
        className="border-b-2  peer  p-2  h-14 w-full
        border-gray-500 
        text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-500 "
        placeholder="john@doe.com" />
        <label htmlFor='password' className="absolute left-2  text-gray-500 transition-all
        peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500  -top-1
        peer-placeholder-shown:top-4
        peer-focus:-top-1 peer-focus:text-gray-500 peer-focus:text-sm">Password</label>
          <span onClick={()=>setShow(!show)} className=' cursor-pointer absolute right-3 underline text-sm top-4 '>Show</span>
          {authState.errorLogin?.password != undefined &&
                 <span className="text-red-500 pl-2 absolute left-0 text-sm -bottom-5 line-clamp-1"
                 >*{authState.errorLogin?.password}</span>
                }
      </div>
      
      <button type='submit'disabled={uiState.loading}
          className={`mt-7 px-4 py-2 roundedbg-primary text-white font-semibold bg-primary
          text-center block w-full 
          cursor-pointer ${uiState.loading && 'opacity-50'}`}
          // onClick={()=>dispatch(login(email,password))}
          >
            <div className='flex items-center justify-center p-1'>
            {uiState.loading ?
              <svg aria-hidden="true" className="mr-2 w-7 h-7 text-gray-200 animate-spin 
              dark:text-gray-200 fill-red-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
       <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        :
       <span className="text-lg px-2">Log in</span>
      }
            </div>
        </button>
    </form>

   <div className='mt-2'>
    <span onClick={()=>{
      // router.push('/auth/reset-password')
      // axios.post(`${API_URL}/auth/reset-request/`,{email})
    }} 
    className=' font-semibold primary cursor-pointer'>forgot you password?</span >
    {/* <div className=" border-b-2 w-full py-2"/> */}
    </div>
  </div>
</div>

      </RegisterLayer>
)
}

export default LoginPage

