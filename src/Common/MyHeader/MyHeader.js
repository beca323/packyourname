import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Style from './Style'

export default function MyHeader() {
  const navigate = useNavigate()
  return (
    <Style.MyHeader>
      <Button onClick={() => navigate('/login')}>Log In</Button>
      <Button onClick={() => navigate('/signup')}>Sign Up</Button>
    </Style.MyHeader>
  )
}
