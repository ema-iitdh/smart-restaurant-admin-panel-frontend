import { url } from '@/lib/axiosApi'
import { io } from 'socket.io-client'

// "undefined" means the URL will be computed from the `window.location` object
const URL = url

export const socket = io(URL)
