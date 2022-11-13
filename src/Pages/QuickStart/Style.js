import { Modal, Steps } from 'antd';
import styled from 'styled-components';

export const QuickStartPagesContainer = styled.div`
// height: 100vh;
display: flex;
overflow: hidden;
> section{
  transition: 0.5s all ease;
  transform: translateX(${props => props.count * -100}vw);
  min-width: 100vw;
  height: calc(100vh - 124px);
}
`;

export const MySteps = styled(Steps)`
.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-icon{
  background: linear-gradient(270.15deg, #006CAC 0%, #19A8B8 100%);
}
.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-icon .ant-steps-icon{
  // opacity: 0;
}
.ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon{
  // opacity: 0;
}
.ant-steps-item-finish .ant-steps-item-icon{
  background: linear-gradient(270.15deg, #006CAC 0%, #19A8B8 100%);
}
.anticon{
  color: #fff;
}
`;

export const SectionContainer = styled.div`
  padding: 2% 4%;
  margin: 3rem auto;
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
top: 30vh;
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
position: absolute;
box-shadow: 0px 0px 10px #00000011;
z-index: 2;
.react-pdf__Document{
  height: calc(100vh - 60px);
  overflow: auto;
}
.one-page{
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  margin: 0 16px;
  border-radius: 6px;
  transition: .1s all;
  &:hover{
    background-color: #cce2ef;
    p{
      color: #000 !important;
    }
  }
}
.react-pdf__Page__canvas{
  box-shadow: 0px 0px 10px #00000011;
}
.react-pdf__Page__canvas , .react-pdf__Page__textContent{
  margin: 0 10px;
  width: 92px !important;
  height: ${1.414 * 92}px !important;
}
`;