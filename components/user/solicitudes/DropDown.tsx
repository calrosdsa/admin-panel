import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useAppDispatch } from '../../../context/reduxHooks'
import { changeSolicitudState } from '../../../context/actions/userActions'

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}
interface Props {
  ids: string[]
}
export default function DropDown({ids}:Props) {
  const isDisabled = ids.length == 0
  const disabledButton = isDisabled && "disabled"
    const dispatch = useAppDispatch()
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="space-x-2 flex items-center noselect button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
           </svg>
            <span >Acciones</span>
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
        <Menu.Items className="absolute z-10 mt-2 w-56 overflow-y-auto bg-white shadow-lg ring-1 ring-black h-40
         ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                disabled={isDisabled}
                onClick={()=>dispatch(changeSolicitudState("En revicion"))}
                  className={classNames(
                    active ? 'bg-gray-200 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm w-full text-left',
                    disabledButton
                  )}
                >
                Marcar como pendiente
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                disabled={isDisabled}
                onClick={()=>dispatch(changeSolicitudState("Habilitado"))}
                  className={classNames(
                    active ? 'bg-gray-200 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm w-full text-left',
                    disabledButton
                  )}
                >
                Habilitar solicitud
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                disabled={isDisabled}
                onClick={()=>dispatch(changeSolicitudState("Deshabilitado"))}
                  className={classNames(
                    active ? 'bg-gray-200 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm w-full text-left',
                    disabledButton
                  )}
                >
                Deshabilitar solicitud
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  disabled={isDisabled}
                  onClick={()=>dispatch(changeSolicitudState("Rechazado"))}
                  className={classNames(
                    active ? 'bg-gray-200 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm w-full text-left',
                    disabledButton
                  )}
                >
                Rechazar solicitud
                </button>
              )}
            </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                  disabled={isDisabled}
                  onClick={()=>dispatch(changeSolicitudState("Eliminado"))}
                  className={classNames(
                    active ? 'bg-gray-200 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm w-full text-left',
                    disabledButton
                  )}
                >
                Eliminar solicitud
                </button>
                )}
              </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
