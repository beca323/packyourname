import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  return (
    <>
      <div>About~</div>
      <Button onClick={() => navigate('/dashboard/mydoc')} >Getting Start</Button>
    </>
  )
}
