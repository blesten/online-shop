import { ChangeEvent, FormEvent } from 'react'

export type FormChanged = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

export type FormSubmitted = FormEvent<HTMLFormElement>

export interface GlobalStoreState {
  alertState: IAlertState
  userState: IUserState
  categoryState: ICategoryState
}

export interface IGeneralField {
  _id: string
  createdAt: string
}

export interface IAlertState {
  message: string
  type: string
}

export interface IUserState {
  data: Partial<ILoginResponse>
  loading: boolean
}

export interface IUser {
  name: string
  avatar: string
  gender: string
  email: string
  handphoneNo: string
  password: string
  role: string
  isValidEmail: number
  isValidPhone: number
}

export interface ILoginResponse {
  user: IUser
  accessToken: string
}

export interface ICategory extends IGeneralField {
  name: string
  availableSizes: string[]
  availableSizeParameters: string[]
  sizeChart: object[]
}

export interface ICategoryState {
  data: ICategory[]
  totalPage: number
  totalData: number
  loading: boolean
}