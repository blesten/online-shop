import { postDataAPI } from '../utils/fetchData'
import { uploadImages } from '../utils/image'
import { GlobalStoreState, IProductState } from './../utils/interface'

const productState: IProductState = {
  data: [],
  totalPage: 0,
  totalData: 0,
  loading: false
}

const productStore = (set: any) => {
  return {
    productState,
    createProduct: async(data: object, token: string) => {
      try {
        // @ts-ignore
        const imageRes = await uploadImages(data.images, 'product')
        const res = await postDataAPI('/product', { ...data, images: imageRes }, token)

        set((state: GlobalStoreState) => {
          let newData = []
          if (state.productState.data.length === 9) {
            newData = [res.data.product, ...state.productState.data.slice(0, 8)]
            if (state.productState.totalData % 9 === 0) {
              state.productState.totalPage += 1
            }
            state.productState.totalData += 1
          } else {
            newData = [res.data.product, ...state.productState.data]
          }

          state.productState.data = newData
          state.alertState.message = res.data.msg
          state.alertState.type = 'success'
        }, false, 'create_product/success')
      } catch (err: any) {
        set((state: GlobalStoreState) => {
          state.alertState.message = err.response.data.msg
          state.alertState.type = 'error'
        }, false, 'create_product/error')
      }
    }
  }
}

export default productStore