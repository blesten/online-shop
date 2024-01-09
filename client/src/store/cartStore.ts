import { GlobalStoreState, ICart, ICartState } from './../utils/interface'

const cartState: ICartState = {
  data: [],
  loading: false
}

const cartStore = (set: any) => {
  return {
    cartState,
    createCart: async(data: ICart) => {
      const localStorageCart = JSON.parse(localStorage.getItem('ue_cart') || '[]')
      let newCart: ICart[] = []
      
      if (localStorageCart.length > 0) {
        const findSelectedCart = localStorageCart.find((item: ICart) => item.size === data.size && item.color.hexCode === data.color.hexCode && item.product._id === data.product._id)

        if (findSelectedCart) {
          console.log('hit 1')
          newCart = localStorageCart.map((item: ICart) => item.size === data.size && item.color.hexCode === data.color.hexCode && item.product._id === data.product._id ? data: item)
        } else {
          console.log('hit 2')
          newCart = [data, ...localStorageCart]
        }
      } else {
        newCart = [data as ICart]
      }

      localStorage.setItem('ue_cart', JSON.stringify(newCart))
      set((state: GlobalStoreState) => {
        state.cartState.data = newCart
      }, false, 'create_cart/success')
    },
    readCart: async() => {
      const localStorageCart = JSON.parse(localStorage.getItem('ue_cart') || '[]')

      set((state: GlobalStoreState) => {
        state.cartState.data = localStorageCart
      }, false, 'read_cart/success')
    }
  }
}

export default cartStore