import { Menu } from "antd";
import styled from "styled-components";

export const MyMenu = styled(Menu)`
  z-index: 1;
  background: linear-gradient(180deg, #006CAC 0%, #19A8B8 100%);
  width: 256px;
  color: #fff;
  font-weight: bold;
  overflow: hidden;
  height: 100vh;
  padding: 1rem 0;
  .ant-menu-item-active{
    &:hover{
      color: #fff;
      background: rgba(255,255,255,0.2);
    }
    &:hover:first-child{
      background: none;
    }
  }
  .ant-menu-item-selected{
    color: #fff;
    background-color: #1C4F6D !important;
  }
  .ant-menu-vertical .ant-menu-item::after, .ant-menu-vertical-left .ant-menu-item::after, .ant-menu-vertical-right .ant-menu-item::after, .ant-menu-inline .ant-menu-item::after{
    border-right: 0px solid #fff !important;
  }
`

export const Logo = styled.div`
background: none;
border: none;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
color: #fff;
font-size: 2rem;
font-weight: bold;
cursor: pointer;
`