import React, { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import getScaledDim from "../../utils/getScaledDim";
import { signAtom } from "../../data";
import { Button, Input } from "antd";
import * as Style from "./Style";

const canvasSize = 400;

const Imagebox = (props) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [src, setSrc] = useState(null);
  const [_, setSignData] = useAtom(signAtom);

  useEffect(() => {
    const c = canvasRef.current;
    setCanvas(c);
    if (c) setCtx(c.getContext("2d"));
  }, [canvasRef]);

  //. 清除 */
  const handleClear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  /** image */
  const handleUploadImage = (event) => {
    handleClear();
    const f = event.target.files[0];
    const ctx = canvasRef.current.getContext("2d");
    const img = new Image();
    img.onload = function () {
      const scaled = getScaledDim(img, canvasSize, canvasSize * 2);
      // scale canvas to image
      ctx.width = scaled.width;
      ctx.height = scaled.height;
      // draw image
      ctx.drawImage(img, 0, 0, ctx.width, ctx.height);
      // ctx.drawImage(img, 0, 0, img.width, img.height);
    };
    img.src = URL.createObjectURL(f);
  };

  //. 轉圖片 */
  const handleConvertToImage = () => {
    const image = canvas.toDataURL();
    setSignData(image);
    setSrc(image);
    props.onOk();
  };

  const handleSave = () => {
    handleConvertToImage();
    props.onOk();
  };

  return (
    <>
      <div style={{ marginBottom: `1rem` }}>
        Upload Image:
        <input accept=".jpg,.png,.jpeg" type="file" onChange={handleUploadImage} />
      </div>
      <canvas
        style={{ display: 'none' }}
        ref={canvasRef}
        // width={canvasWidth} height={canvasHeight}
        width={canvasSize}
        height={canvasSize * 2}
      ></canvas>
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

      {src && (
        <img
          src={src}
          alt="signImage"
          style={{ color: "#FFF", border: "1px solid #000" }}
        />
      )}
    </>
  );
};

export default Imagebox;

// https://codepen.io/albee/pen/ZPjygx
