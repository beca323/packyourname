import { ControlOutlined, DownOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React from 'react'
import { Container } from './Style'

export default function TopBar() {
  return (
    <Container>
      <Input
        prefix={<SearchOutlined style={{ color: '#026CAD' }} />}
        placeholder="Search File Name"
        suffix={<ControlOutlined style={{ color: '#026CAD' }} />}
        style={{ width: '300px' }} />
      <UserInfo />
    </Container>
  )
}

function UserInfo() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
      <Button style={{
        borderRadius: '50%',
        border: '2px solid #026cad', width: '30px', height: '32px',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <UserOutlined style={{ color: '#026cad', fontSize: '1.3rem' }} />
      </Button>
      <div>
        Yaaaaa, Welcome!
      </div>
      <DownOutlined style={{ color: '#026cad' }} />
    </div>
  )
}