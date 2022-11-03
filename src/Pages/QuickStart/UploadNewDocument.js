import React, { Component } from 'react';
import Checkbox from "../../Atoms/Components/Checkbox";
import { CheckboxContainer } from "../../Style";
import UploadFile from "../../Common/UploadFile/UploadFile";
import * as Style from './Style';
import { Form, Input } from 'antd';

export default class UploadNewDocument extends Component {
  render() {
    const { headerTwoRef, visible, pageCount } = this.props;
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
                <Input disabled />
              </CheckboxContainer>
              <Input placeholder="Please input document name" />
            </Style.SubSection>
            <div>
              <div style={{ display: "flex" }}>Upload Document</div>
              <UploadFile pageCount={pageCount} />
            </div>
            <Style.SubSection>
              <div style={{ display: "flex" }}>Signatory</div>
              <CheckboxContainer>
                <Checkbox />
                <div>Myself</div>
              </CheckboxContainer>
              <CheckboxContainer>
                <Checkbox />
                <div>Invite / Assign Others</div>
              </CheckboxContainer>
              <Form.Item
                name={['user', 'email']}
                rules={[{ type: 'email', }]}
              >
                <Input placeholder='Email' />
              </Form.Item>
              <Input />
            </Style.SubSection>
          </div>
        </Style.SectionContainer>
      </section>
    );
  }
}
