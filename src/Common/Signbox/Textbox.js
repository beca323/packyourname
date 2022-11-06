import React, { useEffect, useRef, useState } from "react";
import getTouchPos from "../../utils/getTouchPos";
import getMousePos from "../../utils/getMousePos";
import { useAtom } from "jotai";
import { signAtom } from "../../data";
import { Button, Input, Radio } from "antd";
import * as Style from "./Style";

const canvasSize = 470;

const Signbox = (props) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [src, setSrc] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [_, setSignData] = useAtom(signAtom);
  const [drawColor, setDrawColor] = useState('#000');



  useEffect(() => {

    const c = canvasRef.current;
    setCanvas(c);
    if (c) setCtx(c.getContext("2d"));
  }, [canvasRef]);

  //. 開始 */
  const handleTouchStart = (event) => {
    setDrawing(true);
    const touchPos = getTouchPos(canvas, event);
    ctx.beginPath(touchPos.x, touchPos.y);
    ctx.moveTo(touchPos.x, touchPos.y);
    event.preventDefault();
  };

  const handleMouseDown = (event) => {
    setDrawing(true);
    const mousePos = getMousePos(canvas, event);
    ctx.beginPath();
    ctx.moveTo(mousePos.x, mousePos.y);
    event.preventDefault();
  };

  //. 移動 */
  const handleTouchMove = (event) => {
    if (!drawing) return;
    const touchPos = getTouchPos(canvas, event);
    ctx.lineWidth = 2;
    ctx.lineCap = "round"; // 繪制圓形的結束線帽
    ctx.lineJoin = "round"; // 兩條線條交匯時，建立圓形邊角
    ctx.shadowBlur = 1; // 邊緣模糊，防止直線邊緣出現鋸齒
    ctx.shadowColor = drawColor; // 邊緣顏色
    ctx.strokeStyle = drawColor;
    ctx.lineTo(touchPos.x, touchPos.y);
    ctx.stroke();
  };

  const handleMouseMove = (event) => {
    if (!drawing) return;
    const mousePos = getMousePos(canvas, event);
    ctx.lineWidth = 2;
    ctx.lineCap = "round"; // 繪制圓形的結束線帽
    ctx.lineJoin = "round"; // 兩條線條交匯時，建立圓形邊角
    ctx.shadowBlur = 1; // 邊緣模糊，防止直線邊緣出現鋸齒
    ctx.shadowColor = drawColor; // 邊緣顏色
    ctx.strokeStyle = drawColor;
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
  };

  //. 結束 */
  const handleTouchEnd = (event) => {
    setDrawing(false);
  };

  const handleMouseUp = (event) => {
    setDrawing(false);
  };

  //. 清除 */
  const handleClear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  //. 轉圖片 */
  const handleConvertToImage = () => {
    const image = canvas.toDataURL();
    setSignData(image);
    setSrc(image);
    props.onOk();
  };

  return (
    <>
      <canvas
        style={{ border: '1px solid #A6A6A6', borderRadius: '8px' }}
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize * 0.6}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
      <Input />

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

export default Signbox;

// https://codepen.io/albee/pen/ZPjygx
