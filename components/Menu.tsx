import {  Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
interface Props{
    open:boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Menu:React.FC<Props> = ({open,setOpen}) =>{


    return(
      <Transition.Root show={open} as='div'>
      <Dialog 
        as='div'
        className='fixed  inset-0 overflow-hidden'
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
          <div className='fixed inset-y-0  left-0 w-2/3 xl:top-[54px] sm:w-3/6 md:w-2/5 xl:w-1/4 flex'>
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
                <div className='h-full flex  flex-col w-full py-6 bg-white shadow-xl overflow-y-scroll'>
                <div className='flex space-x-4 items-center px-4 sm:px-6'>
                  <Dialog.Title className='text-2xl font-bold text-indigo-500'>
                    <h1>sjasmckasmckam</h1>
                  </Dialog.Title>
                
                </div>
                <div className='mt-0 relative h-screen  sm:w-[450px] xl:w-[320px] 2xl:w-[4] flex-1 px-4 sm:px-6'>
                  {/* Replace with your content */}
                  <div className='h-screen'>
                  <div className=" mt-10 ">
            <div className='flex cursor-pointer items-center overflow-hidden relative'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
            stroke="currentColor" className="w-12 h-12 px-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
                <h3 className='pl-16'>Home</h3>
            </div>


            <div  className='flex cursor-pointer items-center overflow-hidden relative'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="w-12 h-12 px-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
</svg>

                <h3 className='pl-16'>Casos</h3>
            </div>
            
            <div  className='flex cursor-pointer items-center overflow-hidden relative'>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
             stroke="currentColor" className="w-12 h-12 px-2 ">
   <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121
   -.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0
   18.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 
   0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
           </svg>
                <h3 className='pl-16'>Users</h3>
            </div>
            

            <div 
            className='flex cursor-pointer items-center overflow-hidden relative'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="w-12 h-12  px-2 ">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5
         0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>

                <h3 className='pl-16'>Perfil</h3>
            </div>
        </div>
                  </div>
                  {/* /End replace */}
                </div>
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