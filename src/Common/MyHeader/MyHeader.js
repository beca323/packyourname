import React from "react";
import * as Style from "./Style";
import { PropTypes } from 'prop-types';
function MyHeader(props) {
  const { renderButtons } = props;
  return (
    <Style.MyHeader>
      <div>Logo</div>
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