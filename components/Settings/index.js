import React, { useState } from 'react'
import ViewProfile from './ViewProfile'
import EditProfile from './EditProfile'
import './setting.css'

const Settings = () => {
  const [tabIndex, setTabIndex] = useState(1)

  return (
    <div className='pt-3 px-3'>
      <h3 className='text-2xl font-semibold dark:text-white'>
        Profile Settings
      </h3>
      <small>On this page you can view and update your profile</small>
      <div className='border-b border-gray-200 dark:border-gray-700'>
        <ul className='gap-2 flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400' style={{listStyleType:'none'}}>
          <li className=''>
            <span
              href='#'
              className={`inline-flex p-4 rounded-t-lg border-b-2 group cursor-pointer ${
                tabIndex === 1
                  ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              }`}
              onClick={() => {
                setTabIndex(1)
              }}
            >
              <svg
                className={`mr-2 w-5 h-5 ${
                  tabIndex === 1
                    ? 'text-blue-600 dark:text-blue-500'
                    : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300'
                }`}
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <span className='hidden md:block'>View</span>
            </span>
          </li>
          <li className=''>
            <span
              href='#'
              className={`inline-flex p-4 rounded-t-lg border-b-2 group cursor-pointer ${
                tabIndex === 2
                  ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              }`}
              onClick={() => {
                setTabIndex(2)
              }}
            >
              <svg
                className={`mr-2 w-5 h-5 ${
                  tabIndex === 2
                    ? 'text-blue-600 dark:text-blue-500'
                    : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300'
                }`}
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'></path>
              </svg>
              <span className='hidden md:block'>Edit</span>
            </span>
          </li>
        </ul>
      </div>

      <div>
        {tabIndex === 1 && <ViewProfile />}

        {tabIndex === 2 && <EditProfile />}
      </div>
    </div>
  )
}

export default Settings
