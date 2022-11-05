import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row } from 'antd';
import React, { useState } from 'react';
import Output from '../../Common/Output/Output';
import Signbox from '../../Common/Signbox/Signbox';
import * as Style from "./Style";

export default function SignDocument(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditFileName, setIsEditFileName] = useState(false);
  const { visible, form } = props;
  return (
    <section>
      <Style.SectionContainer style={{ background: 'none' }}>
        <div style={{ padding: "2% 4%", margin: '1rem auto', maxWidth: '800px' }}>
          <h1 className='c-primary'>Sign</h1>
          {isEditFileName
            ? (
              <Row typeof='flex' justify='center' alignItems='center'>
                <Col>
                  <Form.Item name="newFileName">
                    <Input defaultValue={form.getFieldValue('newFileName')} />
                  </Form.Item>
                </Col>
                <Col>
                  <span onClick={() => setIsEditFileName(!isEditFileName)} className="c-primary" style={{ cursor: 'pointer' }}> Done</span>
                </Col>
              </Row>
            ) : (
              <h2 className='c-primary' style={{ alignItems: 'center' }}>{form.getFieldValue('newFileName')} <EditOutlined onClick={() => setIsEditFileName(!isEditFileName)} style={{ cursor: 'pointer' }} /></h2>
            )}
          <Button onClick={() => setIsModalVisible(true)}>Sign</Button>
          <Modal
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            onOk={() => setIsModalVisible(false)}
            footer={null}
          >
            <Signbox onOk={() => setIsModalVisible(false)} />
          </Modal>
          <Output />
        </div>
      </Style.SectionContainer>
    </section>
  );
}