import { FileTextOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom'
import * as Style from './Style'

const items = [
  {
    label: "My Documnt",
    icon: <FileTextOutlined />,
    key: '/main/mydoc',
  },
  {
    label: "My Signature",
    icon: <FileTextOutlined />,
    key: '/main/mysign',
  },
  {
    label: "Draft",
    icon: <FileTextOutlined />,
    key: '/main/draft',
  },
  {
    label: "Shared With Me",
    icon: <FileTextOutlined />,
    key: '/main/sharedwithme',
  },
  {
    label: "Settings",
    icon: <FileTextOutlined />,
    key: '/main/settings',
  },
  {
    label: "Deleted",
    icon: <FileTextOutlined />,
    key: '/main/deleted',
  },
]

const MyMenu = () => {
  const navigate = useNavigate()

  const Logo = () => {
    return (
      <Style.Logo
        onClick={() => navigate("/")}
      >
        Logo
      </Style.Logo>
    )
  }
  const onClick = (e) => {
    console.log('click ', e);
    navigate(e.key)
  };
  return (
    <>
      <Style.MyMenu
        onClick={onClick}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
      <Logo />
    </>
  );
};
export default MyMenu;