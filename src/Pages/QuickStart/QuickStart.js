import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Form, Input, Steps } from "antd";
import React, { useRef, useState } from "react";
import MyHeader from "../../Common/MyHeader/MyHeader";
import * as Style from "./Style";
import useOnScreen from "../../Hooks/useOnScreen/useOnScreen";
import UploadNewDocument from "./UploadNewDocument";
import SignDocument from "./SignDocument";
import { MyButton } from "../../Atoms/Components/Button";
import { useForm } from "antd/lib/form/Form";

const totalSectionCount = 3;
export default function QuickStart() {
  const headerTwoRef = useRef();
  const visible = useOnScreen(headerTwoRef, "-150px");
  const [pageCount, setPageCount] = useState(0);
  const [form] = useForm();

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
          <MyButton className="bg-primary" onClick={handleClickBack} style={{ border: 'none', margin: '0 0.5rem' }}>
            <ArrowLeftOutlined />
            Back
          </MyButton>
        }
        {pageCount !== totalSectionCount - 1 &&
          <MyButton disabled={form.getFieldValue('newFileName') === null} className="bg-primary" onClick={handleClickNext} style={{ border: 'none', margin: '0 0.5rem' }}>
            Next
            <ArrowRightOutlined />
          </MyButton>
        }
        {
          pageCount === totalSectionCount - 1 &&
          <MyButton className="bg-primary" onClick={handleClickNext} style={{ border: 'none', margin: '0 0.5rem' }}>
            Done
          </MyButton>
        }
      </>
    );
  };

  const INIT_FORM_VALUE = {
    fileName: null,
    newfileName: null,
    myself: true,
    assignOthers: false,
    user: {
      email: '111@gmail.com'
    }
  };

  const steps = [{ title: 'Upload', stepTitle: 'Upload New Document' }, { title: 'Sign', stepTitle: 'Sign' }, { title: 'Review', stepTitle: 'Review' },];
  return (
    <>
      <MyHeader renderButtons={HeaderButton} />
      <div style={{ height: '100vh' }}>
        <Form initialValues={INIT_FORM_VALUE} form={form} onValuesChange={(changedValue, allValue) => {
          console.debug(`🎲 ~ file: QuickStart.js ~ line 64 ~ QuickStart ~ all`, allValue);
        }}>
          <div style={{ display: 'flex', background: visible ? 'none' : '#fff', position: visible ? 'relative' : 'fixed', width: '100%', zIndex: 1, transition: '0.1s all ease', padding: '0 1rem' }} >
            {!visible && <h2 style={{ position: 'absolute', fontWeight: 'bold', lineHeight: '60px' }} className="c-primary">{steps[pageCount].stepTitle}</h2>}
            <div style={{ width: '80%', maxWidth: '500px', margin: '1rem auto' }}>
              <Style.MySteps current={pageCount}>
                {steps.map((item) => (
                  <Steps.Step key={item.title} title={item.title} />
                ))}
              </Style.MySteps>
            </div>
          </div>
          <Style.QuickStartPagesContainer count={pageCount}>
            <UploadNewDocument form={form} headerTwoRef={headerTwoRef} visible={visible} pageCount={pageCount} />
            <SignDocument form={form} headerTwoRef={headerTwoRef} visible={visible} pageCount={pageCount} />

            <section>
              <Style.SectionContainer style={{ background: visible ? '#fff' : 'none' }}>
                <div style={{ padding: "2% 4%", margin: '3rem auto', maxWidth: '800px', background: '#fff' }}>
                  <h1 className='c-primary'>Review</h1>
                </div>
              </Style.SectionContainer>
            </section>

          </Style.QuickStartPagesContainer>
        </Form>
      </div>
    </>
  );
}
