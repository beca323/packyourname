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
import { Document, Page } from "react-pdf";

const totalSectionCount = 3;
export default function QuickStart() {
  const headerTwoRef = useRef();
  const [fileUploaded, setFileUploaded] = useState(false);
  const visible = useOnScreen(headerTwoRef, "0px");
  const [pageCount, setPageCount] = useState(0);
  const [toDownload, setToDownload] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [form] = useForm();

  const handleClickNext = () => {
    if (pageCount >= totalSectionCount - 1) return;
    setPageCount((prev) => prev + 1);
  };
  const handleClickBack = () => {
    if (pageCount === 0) return;
    setPageCount((prev) => prev - 1);
  };
  const handleClickDone = () => {
    setToDownload(true);
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
          <MyButton disabled={!fileUploaded} className="bg-primary" onClick={handleClickNext} style={{ border: 'none', margin: '0 0.5rem' }}>
            Next
            <ArrowRightOutlined />
          </MyButton>
        }
        {
          pageCount === totalSectionCount - 1 &&
          <MyButton className="bg-primary" onClick={handleClickDone} style={{ border: 'none', margin: '0 0.5rem' }}>
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
      email: ''
    }
  };

  const steps = [{ title: 'Upload', stepTitle: 'Upload New Document' }, { title: 'Sign', stepTitle: 'Sign' }, { title: 'Review', stepTitle: 'Review' },];
  return (
    <>
      <MyHeader renderButtons={HeaderButton} />
      <div style={{ position: 'relative' }}>
        <Form initialValues={INIT_FORM_VALUE} form={form} onValuesChange={(changedValue, allValue) => {
          console.debug(`🎲 ~ file: QuickStart.js ~ line 64 ~ QuickStart ~ all`, allValue);
        }}>
          {pageCount === 1 && <AllPages pdfFile={pdfFile} />}
          <div style={{ display: 'flex', background: (visible || pageCount !== 0) ? '#F5F9FA' : '#fff', padding: '0 1rem' }} >
            {!visible && <h2 style={{ position: 'absolute', fontWeight: 'bold', lineHeight: '60px' }} className="c-primary">{steps[pageCount].stepTitle}</h2>}
            <div style={{ width: '80%', maxWidth: '380px', margin: '1rem auto' }}>
              <Style.MySteps current={pageCount}>
                {steps.map((item) => (
                  <Steps.Step key={item.title} title={item.title} />
                ))}
              </Style.MySteps>
            </div>
          </div>


          <Style.QuickStartPagesContainer count={pageCount}>
            <UploadNewDocument setPdfFile={setPdfFile} setFileUploaded={setFileUploaded} form={form} headerTwoRef={headerTwoRef} visible={visible} pageCount={pageCount} />
            <SignDocument pdfFile={pdfFile} form={form} toDownload={toDownload} headerTwoRef={headerTwoRef} visible={visible} pageCount={pageCount} />

            <section>
              <Style.SectionContainer style={{ background: visible ? '#fff' : 'none' }}>
                <div style={{ margin: '1rem auto', maxWidth: '800px' }}>
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

export function AllPages(props) {
  const { pdfFile } = props;
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <Style.AllPagesContainer>
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <div className="one-page" key={index}>
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            <p style={{ color: '#A6A6A6' }}>{index + 1} of {numPages}</p>
          </div>
        ))}
      </Document>
    </Style.AllPagesContainer>
  );
}