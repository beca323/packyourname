import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Input, Steps } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useRef, useState } from "react";
import MyHeader from "../../Common/MyHeader/MyHeader";
import Output from "../../Common/Output/Output";
import Signbox from "../../Common/Signbox/Signbox";
import UploadFile from "../../Common/UploadFile/UploadFile";
import Checkbox from "../../Atoms/Components/Checkbox";
import * as Style from "./Style";
import useOnScreen from "../../Hooks/useOnScreen/useOnScreen";

const totalSectionCount = 3;
export default function QuickStart() {
  const headerTwoRef = useRef();
  const visible = useOnScreen(headerTwoRef, "-100px");
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
      <div style={{ display: 'flex', background: visible ? 'none' : '#fff', position: visible ? 'relative' : 'fixed', width: '100%', top: '60px', zIndex: 1, transition: '0.1s all ease', padding: '0 1rem' }} >
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
        <section>
          <Style.SectionContainer style={{ background: visible ? '#fff' : 'none' }}>
            <h1 className='c-primary'>Upload New Document</h1>
            <div ref={headerTwoRef}></div>
            <div style={{ margin: "auto", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
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
              <Style.SubSection>
                signatory
                <Checkbox />Myself
                <Checkbox />Invite / Assign Others
              </Style.SubSection>
              <Style.SubSection>
                <section>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde incidunt,
                    nam id itaque error dicta? Numquam earum iusto optio officia, molestias
                    debitis illum facilis nemo asperiores eaque voluptates modi? Dicta
                    mollitia fugit doloremque vitae, dolores sequi fuga quas vel incidunt
                    animi architecto dignissimos amet in quam praesentium corrupti voluptate
                    dolorem impedit numquam aut cupiditate nulla! Nisi dolore dicta, cumque
                    illum tempora enim dolores eum quis itaque nostrum architecto vel cum
                    officiis aperiam qui exercitationem voluptatibus. Veritatis unde
                    doloribus dolorem architecto, eum reprehenderit possimus similique eius
                    cum obcaecati totam placeat. Delectus nulla, quae temporibus omnis
                    assumenda autem ad quibusdam facilis aspernatur inventore nobis. Vitae
                    architecto, unde consequuntur velit consequatur dicta mollitia, fuga
                    iure hic accusamus blanditiis. Dignissimos, tenetur amet adipisci
                    nostrum perferendis ad rerum accusamus distinctio repellendus eius,
                  </div>
                </section>
              </Style.SubSection>
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
