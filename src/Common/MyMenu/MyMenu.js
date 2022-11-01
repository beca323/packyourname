import { FileTextOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Style from "./Style";

const items = [
  {
    label: <Style.Logo>Logo</Style.Logo>,
    key: "/",
  },
  {
    label: "My Document",
    icon: <FileTextOutlined />,
    key: "/dashboard/mydoc",
  },
  {
    label: "My Signature",
    icon: <FileTextOutlined />,
    key: "/dashboard/mysign",
  },
  {
    label: "Draft",
    icon: <FileTextOutlined />,
    key: "/dashboard/draft",
  },
  {
    label: "Shared With Me",
    icon: <FileTextOutlined />,
    key: "/dashboard/sharedwithme",
  },
  {
    label: "Settings",
    icon: <FileTextOutlined />,
    key: "/dashboard/settings",
  },
  {
    label: "Deleted",
    icon: <FileTextOutlined />,
    key: "/dashboard/deleted",
  },
];

const MyMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();


  const onClick = (e) => {
    console.log("click ", e);
    navigate(e.key);
  };
  return (
    <>
      <Style.MyMenu
        onClick={onClick}
        defaultSelectedKeys={["/dashboard/mydoc"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
        inlineCollapsed={collapsed}
      />
      {/* <Logo /> */}
    </>
  );
};
export default MyMenu;