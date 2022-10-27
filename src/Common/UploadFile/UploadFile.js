/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import getScaledDim from "../../utils/getScaledDim";
import { useAtom } from "jotai";
import { bgFileAtom } from "../../data";

import { pdfjs } from "react-pdf";
import { Button } from "antd";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const canvasSize = 500;

const UploadFile = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [src, setSrc] = useState(null);

  const [bgFileData, setBgFileData] = useAtom(bgFileAtom);

  useEffect(() => {
    const c = canvasRef.current;
    setCanvas(c);
    if (c) setCtx(c.getContext("2d"));
  }, [canvasRef]);

  /** image */
  const handleUploadImage = (event) => {
    const f = event.target.files[0];
    const ctx = canvasRef.current.getContext("2d");
    const img = new Image();
    img.onload = function () {
      const scaled = getScaledDim(img, canvasSize, canvasSize);
      // scale canvas to image
      ctx.width = scaled.width;
      ctx.height = scaled.height;
      // draw image
      ctx.drawImage(img, 0, 0, ctx.width, ctx.height);
    };
    img.src = URL.createObjectURL(f);
  };

  /** pdf */
  const handleUploadPdf = (event) => {
    const file = event.target.files[0];
    if (file.type !== "application/pdf") return;
    let fileReader = new FileReader();
    fileReader.onload = function () {
      const pdfData = new Uint8Array(this.result);
      // Using DocumentInitParameters object to load binary data.
      const loadingTask = pdfjs.getDocument({ data: pdfData });
      loadingTask.promise.then(
        function (pdf) {
          console.log("PDF loaded");
          // Fetch the first page
          const pageNumber = 1;
          pdf.getPage(pageNumber).then(function (page) {
            console.log("Page loaded");

            const scale = 1;
            const viewport = page.getViewport({ scale: scale });

            // Prepare canvas using PDF page dimensions
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            // Render PDF page into canvas context
            const renderContext = {
              canvasContext: ctx,
              viewport: viewport
            };
            const renderTask = page.render(renderContext);
            renderTask.promise.then(function () {
              console.log("Page rendered");
            });
          });
        },
        function (reason) {
          // PDF loading error
          console.error(reason);
        }
      );
    };
    fileReader.readAsArrayBuffer(file);
  };

  /** 輸出成圖片 */
  const handleConvertToImage = () => {
    const image = canvas.toDataURL();
    setBgFileData(image);
    setSrc(image);
  };

  return (
    <div style={{ textAlign: "center", background: "#f9e8c9" }}>
      {/* <div style={{ marginBottom: `1rem` }}>
        上傳 Image:
        <input type="file" onChange={handleUploadImage} />
      </div> */}
      <div> 
        上傳 PDF:
        <input accept=".pdf" type="file" onChange={handleUploadPdf} />
      </div>

      <canvas ref={canvasRef} width={canvasSize} height={canvasSize} style={{ boxShadow: "0 0 10px #eeeeff" }}></canvas>
      <div>
        <Button onClick={handleConvertToImage}>輸出</Button>
      </div>
      {/* <img src={src} alt="imagePdf" /> */}
    </div>
  );
};

export default UploadFile;

// https://mozilla.github.io/pdf.js/examples/index.html#interactive-examples
