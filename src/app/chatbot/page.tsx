'use client'

import { useEffect, useState } from 'react'
import { getSocket } from '../lib/socket'

type Message = {
  id?: string
  text: string
  time?: number
}

export default function Home() {
  const [socket, setSocket] = useState<any>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  // Load existing messages
  useEffect(() => {
    fetch('/api/messages')
      .then((res) => res.json())
      .then((data: Message[]) => setMessages(data))
  }, [])

  // Connect to socket
  useEffect(() => {
    fetch('/api/socket') // trigger server-side socket setup
    const s = getSocket()
    setSocket(s)

    s.on('message', (msg: Message) => {
      setMessages((prev) => [...prev, msg])
    })

    return () => {
      s.off('message')
      s.disconnect()
    }
  }, [])

  const sendMessage = async () => {
    if (!input.trim() || !socket) return

    const newMessage: Message = {
      text: input,
      time: Date.now(),
    }

    socket.emit('message', newMessage)

    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessage),
    })

    setInput('')
  }

  return (
    <main style={{ padding: '20px' }}>
      <h2>Next.js Chat App 💬</h2>
      <div
        style={{
          border: '1px solid #ccc',
          padding: 10,
          minHeight: 300,
          maxHeight: 400,
          overflowY: 'auto',
        }}
      >
        {messages.map((m, index) => (
          <p key={m.id || index}>
            {m.text}{' '}
            {m.time && (
              <small style={{ color: 'gray' }}>
                ({new Date(m.time).toLocaleTimeString()})
              </small>
            )}
          </p>
        ))}
      </div>
      <div style={{ marginTop: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message"
          style={{ padding: 6, width: '70%' }}
        />
        <button onClick={sendMessage} style={{ padding: 6, marginLeft: 8 }}>
          Send
        </button>
      </div>
    </main>
  )
}
