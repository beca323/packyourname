import React, { useEffect, useRef, useState } from "react";
import getTouchPos from "../../utils/getTouchPos";
import getMousePos from "../../utils/getMousePos";

import { useAtom } from "jotai";
import { signAtom } from "../../data";
import { Button } from "antd";

const canvasSize = 400;

const Signbox = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [src, setSrc] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const [drawing, setDrawing] = useState(false);

  const [_, setSignData] = useAtom(signAtom);

  useEffect(() => {

    const c = canvasRef.current;
    console.debug("🙈 · useEffect · canvasRef.current", canvasRef.current);

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
    ctx.shadowColor = "black"; // 邊緣顏色
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
    ctx.shadowColor = "black"; // 邊緣顏色
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
    setSuccessMsg("done");
  };

  return (
    <div>
      <canvas
        style={{ background: "#EEE" }}
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
      <div>
        <Button onClick={handleClear}>清除</Button>
        <Button onClick={handleConvertToImage}>完成</Button>
      </div>

      {src && successMsg}

      {/* {src && (
        <img
          src={src}
          alt="signImage"
          style={{ color: "#FFF", border: "none" }}
        />
      )} */}
    </div>
  );
};

export default Signbox;

// https://codepen.io/albee/pen/ZPjygx
