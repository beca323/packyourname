import React, { useEffect, useState, useRef } from "react";
import { useAtom } from "jotai";
import { bgFileAtom, signAtom } from "../../data";
import { OutputCanvas } from "./Style";
import { fabric } from "fabric";
import useMediaQuery from "../../Hooks/useMediaQuery/useMediaQuery";

const canvasOriginalHeight = 0;
const canvasOriginalWidth = 0;

const Output = (props) => {
  const [signData] = useAtom(signAtom);
  const [bgFileData] = useAtom(bgFileAtom);
  const isSmall = useMediaQuery("(max-width: 800px)");


  const mainRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  // . 建立主要的 canvas */
  useEffect(() => {
    const c = new fabric.Canvas(mainRef.current);
    setCanvas(c);
  }, []);
  // }, [mainRef, props.pageNumber]);

  // . 填上簽名 */
  useEffect(() => {
    if (canvas && signData) {
      fabric.Image.fromURL(signData, (img) => {
        img.scaleToWidth(100);
        img.scaleToHeight(150);
        canvas.add(img).renderAll();
        // canvas.moveTo(img, 1);
      });
    }
  }, [signData]);

  // . 填上背景檔案 */
  useEffect(() => {
    if (props.previewSrcs && props.previewSrcs[props.pageNumber - 1]) {
      fabric.Image.fromURL(props.previewSrcs[props.pageNumber - 1], (img) => {
        canvas.setBackgroundImage(props.previewSrcs[props.pageNumber - 1]).renderAll();
        canvas.setHeight(img.height);
        canvas.setWidth(img.width);
      });
    } else {
      if (canvas && bgFileData) {
        fabric.Image.fromURL(bgFileData, (img) => {
          canvas.setBackgroundImage(bgFileData).renderAll();
          canvas.setHeight(img.height);
          canvas.setWidth(img.width);
        });
      }
    }
  }, [bgFileData, props.pageNumber]);

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
      // return canvas.getActiveObject() === null ? canvas.getActiveGroup() : canvas.getActiveObject();
      if (canvas.getActiveObject() === null) return;
      return canvas.getActiveObject();
    }
    canvas.remove(getSelection());
  };

  const handleClickTrans = (page) => {
    const image = canvas.toDataURL();
    let tempSrcs = props.previewSrcs;
    tempSrcs[page - 1] = image;
    props.setPreviewSrcs(tempSrcs);
  };

  useEffect(() => {
    if (!canvas || !canvas._objects) return;
    handleClickTrans(props.prevPage);
    canvas.clear();
  }, [props.pageNumber]);

  useEffect(() => {
    if (props.toPreview) {
      handleClickTrans(props.pageNumber);
    }
  }, [props.toPreview]);

  return (
    <>
      <OutputCanvas scaledown={!!isSmall}>
        <canvas ref={mainRef} style={{ margin: '1rem' }}></canvas>
      </OutputCanvas>
    </>
  );
};

export default Output;

// https://stackoverflow.com/questions/35339478/html5-canvas-how-do-i-merge-2-canvas-into-1-of-which-1-is-draggable

// resize https://jsfiddle.net/whippet71/7s5obuk2/

// network error https://stackoverflow.com/questions/37135417/download-canvas-as-png-in-fabric-js-giving-network-error/37151835
