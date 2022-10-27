import React from "react";
import MyHeader from "../../Common/MyHeader/MyHeader";
import Output from "../../Common/Output/Output";
import Signbox from "../../Common/Signbox/Signbox";
import UploadFile from "../../Common/UploadFile/UploadFile";

export default function QuickStart() {
  return (
    <>
      <MyHeader />
      <div style={{ padding: "2rem" }}>
        <h1 className='c-primary'>Create a new project</h1>
        <Signbox />
        <div style={{ width: "500px", margin: "auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <div style={{ display: "flex" }}>Upload Document</div>
            <UploadFile />
            {/* <UploadFileComponent /> */}
          </div>
          {/* <div>
            <div style={{ display: 'flex' }}>Document Name</div>
            <Input placeholder='Please Input' />
          </div> */}
        </div>
        <Output />
      </div>
    </>
  );
}
