import React from "react";
import * as Style from "./Style";

export default function MyHeader(props) {
  const { renderButtons } = props;
  return (
    <Style.MyHeader>
      <div>Logo</div>
      {renderButtons 
        ? <div>{renderButtons()}</div> 
        : <div style={{opacity: 0}}>.</div>}
    </Style.MyHeader>
  );
}

