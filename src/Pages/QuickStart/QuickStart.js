import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import MyHeader from "../../Common/MyHeader/MyHeader";
import Output from "../../Common/Output/Output";
import Signbox from "../../Common/Signbox/Signbox";
import UploadFile from "../../Common/UploadFile/UploadFile";
import { QuickStartPagesContainer } from "./Style";

const totalSectionCount = 2;
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
          <Button className="bg-primary" onClick={handleClickBack} style={{ border: 'none' }}>Back</Button>
        }
        {pageCount !== totalSectionCount - 1 &&
          <Button className="bg-primary" onClick={handleClickNext} style={{ border: 'none' }}>Next</Button>
        }
      </>
    );
  };
  return (
    <>
      <MyHeader renderButtons={HeaderButton} />
      <QuickStartPagesContainer count={pageCount}>
        <section>
          <div style={{ padding: "2% 4%", margin: '3rem auto', maxWidth: '800px', background: '#fff' }}>
            <h1 className='c-primary'>Create a new project</h1>
            <Button onClick={() => setIsModalVisible(true)}>Sign</Button>
            <Modal
              open={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              onOk={() => setIsModalVisible(false)}
              footer={null}
            >
              <Signbox onOk={() => setIsModalVisible(false)} />
            </Modal>
            <div style={{ margin: "auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <div style={{ display: "flex" }}>Upload Document</div>
                <UploadFile />
              </div>
            </div>
          </div >
        </section>
        <section>
          <div style={{ padding: "2% 4%", margin: '3rem auto', maxWidth: '800px', background: '#fff' }}>
            <h1 className='c-primary'>output</h1>
            <Output />
          </div>
        </section>
      </QuickStartPagesContainer>
    </>
  );
}
