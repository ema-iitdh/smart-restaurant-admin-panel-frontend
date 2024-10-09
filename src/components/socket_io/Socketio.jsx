import { url } from '@/lib/axiosApi'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { Button } from '../ui/button'

const socket = io.connect(`${url}`)

export default function Socketio() {
	const [message, setMessage] = useState('')
	const [chat, setChat] = useState('')

	const sendMessage = (e) => {
		e.preventDefault()
		socket.emit('chat', { message })
		setMessage('')
	}

	useEffect(() => {
		socket.on('chat', (payload) => {
			setChat([...chat, payload])
		})
	}, [])

	return (
		<div>
			<p>{message}</p>
			<form onSubmit={sendMessage}>
				<input
					type='text'
					name='text'
					placeholder='enter text'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<Button type='submit'>Send</Button>
			</form>
		</div>
	)
}
