import { Modal, Steps } from 'antd';
import styled from 'styled-components';

export const QuickStartPagesContainer = styled.div`
display: flex;
overflow: hidden;
> section{
  transition: 0.5s all ease;
  transform: translateX(${props => props.count * -100}vw);
  min-width: 100vw;
  height: 130vh;
}
`;

export const SectionContainer = styled.div`
  padding: 0 4%;
  margin: 1rem auto;
  max-width: 800px;
  background: #fff;
  transition: all .5s ease;
`;


export const SubSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SignTools = styled.div`
z-index: 2;
position: absolute;
right: 0;
top: 20vh;
padding: 0 1rem;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
background: #fff;
border-radius: 10px 0 0 10px;
svg{
  font-size: 2rem;
  fill: #fff;
}
.tool{
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
}
`;
export const DateModal = styled(Modal)`
.ant-modal-close-x{
  display: none;
}
`;

export const AllPagesContainer = styled.div`
background: #fff;
position: fixed;
box-shadow: 0px 0px 10px #00000011;
z-index: 2;
transition: all .2s ease;
transform: ${props => props.visible ? 'translateX(-100%)' : ''};
.react-pdf__Document{
  height: calc(100vh - 60px);
  overflow: auto;
  padding: 0.5rem 0;
}
.one-page{
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  margin: 4px 16px;
  border-radius: 4px;
  transition: .1s all;
  width: 112px;
  .react-pdf__Page__canvas, img{
    box-shadow: 0px 0px 5px 0px #00000040;
  }
  &:hover , &.active{
    background-color: #cce2ef;
    p{
      color: #000 !important;
    }
  }
  .react-pdf__Page__textContent{
    display: none;
  }
}
.react-pdf__Page__canvas, img{
  box-shadow: 0px 0px 10px #00000011;
}
.react-pdf__Page__canvas , .react-pdf__Page__textContent{
  margin: 0 10px;
  width: 92px !important;
  height: ${1.414 * 92}px !important;
}
`;

export const CustomSteps = styled(Steps)`
.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot{
  background: linear-gradient(-90deg, #006CAC 0%, #19A8B8 100%);
  transform: scale(1.6);
}
.ant-steps-item-tail::after{
  transform: translateY(2px);
}
.ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-tail::after, .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-tail::after{
  background-color: #9c9c9c;
}
.ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot{
  background-color: #026CAD;
  transform: scale(1.6);
}
.ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after{
  background-color: #026CAD;
}
.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title{
  color: #026cad;
}
`;