import {useEffect,useRef,useContext} from 'react'
import logo from '../../assets/images/logo.png'
import new_logo from '../../assets/images/logo_new.png'
import {NavLink, Link} from 'react-router-dom'
import {BiMenu} from 'react-icons/bi'
import { AuthContext } from '../../context/authContext'

const navlinks = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/doctors',
    display: 'Find a Doctor'
  },
  {
    path: '/prediction',
    display: 'Predict'
  },
  {
    path: '/ehr',
    display: 'EHR'
  },
  {
    path: '/contact',
    display: 'Contact'
  },
]

const Header = () => {
  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const {state} = useContext(AuthContext);
  const {user,role,token} = state;
  const handleStickyHeader= ()=>{
    window.addEventListener('scroll',()=>{
      if(document.body.scrollTop >80 || document.documentElement.scrollTop >80){
        headerRef.current.classList.add('sticky_header')
      }
      else{
        headerRef.current.classList.remove('sticky_header')
      }
    })
  }

  useEffect(()=>{
    handleStickyHeader()
    return()=> window.removeEventListener('scroll', handleStickyHeader)
  })

  const toggleMenu = ()=>{
    menuRef.current.classList.toggle('show_menu')
  }



  return <header className="header" ref={headerRef}>
    <div className="container">
      <div className='flex items-center justify-between'>
        <div className='flex flex-row gap-3 items-center'>
          <img src={new_logo} className='w-[50px] h-[50px]' alt="" />
          <p>Cura-foresight</p>
        </div>
        <div className="navigation" ref={menuRef} onClick={toggleMenu}>
          <ul className="menu flex items-center gap-[2.7rem]">
            {
              navlinks.map((link,index)=> <li key={index}>
                <NavLink to={link.path} className={navClass => navClass.isActive?"text-primaryColor text-[16px] leading-7 font-[600]" : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"}>{link.display}</NavLink>
              </li>)
            }
          </ul>
        </div>
        <div className="flex items-center gap-4">
          {
            token && user ? <div >
            <Link to={`${role === 'doctor' ? '/doctors/profile/me' : '/users/profile/me'}`}>
              {/* <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
                <img src={user?.photo} className='w-full rounded-full' alt="" />
              </figure> */}
              <h2>{user?.name}</h2>
            </Link>
          </div> : <Link to='/login'>
            <button className='bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px] '>Login</button>
          </Link>
          }
          <span className='md:hidden' onClick={toggleMenu}>
            <BiMenu className='w-6 h-6 cursor-pointer '/>
          </span>
        </div>
      </div>
    </div>
  </header>
}

export default Header