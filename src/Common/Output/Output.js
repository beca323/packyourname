import React, { useEffect, useState, useRef } from "react";
import { useAtom } from "jotai";
import { bgFileAtom, signAtom } from "../../data";
import { Wrapper, Main, OutputCanvas } from "./Style";
import { fabric } from "fabric";
import { Button } from "antd";
import jsPDF from "jspdf";

const canvasOriginalHeight = 1200;
const canvasOriginalWidth = 800;

const Output = (props) => {
  const [signData] = useAtom(signAtom);
  const [bgFileData] = useAtom(bgFileAtom);
  const [testSrc, setTestSrc] = useState(null);

  const mainRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  // . 建立主要的 canvas */
  useEffect(() => {
    const c = new fabric.Canvas(mainRef.current);
    setCanvas(c);
  }, [mainRef, props.pageNumber]);

  // . 填上簽名 */
  useEffect(() => {
    if (canvas && signData) {
      fabric.Image.fromURL(signData, (img) => {
        img.scaleToWidth(100);
        img.scaleToHeight(150);
        canvas.add(img).renderAll();
      });
    } 
  }, [signData]);

  // . 填上背景檔案 */
  useEffect(() => {
    if (canvas && bgFileData) {
      fabric.Image.fromURL(bgFileData, (img) => {
        canvas.setBackgroundImage(bgFileData).renderAll();
        canvas.setHeight(img.height);
        canvas.setWidth(img.width);
        scaleAndPositionImage(img);
      });
    }
  }, [canvas, bgFileData, props.pageNumber]);

  useEffect(() => {
    const { toDownload } = props;
    if (!toDownload) return;
    download();
  }, [props.toDownload]);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  });

  // . 縮放 */
  const scaleAndPositionImage = (bgImage) => {
    const { canvasWidth, canvasHeight } = setCanvasZoom();

    const canvasAspect = canvasWidth / canvasHeight;
    const imgAspect = bgImage.width / bgImage.height;
    let left, top, scaleFactor;

    if (canvasAspect >= imgAspect) {
      scaleFactor = canvasWidth / bgImage.width;
      left = 0;
      top = -(bgImage.height * scaleFactor - canvasHeight) / 2;
    } else {
      scaleFactor = canvasHeight / bgImage.height;
      top = 0;
      left = -(bgImage.width * scaleFactor - canvasWidth) / 2;
    }

    canvas.setBackgroundImage(bgImage, canvas.renderAll.bind(canvas), {
      top: top,
      left: left,
      originX: "left",
      originY: "top",
      scaleX: scaleFactor,
      scaleY: scaleFactor
    });
  };

  const setCanvasZoom = () => {
    let canvasWidth = canvasOriginalWidth * 1;
    let canvasHeight = canvasOriginalHeight * 1;

    canvas.setWidth(canvasWidth);
    canvas.setHeight(canvasHeight);
    return { canvasWidth, canvasHeight };
  };

  // . 監聽刪除 */
  const handleUserKeyPress = (e) => {
    if (e.keyCode === 8 || e.keyCode === 46) {
      deleteSelectedObjectsFromCanvas();
    }
  };

  // . 刪除選取物件 */
  const deleteSelectedObjectsFromCanvas = () => {
    function getSelection() {
      return canvas.getActiveObject() === null ? canvas.getActiveGroup() : canvas.getActiveObject();
    }
    canvas.remove(getSelection());
  };

  // . 下載 */
  const download = () => {
    const dataURL = canvas.toDataURL({ format: "png" });
    const pdf = new jsPDF();
    pdf.addImage(dataURL, 'JPEG', 0, 0);

    const { form } = props;
    const fileName = form.getFieldValue('fileName');
    pdf.save(fileName ? `${fileName}.pdf` : 'PackYourName.pdf');
  };

  const handleClickTrans = () => {
    const image = canvas.toDataURL();
    setTestSrc(image);
  };

  return (
    <>
      <Button onClick={handleClickTrans}>test!!</Button>
      <img src={testSrc} alt="" />
      <OutputCanvas>
        <canvas ref={mainRef} style={{ margin: '1rem' }}></canvas>
      </OutputCanvas>
      {/* <Button onClick={download} style={{ display: 'none' }}>下載</Button> */}
    </>
  );
};

export default Output;

// https://stackoverflow.com/questions/35339478/html5-canvas-how-do-i-merge-2-canvas-into-1-of-which-1-is-draggable

// resize https://jsfiddle.net/whippet71/7s5obuk2/

// network error https://stackoverflow.com/questions/37135417/download-canvas-as-png-in-fabric-js-giving-network-error/37151835
