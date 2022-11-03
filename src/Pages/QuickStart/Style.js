import { Steps } from 'antd';
import styled from 'styled-components';

export const QuickStartPagesContainer = styled.div`
// height: 100vh;
display: flex;
// overflow: hidden;
> section{
  transition: 0.5s all ease;
  transform: translateX(${props => props.count * -100}vw);
  min-width: 100vw;
  min-height: 100vh;
  overflow: auto;
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