import { Button, Tabs } from "antd";
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AllDocs from "./AllDocs/AllDocs";

export default class MyDocuments extends Component {
  render() {
    return (
      <>
        <Overview />
      </>
    );
  }
}

const MyTabs = styled(Tabs)`
.ant-tabs-nav-wrap{
  height: 70px;
  .ant-tabs-tab{
    color: #7B7B7B;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
    color: #026CAD;
  }
}
`;

export function Overview() {
  const navigate = useNavigate();
  const renderTab = (count, name) => {
    return (
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ opacity: 0 }}>.</div>
        <div style={{ fontSize: "1.6rem", lineHeight: "1.5rem", fontWeight: "bold" }}>{count}</div>
        <div>{name}</div>
      </div>
    );
  };


  const TabContent = [
    {
      key: "1",
      label: renderTab(10, "All Document"),
      children: <AllDocs />
    },
    {
      key: "2",
      label: renderTab(1, "Important"),
      children: <div> Important!!! </div>
    },
    {
      key: "3",
      label: renderTab(5, "To Do"),
      children: <div> to do </div>
    },
    {
      key: "4",
      label: renderTab(3, "Finished"),
      children: <div>to do </div>
    },
    {
      key: "5",
      label: renderTab(9, "Others"),
      children: <div>to do </div>
    },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 2rem" }}>
      <MyTabs defaultActiveKey="1" items={TabContent} />
      <Button onClick={() => navigate("/quickstart")}>Upload</Button>
    </div>
  );
}