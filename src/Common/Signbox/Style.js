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