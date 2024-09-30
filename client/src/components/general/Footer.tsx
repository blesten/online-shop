import { FaFacebookSquare } from 'react-icons/fa'
import { FaInstagram, FaYoutube } from 'react-icons/fa6'
import { RiTwitterXLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { APP_NAME } from './../../utils/constant'
import Logo from './Logo'

const Footer = () => {
  return (
    <div className='w-full bg-black lg:px-12 px-6 lg:pt-12 pt-6 pb-6'>
      <div className='flex lg:flex-row flex-col lg:gap-16 gap-10'>
        <div className='flex-1'>
          <Link to='/' className='flex items-center gap-5 text-white'>
            <Logo size='md' color='white' />
            <p className='text-lg font-semibold'>{APP_NAME}</p>
          </Link>
          <p className='text-gray-300 text-sm leading-loose mt-6'>Experience the Great Outdoors in Style with {APP_NAME}'s. Shop now and gear up for adventure in {APP_NAME}!</p>
        </div>
        <div className='flex-[3] grid md:grid-cols-4 grid-cols-2 lg:gap-20 gap-8 text-sm justify-center'>
          <div>
            <p className='font-semibold text-white'>Categories</p>
            <div className='flex flex-col gap-2 text-gray-400 mt-5'>
              <Link to='/' className='w-fit'>Men</Link>
              <Link to='/' className='w-fit'>Women</Link>
              <Link to='/' className='w-fit'>Kid</Link>
              <Link to='/' className='w-fit'>Unisex</Link>
            </div>
          </div>
          <div>
            <p className='font-semibold text-white'>Collections</p>
            <div className='flex flex-col gap-2 text-gray-400 mt-5'>
              <Link to='/' className='w-fit'>Summer</Link>
              <Link to='/' className='w-fit'>Winter</Link>
              <Link to='/' className='w-fit'>Chinese New Year</Link>
              <Link to='/' className='w-fit'>Spring</Link>
              <Link to='/' className='w-fit'>Autumn</Link>
            </div>
          </div>
          <div>
            <p className='font-semibold text-white'>Customer Care</p>
            <div className='flex flex-col gap-2 text-gray-400 mt-5'>
              <Link to='/' className='w-fit'>FAQ</Link>
              <Link to='/' className='w-fit'>Shipping</Link>
              <Link to='/' className='w-fit'>Order Status</Link>
              <Link to='/' className='w-fit'>Return & Exchange</Link>
            </div>
          </div>
          <div>
            <p className='font-semibold text-white'>Company</p>
            <div className='flex flex-col gap-2 text-gray-400 mt-5'>
              <Link to='/' className='w-fit'>Privacy</Link>
              <Link to='/' className='w-fit'>Guides</Link>
              <Link to='/' className='w-fit'>Term of Conditions</Link>
            </div>
          </div>
        </div>
        <div className='flex-1 text-2xl text-white flex justify-end gap-5'>
          <FaFacebookSquare />
          <FaInstagram />
          <FaYoutube />
          <RiTwitterXLine />
        </div>
      </div>
      <p className='text-white text-xs text-center lg:mt-16 mt-10'>&copy; {new Date().getFullYear()} Byte Craft Studio Sample Works - All Rights Reserved</p>
    </div>
  )
}

export default Footer