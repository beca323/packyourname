import React, { Component } from 'react';
import Checkbox from "../../Atoms/Components/Checkbox";
import { CheckboxContainer } from "../../Style";
import UploadFile from "../../Common/UploadFile/UploadFile";
import * as Style from './Style';
import { Col, Form, Input, Row } from 'antd';

export default function UploadNewDocument(props) {
  const { headerTwoRef, visible, pageCount, form } = props;
  return (
    <section>
      <Style.SectionContainer style={{ background: visible ? '#fff' : 'none' }}>
        <h1 className='c-primary'>Upload New Document</h1>
        <div ref={headerTwoRef}></div>
        <div style={{ margin: "auto", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          <Style.SubSection>
            <div style={{ display: "flex" }}>Document Info</div>
            <CheckboxContainer>
              <Checkbox defaultValue={true} onClick={value => console.log(value)} />
              <div className="c-primary" style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Create a new file</div>
              <Form.Item name="fileName" noStyle>
                <Input disabled style={{ width: '80%' }} />
              </Form.Item>
            </CheckboxContainer>
            <Form.Item name="newFileName">
              <Input placeholder="Please input document name" />
            </Form.Item>
          </Style.SubSection>
          <div>
            <div style={{ display: "flex" }}>Upload Document</div>
            <UploadFile pageCount={pageCount} form={form} setFileUploaded={props.setFileUploaded} />
          </div>
          <Style.SubSection>
            <div style={{ display: "flex" }}>Signatory</div>
            <Row gutter={32}>
              <Col>
                <Form.Item
                  name={["myself"]}
                  style={{ display: 'none' }}
                >
                  <Input placeholder='Email' />
                </Form.Item>
                <CheckboxContainer>
                  <Checkbox value={form.getFieldValue('myself')} defaultValue={form.getFieldValue('myself')} onClick={value => form.setFieldsValue({ myself: value })} />
                  <div>Myself</div>
                </CheckboxContainer>
              </Col>
              <Col>
                <CheckboxContainer>
                  <Checkbox onClick={() => { }} />
                  <div>Invite / Assign Others</div>
                </CheckboxContainer>
              </Col>
            </Row>
            <Form.Item
              name={['user', 'email']}
              rules={[{ type: 'email' }]}
            >
              <Input placeholder='Email' />
            </Form.Item>
          </Style.SubSection>
        </div>
      </Style.SectionContainer>
    </section >
  );

}


// export default class UploadNewDocument extends Component {
//   render() {
//     const { headerTwoRef, visible, pageCount, form } = this.props;
//     return (
//       <section>
//         <Style.SectionContainer style={{ background: visible ? '#fff' : 'none' }}>
//           <h1 className='c-primary'>Upload New Document</h1>
//           <div ref={headerTwoRef}></div>
//           <div style={{ margin: "auto", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
//             <Style.SubSection>
//               <div style={{ display: "flex" }}>Document Info</div>
//               <CheckboxContainer>
//                 <Checkbox defaultValue={true} onClick={value => console.log(value)} />
//                 <div className="c-primary" style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Create a new file</div>
//                 <Input disabled style={{ width: '80%' }} />
//               </CheckboxContainer>
//               <Input placeholder="Please input document name" />
//             </Style.SubSection>
//             <div>
//               <div style={{ display: "flex" }}>Upload Document</div>
//               <UploadFile pageCount={pageCount} />
//             </div>
//             <Style.SubSection>
//               <div style={{ display: "flex" }}>Signatory</div>
//               <Row gutter={32}>
//                 <Col>
//                   <CheckboxContainer>
//                     <Checkbox onClick={value => form.setFieldValue({ myself: value })} />
//                     <div>Myself</div>
//                   </CheckboxContainer>
//                 </Col>
//                 <Col>
//                   <CheckboxContainer>
//                     <Checkbox />
//                     <div>Invite / Assign Others</div>
//                   </CheckboxContainer>
//                 </Col>
//               </Row>
//               <Form.Item
//                 name={['user', 'email']}
//                 rules={[{ type: 'email' }]}
//               >
//                 <Input placeholder='Email' />
//               </Form.Item>
//               <Input />
//             </Style.SubSection>
//           </div>
//         </Style.SectionContainer>
//       </section >
//     );
//   }
// }
