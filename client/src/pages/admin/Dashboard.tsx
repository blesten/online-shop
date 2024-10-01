import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from './../../components/template/AdminLayout'
import useStore from './../../store/store'
import { RiDashboard3Fill } from 'react-icons/ri'

const Dashboard = () => {
  const navigate = useNavigate()

  const { userState } = useStore()

  useEffect(() => {
    if (!userState.loading) {
      if (userState.data.accessToken) {
        if (userState.data.user?.role !== 'admin') {
          navigate('/')
        }
      } else {
        navigate('/login')
      }
    }
  }, [userState.data, userState.loading, navigate])

  return (
    <>
      <AdminLayout title='Dashboard'>
        <div className='flex flex-col h-full'>
          {/* header */}
          <div className='flex items-center justify-between'>
            <h1 className='text-xl font-semibold'>Dashboard</h1>
          </div>
          <div className='w-full rounded-md bg-white p-4 mt-7 h-full flex items-center justify-center flex-col gap-3 text-gray-300 text-lg font-semibold'>
            <RiDashboard3Fill className='text-gray-300 text-9xl' />
            <p>Dashboard content is currently empty</p>
          </div>
        </div>
      </AdminLayout>
    </>
  )
}

export default Dashboard