interface IProps {
  size: string
  color?: string
}

const Logo: React.FC<IProps> = ({ size, color }) => {
  return (
    <div className={`${size === 'sm' ? 'w-12 h-12' : size === 'md' ? 'w-16 h-16' : 'w-20 h-20'} rounded-md bg-gray-200`}>
      {
        color === 'white'
        ? <img src={`${process.env.PUBLIC_URL}/images/logo_white.jpg`} alt='Logo' />
        : <img src={`${process.env.PUBLIC_URL}/images/logo_black.png`} alt='Logo' />
      }
    </div>
  )
}

export default Logo