import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { BookOpen, Info, Users } from 'lucide-react'

export default function DropDown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-blue-300 transition-colors">
          More
          <ChevronDownIcon 
            aria-hidden="true" 
            className="w-4 h-4 text-blue-300 mt-0.5 transition-transform ui-open:rotate-180" 
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-50 mt-3 w-48 origin-top-right rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl border border-gray-700 backdrop-blur-sm focus:outline-none"
      >
        <div className="p-1.5 space-y-1">
          <MenuItem>
            {({ focus }) => (
              <Link 
                to='/blog'
                className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  focus ? 'bg-gray-700/50 text-white' : 'text-gray-300'
                }`}
              >
                <Users className="w-4 h-4 text-blue-400" />
                Community
              </Link>
            )}
          </MenuItem>
          
          <MenuItem>
            {({ focus }) => (
              <Link 
                to='/learn'
                className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  focus ? 'bg-gray-700/50 text-white' : 'text-gray-300'
                }`}
              >
                <BookOpen className="w-4 h-4 text-blue-400" />
                Learn
              </Link>
            )}
          </MenuItem>

          <MenuItem>
            {({ focus }) => (
              <Link 
                to='/learn-more'
                className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  focus ? 'bg-gray-700/50 text-white' : 'text-gray-300'
                }`}
              >
                <Info className="w-4 h-4 text-blue-400" />
                About
              </Link>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}