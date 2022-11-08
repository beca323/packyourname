import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row } from 'antd';
import React, { useState } from 'react';
import Icon from "@ant-design/icons";
import Output from '../../Common/Output/Output';
import Signbox from '../../Common/Signbox/Signbox';
import Textbox from '../../Common/Signbox/Textbox';
import Datebox from '../../Common/Signbox/Datebox';
import { ReactComponent as Sign } from "../../Atoms/Icons/Sign.svg";
import { ReactComponent as Text } from "../../Atoms/Icons/Text.svg";
import { ReactComponent as Date } from "../../Atoms/Icons/Date.svg";
import { ReactComponent as Image } from "../../Atoms/Icons/Image.svg";
import * as Style from "./Style";

export default function SignDocument(props) {
  const [isSignModalVisible, setIsSignModalVisible] = useState(false);
  const [isTextModalVisible, setIsTextModalVisible] = useState(false);
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
  const [isEditFileName, setIsEditFileName] = useState(false);
  const { form, headerTwoRef } = props;
  return (
    <section>
      <SignTools setIsDateModalVisible={setIsDateModalVisible} setIsSignModalVisible={setIsSignModalVisible} setIsTextModalVisible={setIsTextModalVisible} />
      <Style.SectionContainer style={{ background: 'none' }}>
        <div>
          <h1 className='c-primary'>Sign</h1>
          <div ref={headerTwoRef}></div>
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
          <Output toDownload={props.toDownload} />
          <Modal
            open={isSignModalVisible}
            onCancel={() => setIsSignModalVisible(false)}
            onOk={() => setIsSignModalVisible(false)}
            title={<h2 className="c-primary">Create a new signature</h2>}
            footer={null}
            mask
          >
            <Signbox onOk={() => setIsSignModalVisible(false)} />
          </Modal>
          <Modal
            open={isTextModalVisible}
            onCancel={() => setIsTextModalVisible(false)}
            onOk={() => setIsTextModalVisible(false)}
            title={<h2 className="c-primary">輸入文字</h2>}
            footer={null}
            mask
          >
            <Textbox onOk={() => setIsTextModalVisible(false)} onCancel={() => setIsTextModalVisible(false)} />
          </Modal>
          <Style.DateModal
            open={isDateModalVisible}
            onCancel={() => setIsDateModalVisible(false)}
            onOk={() => setIsDateModalVisible(false)}
            footer={null}
            mask
          >
            <Datebox onOk={() => setIsDateModalVisible(false)} onCancel={() => setIsDateModalVisible(false)} />
          </Style.DateModal>
        </div>
      </Style.SectionContainer>
    </section>
  );
}

export function SignTools(props) {
  const { setIsSignModalVisible, setIsTextModalVisible, setIsDateModalVisible } = props;
  return (
    <Style.SignTools>
      <div className='tool' onClick={() => setIsSignModalVisible(true)}>
        <Icon component={Sign} />
        <div style={{ color: '#1C4F6D' }}>Sign</div>
      </div>
      <div className='tool' onClick={() => setIsTextModalVisible(true)}>
        <Icon component={Text} />
        <div style={{ color: '#1C4F6D' }}>Text</div>
      </div>
      <div className='tool' onClick={() => setIsDateModalVisible(true)}>
        <Icon component={Date} />
        <div style={{ color: '#1C4F6D' }}>Date</div>
      </div>
      <div className='tool'>
        <Icon component={Image} />
        <div style={{ color: '#1C4F6D' }}>Image</div>
      </div>
    </Style.SignTools>
  );
}
