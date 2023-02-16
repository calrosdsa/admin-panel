import {  Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import Link from 'next/link';
import SideNavContent from './menu/SideNavContent';
interface Props{
    open:boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Menu:React.FC<Props> = ({open,setOpen}) =>{
  const downloadReport = async() =>{
    const token = localStorage.getItem('token')
    console.log(token)
   await axios.get('https://teclu.com/apiFB/public//facebook/report',{
      headers:{
        'Authorization':`Bearer ${token}`
      },
      responseType: 'blob'
    }).then((response)=>{
      console.log(response.data)
      const type = response.headers['content-type']
      const url = window.URL.createObjectURL(new Blob([response.data], { type: type}));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reporte.pdf`); //or any other extension
      document.body.appendChild(link);
      link.click();
  })
    // const link = document.createElement('a')
    // link.href ='https://teclu.com/apiFB/public//facebook/report'
    // link.click()
  }


    return(
      <Transition.Root show={open} as='div'>
      <Dialog 
        as='div'
        className='fixed  inset-0 overflow-hidden xl:hidden'
        onClose={setOpen}
      >
        <div className='absolute inset-0 overflow-hidden'>
          <Transition.Child
            as='div'
            enter='ease-in-out duration-500'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in-out duration-500'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='absolute bg-black opacity-25 inset-0 transition-opacity' />
          </Transition.Child>
          <div className='fixed inset-y-0  left-0 w-2/3 top-10  sm:w-3/6 md:w-2/5 xl:w-1/6 flex'>
            <Transition.Child
              as='div'
              enter='transform transition ease-in-out duration-500 sm:duration-700'
              enterFrom='-translate-x-full'
              enterTo='-translate-x-0'
              leave='transform transition ease-in-out duration-500 sm:duration-700'
              leaveFrom='-translate-x-0'
              leaveTo='-translate-x-full'
            >
              <div className='relative max-w-lg'>
                <Transition.Child
                  as='div'
                  enter='ease-in-out duration-500'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-500'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4'>
                    <button
                      type='button'
                      className='rounded-md text-indigo-600 hover:text-white focus:outline-none focus:ring-2
                       focus:ring-indigo-300'
                      onClick={() => setOpen(!open)}>
                      <span className='sr-only'>Close panel</span>
                    </button>
                  </div>
                </Transition.Child>
                <div className='h-full flex  flex-col w-full bg-white shadow-xl overflow-y-scroll'>
                <div className='flex space-x-4 items-center px-4 sm:px-6'>
                  {/* <Dialog.Title className='text-2xl font-bold text-indigo-500'>
                    <h1>Portal Cautivo</h1>
                  </Dialog.Title> */}
                
                </div>
               <SideNavContent/>
              </div>
              </div>
          </Transition.Child>
          </div>
      </div>
      </Dialog>
      </Transition.Root>
       
    )
}

export default Menu;