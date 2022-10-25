import { Button } from 'antd'
import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import MyHeader from '../../Common/MyHeader/MyHeader'
import About from '../About/About'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'

export default function UploadPage() {
  const navigate = useNavigate()

  return (
    <>
      <MyHeader/>
      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path="" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  )
}
