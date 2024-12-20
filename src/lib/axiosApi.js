import axios from 'axios'

// export const url = 'https://achaathak.com/backend'
// export const url = 'https://6xmlzdw3-4000.inc1.devtunnels.ms/'
// export const url = 'http://localhost:4000';
// export const url = 'https://555f-49-47-140-31.ngrok-free.app'
export const url =
	'https://1771-2409-4066-e10-a5f7-a40f-cdae-5fff-a02.ngrok-free.app'

export const Axios = axios.create({
	baseURL: url,
	headers: {
		'Content-Type': 'application/json',
		'ngrok-skip-browser-warning': 'true',
	},
	withCredentials: true,
})
