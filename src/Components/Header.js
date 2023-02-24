import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Appstate } from '../App'

const Header = () => { 

  const useAppstate = useContext(Appstate);

  return (
    <div className='header sticky z-10 top-0 text-3xl flex justify-between items-center text-violet-700 font-bold p-3 border-b-2 border-gray-500' >
      <Link to={'/'}><span>Filmy<span className='text-white'>verse</span></span></Link>
      {useAppstate.login ?
        <Link to={'/addmovie'}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="material-symbols-outlined" style={{ color: 'white' }}>
              add
            </span>
            <h1 className='text-lg text-white flex items-center mr-2 cursor-pointer'><button>Add New</button></h1>
          </div>
        </Link>
        :
        <Link to={'/login'}>
          <div style={{ display: 'flex', alignItems: 'center' }}>            
            <h1 className='bg-green-500 p-2 text-lg text-white flex items-center mr-2 cursor-pointer'><button>Login</button></h1>
          </div>
        </Link>
        
      }
    </div >
  )
}

export default Header
