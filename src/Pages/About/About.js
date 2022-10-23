import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function About() {
  const navigate = useNavigate()
  return (
    <>
      <div>About</div>
      <Button onClick={() => navigate('/main')} >Getting Start</Button>
    </>
  )
}
