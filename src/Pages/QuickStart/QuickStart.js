import { ArrowLeftOutlined, ArrowRightOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Modal, Steps } from "antd";
import React, { useEffect, useRef, useState } from "react";
import MyHeader from "../../Common/MyHeader/MyHeader";
import * as Style from "./Style";
import useOnScreen from "../../Hooks/useOnScreen/useOnScreen";
import UploadNewDocument from "./UploadNewDocument";
import SignDocument, { SignTools, SmallSignTools } from "./SignDocument";
import { MyButton } from "../../Atoms/Components/Button";
import { useForm } from "antd/lib/form/Form";
import { Document, Page } from "react-pdf";
import jsPDF from "jspdf";
import { pdfjs } from "react-pdf";
import Icon from "@ant-design/icons";
import { ReactComponent as Menu } from "../../Atoms/Icons/Menu.svg";
import useMediaQuery from "../../Hooks/useMediaQuery/useMediaQuery";
import { useNavigate } from "react-router-dom";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const totalSectionCount = 3;
export default function QuickStart() {
  const headerTwoRef = useRef();
  const [fileUploaded, setFileUploaded] = useState(false);
  const visible = useOnScreen(headerTwoRef, "0px");
  const [pageCount, setPageCount] = useState(0);
  const [toPreview, setToPreview] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [prevPage, setPrevPage] = useState(1);
  const [previewSrcs, setPreviewSrcs] = useState([]);
  const [pagesVisible, setPagesVisible] = useState(false);
  const [signToolVisible, setSignToolVisible] = useState(false);
  const [form] = useForm();
  const [isSignModalVisible, setIsSignModalVisible] = useState(false);
  const [isTextModalVisible, setIsTextModalVisible] = useState(false);
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const isSmall = useMediaQuery("(max-width: 800px)");
  const navigate = useNavigate();

  const handleClickNext = () => {
    if (pageCount >= totalSectionCount - 1) return;
    setPageCount((prev) => prev + 1);
    if (pageCount === 1) {
      setToPreview(true);
    } else {
      setToPreview(false);
    }
  };
  const handleClickBack = () => {
    if (pageCount === 0) return;
    setPageCount((prev) => prev - 1);
  };
  const handleClickDone = () => {
    const pdf = new jsPDF();
    previewSrcs.map((src, index) => {
      if (src) {
        pdf.addImage(src, 'JPEG', 0, 0);
        if (index === previewSrcs.length - 1) return;
        pdf.addPage();
      }
    });
    const fileName = form.getFieldValue('fileName');
    pdf.save(fileName ? `${fileName}.pdf` : 'PackYourName.pdf');
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
            Download
          </MyButton>
        }
      </>
    );
  };

  const SmallHeaderButton = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        {pageCount === 1 ? <Icon component={Menu} style={{ fontSize: '2rem' }} onClick={toggleMenu} /> : <br />}
        {<CloseOutlined onClick={() => navigate('/')} style={{ fontSize: '2rem' }} />}
      </div>
    );
  };

  const BottomButtons = () => {
    return (
      <Style.BottomButtons>
        {pageCount === 1 && OpenSignTool()}
        {pageCount !== totalSectionCount - 1 &&
          <MyButton disabled={!fileUploaded} className="bg-primary" onClick={handleClickNext} style={{ border: 'none', margin: '0 0.5rem' }}>
            Next
            <ArrowRightOutlined />
          </MyButton>
        }
        {
          pageCount === totalSectionCount - 1 &&
          <MyButton className="bg-primary" onClick={handleClickDone} style={{ border: 'none', margin: '0 0.5rem' }}>
            Download
          </MyButton>
        }
      </Style.BottomButtons>
    );
  };

  const OpenSignTool = () => {
    return (
      <>
        <Style.OpenSignTool onClick={() => setSignToolVisible(!signToolVisible)}><PlusOutlined /></Style.OpenSignTool>
        {signToolVisible && (
          <Style.SignToolsModal
            open={signToolVisible}
            footer={null}
            onCancel={() => setSignToolVisible(false)}
            closable={false}
            style={{ position: 'absolute', right: '1rem', top: '53vh' }}
            width="3rem"
          >
            <div style={{ height: '21rem', position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <SmallSignTools setSignToolVisible={setSignToolVisible} setIsDateModalVisible={setIsDateModalVisible} setIsSignModalVisible={setIsSignModalVisible} setIsTextModalVisible={setIsTextModalVisible} setIsImageModalVisible={setIsImageModalVisible} />
              <div className="close c-primary" onClick={() => { setSignToolVisible(false); }}><CloseOutlined /></div>
            </div>
          </Style.SignToolsModal>
        )}
      </>
    );
  };

  const toggleMenu = () => {
    setPagesVisible(!pagesVisible);
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
  const customDot = (dot, { status, index }) => (
    <div style={{ background: '#9c9c9c', width: '12px', height: '12px', borderRadius: '50%', transform: 'translateX(-1px)' }}>
      {dot}<span style={{ opacity: 0 }}>{status}</span>
      {status === 'process' ? <div style={{ width: '10px', height: '10px', background: '#f2f8f9', transform: 'translateX(1px) translateY(-27px)', borderRadius: '50%' }}></div> : ''}
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <MyHeader renderButtons={isSmall ? SmallHeaderButton : HeaderButton} showName={!isSmall} />
      <div style={{ position: 'relative', height: 'calc(100vh - 60px)', overflow: 'auto' }}>
        <Form initialValues={INIT_FORM_VALUE} form={form} onValuesChange={(changedValue, allValue) => {
          // console.debug(`🎲 ~ file: QuickStart.js ~ line 64 ~ QuickStart ~ all`, allValue);
        }}>
          {(pageCount === 1) && (
            <AllPages previewSrcs={previewSrcs} setPreviewSrcs={setPreviewSrcs}
              pdfFile={pdfFile} activePage={activePage} setActivePage={setActivePage}
              setPrevPage={setPrevPage} isSmall={isSmall} pagesVisible={pagesVisible} />
          )}
          <div style={{ display: 'flex', padding: '0 1rem' }} >
            {!visible && !isSmall && <h2 style={{ position: 'absolute', fontWeight: 'bold', lineHeight: '60px' }} className="c-primary">{steps[pageCount].stepTitle}</h2>}
            <div style={{ width: '100%', maxWidth: isSmall ? '' : '410px', transform: isSmall ? 'scale(0.9) translateX(-5%)' : '', margin: '1rem auto' }}>
              <Style.CustomSteps
                current={pageCount}
                progressDot={customDot}
                responsive={false}
              >
                {steps.map((item) => (
                  <Steps.Step key={item.title} title={item.title} />
                ))}
              </Style.CustomSteps>
            </div>
          </div>

          <Style.QuickStartPagesContainer count={pageCount}>
            <UploadNewDocument setPreviewSrcs={setPreviewSrcs} previewSrcs={previewSrcs} pageNumber={activePage} pdfFile={pdfFile} setPdfFile={setPdfFile} setFileUploaded={setFileUploaded} form={form} headerTwoRef={headerTwoRef} visible={visible} pageCount={pageCount} />
            <SignDocument
              setIsDateModalVisible={setIsDateModalVisible} setIsTextModalVisible={setIsTextModalVisible} setIsSignModalVisible={setIsSignModalVisible} setIsImageModalVisible={setIsImageModalVisible}
              isDateModalVisible={isDateModalVisible} isTextModalVisible={isTextModalVisible} isSignModalVisible={isSignModalVisible} isImageModalVisible={isImageModalVisible}
              isSmall={isSmall} prevPage={prevPage} setPrevPage={setPrevPage} toPreview={toPreview} previewSrcs={previewSrcs} setPreviewSrcs={setPreviewSrcs} pageNumber={activePage} pdfFile={pdfFile} form={form} headerTwoRef={headerTwoRef} visible={visible} pageCount={pageCount} />

            <section style={{ height: 'fit-content', paddingBottom: '200px' }}>
              <Style.SectionContainer style={{ background: visible ? '#fff' : 'none' }}>
                <div style={{ margin: '1rem auto', maxWidth: '800px' }}>
                  <h1 className='c-primary'>Review</h1>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {previewSrcs.map((src, index) => {
                      return (
                        <div key={index} style={{ transform: 'scale(0.95) ' }}>
                          <img src={src} alt="" style={{ width: '100%' }} />
                        </div>
                      );
                    })}
                    <div> -- END -- </div>
                  </div>
                </div>
              </Style.SectionContainer>
            </section>

          </Style.QuickStartPagesContainer>
        </Form>
      </div>
      {!isSmall && pageCount === 1 && <SignTools setIsDateModalVisible={setIsDateModalVisible} setIsSignModalVisible={setIsSignModalVisible} setIsTextModalVisible={setIsTextModalVisible} setIsImageModalVisible={setIsImageModalVisible} />}
      {/* {isSmall && pageCount === 1 && OpenSignTool()} */}
      {isSmall && BottomButtons()}
    </div>
  );
}

export function AllPages(props) {
  const { pdfFile, activePage, setActivePage, setPreviewSrcs, previewSrcs, setPrevPage, pagesVisible } = props;
  const [numPages, setNumPages] = useState(null);
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [srcs, setSrcs] = useState([]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    if (props.previewSrcs !== []) return; // . 避免返回時清空array
    const arr = new Array(numPages).fill('');
    setPreviewSrcs(arr);
  };

  const handleChangePage = (index) => {
    setPrevPage(activePage);
    setActivePage(index + 1);
  };

  const renderFile = (file, pageNumber = 1) => {
    let fileReader = new FileReader();
    fileReader.onload = function () {
      const pdfData = new Uint8Array(this.result);
      // . Using DocumentInitParameters object to load binary data.
      const loadingTask = pdfjs.getDocument({ data: pdfData });
      loadingTask.promise.then(
        function (pdf) {
          pdf.getPage(pageNumber).then(function (page) {
            const scale = 1.3;
            const viewport = page.getViewport({ scale });
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            const renderContext = {
              canvasContext: ctx,
              viewport: viewport
            };
            const renderTask = page.render(renderContext);
            renderTask.promise.then(() => {
              const image = canvas.toDataURL();
              props.setPreviewSrcs(prev => [...prev, image]);
            }).then(() => {
              if (pageNumber < numPages) {
                renderFile(file, pageNumber + 1);
              } else {
                setIsLoading(false);
              }
            });
          });
        },
        function (error) { console.error(error); }
      );
    };
    fileReader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    if (props.previewSrcs.length > 0 || !canvas) return;
    setIsLoading(true);
    renderFile(pdfFile);
  }, [numPages]);

  useEffect(() => {
    const c = canvasRef.current;
    setCanvas(c);
    if (c) setCtx(c.getContext("2d"));
  }, []);

  useEffect(() => {
    setSrcs(previewSrcs);
  }, [activePage, previewSrcs]);

  return (
    <Style.AllPagesContainer visible={pagesVisible}>
      <Modal open={isLoading} footer={null} closable={false} centered>loading...</Modal>
      <canvas ref={canvasRef} style={{ boxShadow: "0 0 10px #eeeeff", display: 'none' }}></canvas>
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {numPages !== null && Array.from(new Array(numPages), (el, index) => (
          <div className={activePage === index + 1 ? `one-page active` : `one-page`} key={index}
            onClick={() => handleChangePage(index)}
          >
            {props.previewSrcs && props.previewSrcs[index]
              ? <img style={{ width: '92px', margin: 'auto' }} src={srcs[index]} alt="" />
              : <Page key={`page_${index + 1}`} pageNumber={index + 1} />}
            <p style={{ color: '#A6A6A6', margin: '0', textAlign: 'end', paddingRight: '12px' }}>{index + 1} of {numPages}</p>
          </div>
        ))}
      </Document>
    </Style.AllPagesContainer >
  );
}