import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Input, Steps } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import MyHeader from "../../Common/MyHeader/MyHeader";
import Output from "../../Common/Output/Output";
import Signbox from "../../Common/Signbox/Signbox";
import UploadFile from "../../Common/UploadFile/UploadFile";
import Checkbox from "../../Atoms/Components/Checkbox";
import * as Style from "./Style";

const totalSectionCount = 3;
export default function QuickStart() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const handleClickNext = () => {
    if (pageCount >= totalSectionCount - 1) return;
    setPageCount((prev) => prev + 1);
  };
  const handleClickBack = () => {
    if (pageCount === 0) return;
    setPageCount((prev) => prev - 1);
  };

  const HeaderButton = () => {
    return (
      <>
        {pageCount !== 0 &&
          <Button className="bg-primary" onClick={handleClickBack} style={{ border: 'none', margin: '0 0.5rem' }}>
            <ArrowLeftOutlined />Back
          </Button>
        }
        {pageCount !== totalSectionCount - 1 &&
          <Button className="bg-primary" onClick={handleClickNext} style={{ border: 'none', margin: '0 0.5rem' }}>
            Next
            <ArrowRightOutlined />
          </Button>
        }
        {
          pageCount === totalSectionCount - 1 &&
          <Button className="bg-primary" onClick={handleClickNext} style={{ border: 'none', margin: '0 0.5rem' }}>
            Done
          </Button>
        }
      </>
    );
  };

  const steps = [
    {
      title: 'Upload',
      content: 'First-content',
    },
    {
      title: 'Sign',
      content: 'Second-content',
    },
    {
      title: 'Review',
      content: 'Last-content',
    },
  ];
  return (
    <>
      <MyHeader renderButtons={HeaderButton} />
      <div style={{ width: '80%', maxWidth: '500px', margin: '1rem auto' }}>
        <Style.MySteps current={pageCount}>
          {steps.map((item) => (
            <Steps.Step key={item.title} title={item.title} />
          ))}
        </Style.MySteps>
      </div>
      <Style.QuickStartPagesContainer count={pageCount}>
        <section>
          <Style.SectionContainer>
            <h1 className='c-primary'>Upload New Document</h1>
            <div style={{ margin: "auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <Style.SubSection>
                <div style={{ display: "flex" }}>Document Info</div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <Checkbox defaultValue={true} onClick={value => console.log(value)} />
                  <div className="c-primary" style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>Create a new file</div>
                  <Input disabled />
                </div>
                <Input placeholder="Please input document name" />
              </Style.SubSection>
              <div>
                <div style={{ display: "flex" }}>Upload Document</div>
                <UploadFile />
              </div>
            </div>
          </Style.SectionContainer>
        </section>
        <section>
          <div style={{ padding: "2% 4%", margin: '3rem auto', maxWidth: '800px', background: '#fff' }}>
            <h1 className='c-primary'>Sign</h1>
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
        </section>
        <section>
          <div style={{ padding: "2% 4%", margin: '3rem auto', maxWidth: '800px', background: '#fff' }}>
            <h1 className='c-primary'>Review</h1>
            <Output />
          </div>
        </section>
      </Style.QuickStartPagesContainer>
    </>
  );
}
