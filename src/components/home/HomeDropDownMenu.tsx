import { Fragment, ReactNode } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Translate } from 'next-translate'

function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
}

interface Props {
    t:Translate
}
export default function HomeDropDownMenu({t}:Props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        
        <Menu.Button className="space-x-1 flex items-center">
        <span className='font-semibold'>{t('language')}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
        stroke="currentColor" className="w-5 h-5 text">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
          {/* <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" /> */}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
    <Menu.Items className="absolute z-10 mt-2 right-0 w-56 overflow-y-auto bg shadow-lg ring-1 ring-black h-40
         ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                className={classNames(
                    active ? 'hoverText text-gray-900' : 'text',
                    'block px-4 py-2 text-sm w-full text-left',
                  )}
                >
                Ver archivo
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                className={classNames(
                    active ? 'hoverText text-gray-900' : 'text',
                    'block px-4 py-2 text-sm w-full text-left',
                  )}
                >
                Descargar archivo
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                className={classNames(
                    active ? 'hoverText text-gray-900' : 'text',
                    'block px-4 py-2 text-sm w-full text-left',
                  )}
                >
                Editar archivo
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                className={classNames(
                    active ? 'hoverText text-gray-900' : 'text',
                    'block px-4 py-2 text-sm w-full text-left',
                  )}
                >
                Eliminar archivo
                </button>
              )}
            </Menu.Item>

          </div>
        </Menu.Items>
      </Transition>
   
    </Menu>
  )
}
