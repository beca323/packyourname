import styled from "styled-components";

export const ColorPickerContainer = styled.div`
margin: 0.5rem 0;
display: flex;
align-items: center;
gap: 0.5rem;
.ant-radio{
  display: none;
}
.ant-radio-wrapper span  div{
  border: 4px solid #fff;
  box-sizing: content-box;
}
.ant-radio-wrapper-checked  span  div{
  border: 4px solid #BEBBBB;
  box-sizing: content-box;
  border-opacity: 0.5;
}
`;

export const Color = styled.div`
height: 24px;
width: 24px;
background-color: ${props => props.color};
border-radius: 50%;
cursor: pointer;
`;

export const DateStyle = styled.div`
font-size: 1.4rem;
width: 100%;
padding: 0.8rem;
margin: 0.4rem 0;
border-radius: 8px;
border: 1px solid #A6A6A6;
display: flex;
justify-content: center;
align-items: center;
transition: all 0.1s;
position: relative;
&:hover{
  border-color: #026CAD;
}
.checked{
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(-60%) translateX(40%);
  opacity: 0;
  background-color: #fff;
  height: 24px;
}
`;

export const RadioGroupContainer = styled.div`
.ant-radio{
  display: none;
}
span {
  width: 100%;
}
.ant-radio-wrapper-checked  span  div{
  border-color: #026CAD;
  .checked{
    opacity: 1;
  }
}
`;

