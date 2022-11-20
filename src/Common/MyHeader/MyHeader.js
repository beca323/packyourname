import React from "react";
import * as Style from "./Style";
import { PropTypes } from 'prop-types';
import { useNavigate } from "react-router-dom";
function MyHeader(props) {
  const navigate = useNavigate();

  const { renderButtons, showName } = props;
  return (
    <>
      <div style={{ height: '60px', opacity: 0 }}>.</div>
      <Style.MyHeader>
        {showName && <div style={{ cursor: 'pointer', textAlign: 'start' }}>
          <div onClick={() => navigate('/')} style={{ width: 'fit-content' }}>Pack Your Name</div>
        </div>}
        {renderButtons
          ? <div>{renderButtons()}</div>
          : <div style={{ opacity: 0 }}>.</div>}
      </Style.MyHeader>
    </>
  );
}

MyHeader.protoTypes = {
  renderButtons: PropTypes.func,
  showName: PropTypes.bool,
};

MyHeader.defaultProps = {
  renderButtons: () => { },
  showName: false,
};

export default MyHeader;