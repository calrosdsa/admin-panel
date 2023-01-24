import { Switch } from '@headlessui/react'
interface Props{
    isChecked:boolean
    title:string
    onChange:(e:boolean)=>void
}
const SwitchComponent = ({isChecked,onChange,title}:Props)=>{

    return(
        <div className='grid grid-cols-6 xl:w-2/3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className="w-6 h-6 place-self-center">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
         <span className='font-semibold col-span-4'>{title}</span>
         {/* <p className='text-[13px] leading-3'>Los usuarios con rol de administrador tendrán el control total.
          Pueden modificar la configuración, las personas y las áreas.</p> */}

            <div className="">
      <Switch
        checked={isChecked}
        onChange={onChange}
        className={`${isChecked ? 'bg-primary' : 'bg-gray-400'}
          relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${isChecked ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
          </div>
    )
}

export default SwitchComponent;