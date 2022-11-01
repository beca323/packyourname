import { CheckOutlined } from '@ant-design/icons';
import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

const CheckboxStyle = styled.button`
  cursor: pointer;
  border: 1px solid #026CAD;
  color: ${props => props.checked ? '#FFF' : '#E8E8E8'} ;
  background: ${props => props.checked ? '#12C696' : 'none'} ;
  width: 2.4rem;
  height: 2rem;
`;


function Checkbox(props) {
  const [value, setValue] = useState(props.defaultValue);

  const handleClick = () => {
    setValue(!value);
    props.onClick(!value);
  };

  return (
    <CheckboxStyle checked={value} onClick={handleClick}><CheckOutlined /></CheckboxStyle>
  );
}

Checkbox.protoTypes = {
  defaultValue: PropTypes.bool,
};

Checkbox.defaultProps = {
  defaultValue: false,
};

export default Checkbox;