import React, { useEffect, useRef, useState } from "react";
import getTouchPos from "../../utils/getTouchPos";
import getMousePos from "../../utils/getMousePos";
import { useAtom } from "jotai";
import { signAtom } from "../../data";
import { Button, Input, Radio } from "antd";
import * as Style from "./Style";
import moment from "moment";
import { CheckCircleFilled } from "@ant-design/icons";

const canvasSize = 190;

const Textbox = (props) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [_, setSignData] = useAtom(signAtom);
  const [selectedDateFormat, setSelectedDateFormat] = useState('');

  useEffect(() => {
    const c = canvasRef.current;
    setCanvas(c);
    if (c) setCtx(c.getContext("2d"));
  }, [canvasRef]);

  //. 轉圖片 */
  const handleConvertToImage = () => {
    const image = canvas.toDataURL();
    setSignData(image);
    props.onOk();
  };

  const handleSave = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '30px Comic Sans MS';
    ctx.textAlign = 'center';
    ctx.fillText(selectedDateFormat, canvasSize / 2, canvasSize / 4);
    handleConvertToImage();
    props.onOk();
  };

  return (
    <>
      <canvas
        style={{ display: 'none' }}
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize * 0.4}
      ></canvas>
      <Style.RadioGroupContainer>
        <Radio.Group onChange={(e) => setSelectedDateFormat(e.target.value)}>
          <Radio style={{ width: '100%' }} value={moment().format('YYYY/MM/DD')}>
            <Style.DateStyle>
              <div className="checked"><CheckCircleFilled /></div>
              {moment().format('YYYY/MM/DD')}
            </Style.DateStyle>
          </Radio>
          <Radio style={{ width: '100%' }} value={moment().format('YYYY.MM.DD')}>
            <Style.DateStyle>
              <div className="checked"><CheckCircleFilled /></div>
              {moment().format('YYYY.MM.DD')}
            </Style.DateStyle>
          </Radio>
          <Radio style={{ width: '100%' }} value={moment().format('YYYY-MM-DD')}>
            <Style.DateStyle>
              <div className="checked"><CheckCircleFilled /></div>
              {moment().format('YYYY-MM-DD')}
            </Style.DateStyle>
          </Radio>
          <Radio style={{ width: '100%' }} value={moment().format('DD/MM/YYYY')}>
            <Style.DateStyle>
              <div className="checked"><CheckCircleFilled /></div>
              {moment().format('DD/MM/YYYY')}
            </Style.DateStyle>
          </Radio>
        </Radio.Group>
      </Style.RadioGroupContainer>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', padding: '0.5rem' }}>
        <Button
          style={{ border: 'none', borderRadius: '4px', lineHeight: '2rem', height: 'fit-content' }}
          className="c-primary"
          onClick={props.onCancel}>Cancel</Button>
        <Button
          style={{ border: 'none', borderRadius: '4px', lineHeight: '2rem', height: 'fit-content' }}
          className="bg-green"
          onClick={handleSave}>OK</Button>
      </div>

      {/* {src && (
        <img
          src={src}
          alt="signImage"
          style={{ color: "#FFF", border: "1px solid #000" }}
        />
      )} */}
    </>
  );
};

export default Textbox;

// https://codepen.io/albee/pen/ZPjygx
