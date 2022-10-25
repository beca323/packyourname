import { InboxOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import Dragger from 'antd/lib/upload/Dragger'
import React from 'react'
import MyHeader from '../../Common/MyHeader/MyHeader'
import UploadFile from '../../Common/UploadFile/UploadFile'

export default function QuickStart() {
  return (
    <>
      <MyHeader />
      <div style={{ padding: '2rem' }}>
        <h1 className='c-primary'>Create a new project</h1>
        <div style={{ width: '500px', margin: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex' }}>Upload Document</div>
            <UploadFile />
            {/* <UploadFileComponent /> */}
          </div>
          <div>
            <div style={{ display: 'flex' }}>Document Name</div>
            <Input placeholder='Please Input' />
          </div>
        </div>
      </div>
    </>
  )
}

export const UploadFileComponent = (props) => {
  return (
    <Dragger {...props}
      accept=".pdf"
      onChange={props.onChange}>
      <p className="ant-upload-drag-icon">
        <Button className='bg-primary'>
          Choose File
          <div style={{ opacity: '0.5' }}>pdf only</div>
        </Button>
      </p>
      <p className="ant-upload-hint">
        or drag to here
      </p>
    </Dragger>
  )
}