import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row } from 'antd';
import React, { useState } from 'react';
import Icon from "@ant-design/icons";
import Output from '../../Common/Output/Output';
import Signbox from '../../Common/Signbox/Signbox';
import Textbox from '../../Common/Signbox/Textbox';
import Datebox from '../../Common/Signbox/Datebox';
import { ReactComponent as Sign } from "../../Atoms/Icons/Sign.svg";
import { ReactComponent as TextT } from "../../Atoms/Icons/T.svg";
import { ReactComponent as Text } from "../../Atoms/Icons/Text.svg";
import { ReactComponent as Date } from "../../Atoms/Icons/Date.svg";
import { ReactComponent as Image } from "../../Atoms/Icons/Image.svg";
import * as Style from "./Style";
import Imagebox from '../../Common/Signbox/Imagebox';

export default function SignDocument(props) {
  const [isSignModalVisible, setIsSignModalVisible] = useState(false);
  const [isTextModalVisible, setIsTextModalVisible] = useState(false);
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [isEditFileName, setIsEditFileName] = useState(false);
  const { form, headerTwoRef, setPreviewSrcs, previewSrcs, toPreview, prevPage, setPrevPage } = props;
  return (
    <section>
      <SignTools setIsDateModalVisible={setIsDateModalVisible} setIsSignModalVisible={setIsSignModalVisible} setIsTextModalVisible={setIsTextModalVisible} setIsImageModalVisible={setIsImageModalVisible} />
      <Style.SectionContainer style={{ background: 'none' }}>
        <div>
          <div ref={headerTwoRef}></div>
          {isEditFileName
            ? (
              <Row typeof='flex' justify='center' >
                <Col>
                  <Form.Item name="fileName">
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
          <Output prevPage={prevPage} setPrevPage={setPrevPage} toPreview={toPreview} previewSrcs={previewSrcs} setPreviewSrcs={setPreviewSrcs} toDownload={props.toDownload} pageNumber={props.pageNumber} form={form} />

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
          <Modal
            open={isImageModalVisible}
            onCancel={() => setIsImageModalVisible(false)}
            onOk={() => setIsImageModalVisible(false)}
            title={<h2 className="c-primary">上傳圖片</h2>}
            footer={null}
            mask
          >
            <Imagebox onOk={() => setIsImageModalVisible(false)} onCancel={() => setIsImageModalVisible(false)} />
          </Modal>
        </div>
      </Style.SectionContainer>
    </section>
  );
}

export function SignTools(props) {
  const { setIsSignModalVisible, setIsTextModalVisible, setIsDateModalVisible, setIsImageModalVisible } = props;
  return (
    <Style.SignTools>
      <div className='tool' onClick={() => setIsSignModalVisible(true)}>
        <Icon component={Sign} />
        <div style={{ color: '#1C4F6D' }}>Sign</div>
      </div>
      <div className='tool' onClick={() => setIsTextModalVisible(true)}>
        <Icon component={TextT} style={{ position: 'absolute', transform: 'scale(0.5) translateX(25%)' }} />
        <Icon component={Text} />
        {/* <img src="../../Atoms/Icons/Text.png" alt='text' /> */}
        <div style={{ color: '#1C4F6D' }}>Text</div>
      </div>
      <div className='tool' onClick={() => setIsDateModalVisible(true)}>
        <Icon component={Date} />
        <div style={{ color: '#1C4F6D' }}>Date</div>
      </div>
      <div className='tool'>
        <Icon component={Image} onClick={() => setIsImageModalVisible(true)} />
        <div style={{ color: '#1C4F6D' }}>Image</div>
      </div>
    </Style.SignTools>
  );
}
