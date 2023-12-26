import { postDataAPI } from "../utils/fetchData"
import { GlobalStoreState, IUserState } from "../utils/interface"

interface ILoginData {
  email: string
  password: string
}

const userState: IUserState = {
  data: {},
  loading: true
}

const userStore = (set: any) => {
  return {
    userState,
    login: async(data: ILoginData) => {
      set((state: GlobalStoreState) => {
        state.userState.loading = true
      }, false, 'login/loading')

      try {
        const res = await postDataAPI('/user/login', data)

        set((state: GlobalStoreState) => {
          state.userState.data = {
            user: res.data.user,
            accessToken: res.data.accessToken
          }
          state.userState.loading = false
          state.alertState.message = res.data.msg
          state.alertState.type = 'success'
        }, false, 'login/success')
      } catch (err: any) {
        set((state: GlobalStoreState) => {
          state.userState.loading = false
          state.userState.data = {}
          state.alertState.message = err.response.data.msg
          state.alertState.type = 'error'
        }, false, 'login/error')
      }
    }
  }
}

export default userStore