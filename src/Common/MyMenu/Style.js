import { Menu } from "antd";
import styled from "styled-components";

export const Logo = styled.button`
background: none;
border: none;
position: absolute;
width: 256px;
display: flex;
justify-content: center;
align-items: center;
padding: 30px 0;
color: #fff;
font-size: 2rem;
font-weight: bold;
cursor: pointer;
z-index: 2;
`

export const MyMenu = styled(Menu)`
  z-index: 1;
  padding-top: 100px;
  background: linear-gradient(270.15deg, #006CAC 0%, #19A8B8 100%);
  width: 256px;
  color: #fff;
  font-weight: bold;
  overflow: hidden;
  height: 100vh;
  .ant-menu-item-active{
    &:hover{
      color: #fff;
      background: rgba(255,255,255,0.2);
    }
  }
  .ant-menu-item-selected{
    color: #fff;
    background-color: #1C4F6D !important;
  }
`
