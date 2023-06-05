import '../css/SideNavbar.css'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ReactComponent as Dashboard } from '../img/dash12.svg'
import { ReactComponent as Job } from '../img/job.svg'
import { useSelector } from 'react-redux'

export const SideNavbar = props => {
  const { user } = useSelector(state => state.user)

  const location = useLocation()

  return (
    <>
      <aside
        style={{ width: '15%', background: 'rgb(250,250,250)' }}
        className={`overflow-y-hidden border-1 border-gray-100 fixed z-10 top-0`}
        aria-label='Sidebar'
        id='side-bar-menu'
      >
        <div className='h-screen rounded dark:bg-gray-800'>
          <div
            style={{
              display: 'flex',
              height: '9%',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '1px solid rgb(243,244,246)'
            }}
          >
            <a
              href='/dashboard/home'
              className='flex items-center text-blue-600 hover:text-blue-600'
            >
              <img
                src={require('./../img/bgsidebar.jpeg')}
                className='w-28'
                alt='AZH'
              />
            </a>
          </div>
          <ul className='space-y-2 px-3' style={{ marginTop: '2.7rem', listStyleType:'none' }}>
           {(user.role === 'organization' || user.role ==='institute') && <li className=''>
              <Link
                to='/dashboard/insights'
                className={`flex items-center px-2.5 py-2.5 text-base font-normal rounded-lg text-gray-800 ${
                  location.pathname.includes('insights')
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <Dashboard className='' fill='CurrentColor' />
                <span className='md:hidden block 2xl:block flex-1 ml-4 whitespace-nowrap'>
                  Insights
                </span>
              </Link>
            </li>}
            

           
            <li className=''>
              <Link
                to='/dashboard/messenger'
                className={`flex items-center px-2.5 py-2.5 text-base font-normal rounded-lg text-gray-800 ${
                  location.pathname.includes('messenger')
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <Job className='' fill='CurrentColor' />
                <span className='md:hidden block 2xl:block flex-1 ml-4 whitespace-nowrap'>
                  Messenger
                </span>
              </Link>
            </li>
            {(user.role === 'organization' || user.role ==='institute') &&<li className=''>
              <Link
                to='/dashboard/jobs'
                className={`flex items-center px-2.5 py-2.5 text-base font-normal rounded-lg text-gray-800 ${
                  location.pathname.includes('jobs')
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <Job className='' fill='CurrentColor' />
                <span className='md:hidden block 2xl:block flex-1 ml-4 whitespace-nowrap'>
                  Jobs
                </span>
              </Link>
            </li>}
            {(user.role === 'organization' || user.role ==='institute') &&<li className=''>
              <Link
                to='/dashboard/applicants'
                className={`flex items-center px-2.5 py-2.5 text-base font-normal rounded-lg text-gray-800 ${
                  location.pathname.includes('applicants')
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <Job className='' fill='CurrentColor' />
                <span className='md:hidden block 2xl:block flex-1 ml-4 whitespace-nowrap'>
                  Applicants
                </span>
              </Link>
            </li>}
            {/* {(user.role === 'student' || user.role ==='researcher') &&<li className=''>
              <Link
                to='/dashboard/user/jobs/view'
                className={`flex items-center px-2.5 py-2.5 text-base font-normal rounded-lg text-gray-800 ${
                  location.pathname.includes('/dashboard/user/jobs/view')
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <Job className='' fill='CurrentColor' />
                <span className='md:hidden block 2xl:block flex-1 ml-4 whitespace-nowrap'>
                  User Job
                </span>
              </Link>
            </li> } */}
           {(user.role === 'student' || user.role ==='researcher') && <li className=''>
              <Link
                to='/dashboard/user/jobs'
                className={`flex items-center px-2.5 py-2.5 text-base font-normal rounded-lg text-gray-800 ${
                  location.pathname.includes('jobs')
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <Job className='' fill='CurrentColor' />
                <span className='md:hidden block 2xl:block flex-1 ml-4 whitespace-nowrap'>
                  Jobs
                </span>
              </Link>
            </li> }
             {(user.role === 'student' || user.role ==='researcher') && <li className=''>
              <Link
                to='/dashboard/user/jobs/wishlisted'
                className={`flex items-center px-2.5 py-2.5 text-base font-normal rounded-lg text-gray-800 ${
                  location.pathname.includes('wishlisted')
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <Job className='' fill='CurrentColor' />
                <span className='md:hidden block 2xl:block flex-1 ml-4 whitespace-nowrap'>
                  Wishlisted Jobs
                </span>
              </Link>
            </li>}
          </ul>
        </div>
      </aside>
    </>
  )
}
