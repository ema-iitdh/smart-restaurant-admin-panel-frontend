import axios from 'axios'

export const url = 'https://achaathak.com/backend'
// export const url = 'https://6xmlzdw3-4000.inc1.devtunnels.ms/'
export const Axios = axios.create({
	baseURL: url,
})
