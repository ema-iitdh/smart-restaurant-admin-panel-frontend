import axios from 'axios'

// export const url = 'https://achaathak.com/backend'
// export const url = 'https://6xmlzdw3-4000.inc1.devtunnels.ms/'
export const url = 'https://47d3-49-47-140-31.ngrok-free.app'
export const Axios = axios.create({
	baseURL: url,
	headers: {
		'ngrok-skip-browser-warning': 'true',
	},
})
