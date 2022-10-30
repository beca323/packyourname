import styled from 'styled-components';

export const QuickStartPagesContainer = styled.div`
height: 100vh;
display: flex;
overflow: hidden;
> section{
  transition: 0.5s all ease;
  transform: translateX(${props => props.count * -100}vw);
  min-width: 100vw;
  height: 100vh;
}
`;