import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa6'
import { LuMinus, LuPlus } from "react-icons/lu";
import { APP_NAME } from "../../utils/constant"
import Footer from "../../components/general/Footer"
import Navbar from "../../components/general/Navbar"
import ProductCard from '../../components/general/ProductCard';
import HeadInfo from '../../utils/HeadInfo';
import { IProduct, IProductColor } from '../../utils/interface';
import { getDataAPI } from '../../utils/fetchData';
import { currencyFormatter } from '../../utils/currency';
import Loader from '../../components/general/Loader';

const Detail = () => {
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<Partial<IProduct>>({})
  const [selectedColor, setSelectedColor] = useState<Partial<IProductColor>>({})
  const [selectedSize, setSelectedSize] = useState({})
  const [qty, setQty] = useState(1)

  const [tab, setTab] = useState('overview')
  
  const { slug } = useParams()

  const handleSelectSize = (size: object) => {
    // @ts-ignore
    if (size.stock !== 0) {
      setSelectedSize(size)
    }
  }

  const handleSelectColor = (color: IProductColor) => {
    setSelectedColor(color)
    setSelectedSize({})
    setQty(1)
  }

  const handleChangeQty = (type: string) => {
    if (Object.keys(selectedSize).length > 0) {
      if (type === 'increase') {
        const newQty = qty + 1
        // @ts-ignore
        if (newQty > selectedSize.stock) {
          setQty(qty)
        } else {
          setQty(newQty)
        }
      } else if (type === 'decrease') {
        const newQty = qty - 1
        if (newQty < 1) {
          setQty(1)
        } else {
          setQty(newQty)
        }
      }
    }
  }

  const handleAddToCart = () => {
    console.log(selectedColor)
    console.log(selectedSize)
    console.log(qty)
  }

  useEffect(() => {
    const fetchProduct = async(id: string) => {
      setLoading(true)
      const res = await getDataAPI(`/product/${id}`)
      setLoading(false)
      setProduct(res.data.product)
      setSelectedColor(res.data.product.colors[0])
    }

    fetchProduct(slug as string)
  }, [slug])
  
  return (
    <>
      <HeadInfo title='Blazer Long Sleeve' />
      <Navbar />
      {
        loading
        ? (
          <div className='my-8 flex justify-center'>
            <Loader size='xl' />
          </div>
        )
        : (
          Object.keys(product).length > 0 &&
          <div className='pt-10'>
            {/* header */}
            <div className='md:px-12 px-6 flex md:flex-row flex-col gap-8 md:items-center'>
              <div className='flex-1 h-[600px] rounded-md border border-gray-300'>
                {
                  product.images!.length > 0 &&
                  <img style={{ objectPosition: '50% 20%' }} src={product.images![0]} alt={`${APP_NAME} Product Name`} className='w-full h-full object-cover rounded-md pointer-events-none' />
                }
              </div>
              <div className='flex-1'>
                <h1 className='font-medium text-4xl'>{product.name}</h1>
                <p className='text-gray-400 text-sm mt-5'>{product.shortDescription}</p>
                <div className='flex items-center gap-2 mt-5'>
                  <div className='flex items-centar gap-2'>
                    <FaStar className='text-orange-400 text-lg' />
                    <p className='text-sm'>4/5</p>
                  </div>
                  <p className='text-gray-500 text-sm'>(120 Reviews)</p>
                </div>
                <div className='mt-8 flex items-center justify-between'>
                  <p className='text-2xl font-medium'>{currencyFormatter(product.price as number)},00</p>
                  <div className='flex gap-3'>
                    {
                      product.colors?.map((item, idx) => (
                        <div key={idx} onClick={() => handleSelectColor(item)} style={{ background: item.hexCode }} className={`w-10 h-10 rounded-md cursor-pointer ${item.hexCode === selectedColor.hexCode ? 'outline outline-offset-2 outline-black' : ''} hover:outline hover:outline-offset-2 hover:outline-black transition-[outline]`} />
                      ))
                    }
                  </div>
                </div>
                <div className='mt-10'>
                  <p className='font-semibold'>Select Size:</p>
                  <div className='mt-5 flex items-center gap-3 flex-wrap'>
                    {
                      [product.colors!.find(item => item.hexCode === selectedColor.hexCode)].map(item => (
                        item?.sizes.map((size, idx) => (
                          // @ts-ignore
                          <div key={idx} onClick={() => handleSelectSize(size)} className={`py-2 px-5 rounded-md w-fit ${size.stock === 0 ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-black hover:text-white cursor-pointer'} transition ${size.size === selectedSize.size ? 'bg-black text-white hover:bg-black hover:text-white' : 'bg-gray-100' }`}>
                            <p className='text-sm'>{size.size}</p>
                          </div>
                        ))
                      ))
                    }
                  </div>
                </div>
                <hr className='my-8' />
                <div className='flex gap-5'>
                  <div className='flex items-center gap-5 bg-gray-100 rounded-md w-fit px-3 py-2'>
                    <LuMinus onClick={() => handleChangeQty('decrease')} className={`${Object.keys(selectedSize).length > 0 ? 'cursor-pointer' : 'cursor-not-allowed text-gray-300'}`} />
                    <p className={`px-3 ${Object.keys(selectedSize).length > 0 ? 'text-black' : 'text-gray-300'}`}>{qty}</p>
                    <LuPlus onClick={() => handleChangeQty('increase')} className={`cursor-pointer ${Object.keys(selectedSize).length > 0 ? 'cursor-pointer' : 'cursor-not-allowed text-gray-300'}`} />
                  </div>
                  <button disabled={Object.keys(selectedSize).length < 1} onClick={handleAddToCart} className={`${Object.keys(selectedSize).length > 0 ? 'bg-black hover:bg-gray-700 cursor-pointer' : 'bg-gray-200 cursor-not-allowed'} transition text-white text-sm flex-1 rounded-md`}>Add to Cart</button>
                </div>
                <div className='mt-10'>
                  <p className='font-semibold'>Description</p>
                  <p className='text-sm mt-4 text-gray-400 leading-relaxed'>
                    {product.longDescription}
                  </p>
                </div>
              </div>
            </div>
            {/* middle */}
            <div className='md:px-12 px-6 mt-20'>
              <h1 className='text-center text-3xl font-medium'>Elevate Your Style</h1>
              <div className='md:w-6/12 m-auto text-center mt-6'>
                <p className='text-gray-500 text-sm leading-loose'>Elevate your style with our {product.name}. This versatile piece effortlessly blends comfort and fashion with high-quality material and stylish design, perfect for any occasion</p>
              </div>
              <div className='bg-gray-100 rounded-full py-2 px-2 m-auto w-fit flex items-center gap-3 mt-7 cursor-pointer'>
                <div onClick={() => setTab('overview')} className={`${tab === 'overview' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'} rounded-full px-5 py-2`}>
                  <p className='text-sm'>Overview</p>
                </div>
                <div onClick={() => setTab('sizeChart')} className={`${tab === 'sizeChart' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'} rounded-full px-5 py-2`}>
                  <p className='text-sm'>Size Chart</p>
                </div>
                <div onClick={() => setTab('reviews')} className={`${tab === 'reviews' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'} rounded-full px-5 py-2`}>
                  <p className='text-sm'>Reviews</p>
                </div>
              </div>
              {
                tab === 'overview'
                ? (
                  <div className='mt-10 grid grid-cols-3 gap-8 h-[500px]'>
                    <div className='w-full h-full rounded-lg'>
                      <img style={{ objectPosition: '50% 20%' }} src={product.images![0]} alt={`${APP_NAME} Product Name`} className='w-full h-full rounded-lg object-cover border border-gray-300 pointer-events-none' />
                    </div>
                    <div className='w-full h-full rounded-lg'>
                      <img style={{ objectPosition: '50% 20%' }} src={product.images![1]} alt={`${APP_NAME} Product Name`} className='w-full h-full rounded-lg object-cover border border-gray-300 pointer-events-none' />
                    </div>
                    <div className='w-full h-full rounded-lg'>
                      <img style={{ objectPosition: '50% 20%' }} src={product.images![2]} alt={`${APP_NAME} Product Name`} className='w-full h-full rounded-lg object-cover border border-gray-300 pointer-events-none' />
                    </div>
                  </div>
                )
                : tab === 'sizeChart'
                  ? (
                    <div className='overflow-x-auto mt-10 md:w-[80%] w-full m-auto'>
                      <table className='w-full text-center'>
                        <thead className='text-sm text-white font-normal bg-black'>
                          <tr>
                            <th className='py-4 rounded-l-lg'>Size</th>
                            {
                              // @ts-ignore
                              product.category.availableSizeParameters.map((item, idx) => (
                                // @ts-ignore
                                <th key={idx} className={`py-4 ${idx === product.category.availableSizeParameters.length - 1 ? 'rounded-r-lg' : ''}`}>{item}</th>
                              ))
                            }
                          </tr>
                        </thead>
                        <tbody>
                          {
                            // @ts-ignore
                            product.sizeChart.map((item, sizeIdx) => (
                              <tr key={sizeIdx} className='border-b border-gray-300'>
                                {/* @ts-ignore */}
                                <td className='py-4'>{item.size}</td>
                                {
                                  Object.keys(product.sizeChart![sizeIdx]).filter(item => item !== 'size').map((param, paramIdx) => (
                                    // @ts-ignore
                                    <td key={paramIdx}>{product.sizeChart![sizeIdx][param]}</td>
                                  ))
                                }
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  ) : tab === 'reviews'
                      ? (
                        <div></div>
                      )
                      : ''
              }
            </div>
            {/* recommendation */}
            <div className='mt-20 bg-gray-100 md:px-12 px-6 py-10'>
              <h1 className='text-3xl font-medium'>You may also like</h1>
              <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-12'>
                {/* <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard /> */}
              </div>
            </div>
          </div>
        )
      }
      <Footer />
    </>
  )
}

export default Detail