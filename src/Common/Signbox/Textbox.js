import React, { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { signAtom } from "../../data";
import { Button, Input } from "antd";

const canvasSize = 140;

const Textbox = (props) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [src, setSrc] = useState(null);
  const [_, setSignData] = useAtom(signAtom);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const c = canvasRef.current;
    setCanvas(c);
    if (c) setCtx(c.getContext("2d"));
  }, [canvasRef]);

  //. 清除 */
  const handleClear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  //. 轉圖片 */
  const handleConvertToImage = () => {
    const image = canvas.toDataURL();
    setSignData(image);
    // setSrc(image);
    props.onOk();
  };

  const handleSave = () => {
    handleClear();
    ctx.font = '30px Comic Sans MS';
    ctx.textAlign = 'center';
    ctx.fillText(inputText, canvasSize / 2, canvasSize / 4);
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
      <Input onChange={(e) => setInputText(e.target.value)} />

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
