import React from "react";
import * as Style from "./Style";
import { PropTypes } from 'prop-types';
import { useNavigate } from "react-router-dom";
function MyHeader(props) {
  const navigate = useNavigate();

  const { renderButtons } = props;
  return (
    <Style.MyHeader>
      <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Pack Your Name</div>
      {renderButtons
        ? <div>{renderButtons()}</div>
        : <div style={{ opacity: 0 }}>.</div>}
    </Style.MyHeader>
  );
}

MyHeader.protoTypes = {
  renderButtons: PropTypes.func,
};

MyHeader.defaultProps = {
  renderButtons: () => { },
};

export default MyHeader;