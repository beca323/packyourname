import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Form, Input, Steps } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useRef, useState } from "react";
import MyHeader from "../../Common/MyHeader/MyHeader";
import Output from "../../Common/Output/Output";
import Signbox from "../../Common/Signbox/Signbox";
import UploadFile from "../../Common/UploadFile/UploadFile";
import Checkbox from "../../Atoms/Components/Checkbox";
import * as Style from "./Style";
import useOnScreen from "../../Hooks/useOnScreen/useOnScreen";
import { CheckboxContainer } from "../../Style";
import UploadNewDocument from "./UploadNewDocument";

const totalSectionCount = 3;
export default function QuickStart() {
  const headerTwoRef = useRef();
  const visible = useOnScreen(headerTwoRef, "-150px");
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

  const steps = [{ title: 'Upload' }, { title: 'Sign', }, { title: 'Review' },];
  return (
    <>
      <MyHeader renderButtons={HeaderButton} />
      <div style={{ height: '100vh' }}>
        <Form>
          <div style={{ display: 'flex', background: visible ? 'none' : '#fff', position: visible ? 'relative' : 'fixed', width: '100%', zIndex: 1, transition: '0.1s all ease', padding: '0 1rem' }} >
            {!visible && <h2 style={{ position: 'absolute', fontWeight: 'bold', lineHeight: '60px' }} className="c-primary">Upload New Document</h2>}
            <div style={{ width: '80%', maxWidth: '500px', margin: '1rem auto' }}>
              <Style.MySteps current={pageCount}>
                {steps.map((item) => (
                  <Steps.Step key={item.title} title={item.title} />
                ))}
              </Style.MySteps>
            </div>
          </div>
          <Style.QuickStartPagesContainer count={pageCount}>
            <UploadNewDocument headerTwoRef={headerTwoRef} visible={visible} pageCount={pageCount} />

            <section>
              <Style.SectionContainer style={{ background: visible ? '#fff' : 'none' }}>
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
              </Style.SectionContainer>
            </section>
            <section>
              <div style={{ padding: "2% 4%", margin: '3rem auto', maxWidth: '800px', background: '#fff' }}>
                <h1 className='c-primary'>Review</h1>
                <Output />
              </div>
            </section>
          </Style.QuickStartPagesContainer>
        </Form>
      </div>
    </>
  );
}
