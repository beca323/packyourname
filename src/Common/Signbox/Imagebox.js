import React, { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import getScaledDim from "../../utils/getScaledDim";
import { signAtom } from "../../data";
import { Button, Input } from "antd";
import * as Style from "./Style";
import Dragger from "antd/lib/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import { UPLOAD_FILE } from "../../Constants/Constants";

const canvasSize = 400;

const Imagebox = (props) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [src, setSrc] = useState(null);
  const [_, setSignData] = useAtom(signAtom);
  const [fileName, setFileName] = useState('');

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
    if (f.type !== "image/png" && f.type !== "image/jpeg") {
      alert('請上傳 png/jpg');
      return;
    }
    if (f.size > UPLOAD_FILE.LIMIT_SIZE) {
      alert('檔案大小限制 20MB');
      return;
    }
    setFileName(f.name);

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
        {/* <input accept=".jpg,.png,.jpeg" type="file" onChange={handleUploadImage} /> */}
        <div>
          <div
            className="c-primary"
            style={{
              border: '2px dashed currentColor', position: 'absolute',
              width: '92%', height: '200px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}>
            <Button className="bg-primary" style={{ fontSize: '1.3rem', height: 'fit-content' }}>
              <span>Choose Files</span> &emsp;
              <span style={{ opacity: '0.6' }}>png/jpg</span>
            </Button>
            <div>
              {fileName ? fileName : (
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div className="c-primary">or drag to here</div>
                  <div className="c-gray">Limit: 20MB</div>
                </div>
              )}
            </div>
          </div>
          <div style={{ width: '92%' }}>
            <Input
              style={{ height: '200px', opacity: '0', cursor: 'pointer', }}
              accept=".jpg,.png,.jpeg" type="file" onChange={handleUploadImage} />
          </div>
        </div>
      </div>
      <canvas
        style={{ display: 'none' }}
        ref={canvasRef}
        // width={canvasWidth} height={canvasHeight}
        width={canvasSize}
        height={canvasSize}
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

export default Imagebox;

// https://codepen.io/albee/pen/ZPjygx
