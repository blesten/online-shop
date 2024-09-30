import { useEffect, useState } from 'react'
import InfoOverlay from '././InfoOverlay'

const Info = () => {
  const [openInfoOverlay, setOpenInfoOverlay] = useState(false)

  useEffect(() => {
    const checkLsVal = () => {
      const lsVal = localStorage.getItem('vpp_bcs_sw_os')
      if (!lsVal)
        setOpenInfoOverlay(true)
      else if (lsVal !== 'y')
        setOpenInfoOverlay(true)
      else
        setOpenInfoOverlay(false)
    }

    checkLsVal()
  }, [])
  
  return (
    <>
      <div style={{ wordSpacing: '3px' }} className='text-sm text-center py-3 bg-blue-500 text-white'>
        <p>This is a <strong>Byte Craft Studio</strong> sample works for demonstration purposes only. Click <span onClick={() => setOpenInfoOverlay(true)} className='text-blue-200 underline cursor-pointer'>here</span> to see this sample works policy</p>
      </div>

      <InfoOverlay
        openInfoOverlay={openInfoOverlay}
        setOpenInfoOverlay={setOpenInfoOverlay}
      />
    </>
  )
}

export default Info