/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import getScaledDim from "../../utils/getScaledDim";
import { useAtom } from "jotai";
import { bgFileAtom } from "../../data";

import { Document, Page, pdfjs } from "react-pdf";
import { Button, Input, message, Modal } from "antd";
import { UPLOAD_FILE } from "../../Constants/Constants";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const canvasSize = 0;

const UploadFile = (props) => {
  const { form } = props;
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [src, setSrc] = useState(null);
  const [fileName, setFileName] = useState('');

  const [bgFileData, setBgFileData] = useAtom(bgFileAtom);

  useEffect(() => {
    const c = canvasRef.current;
    setCanvas(c);
    if (c) setCtx(c.getContext("2d"));
  }, []);

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

  const handleSetFileName = (name) => {
    setFileName(name);
    form.setFieldsValue({ fileName: name });
    if (form.getFieldValue('newFileName')) return;
    form.setFieldsValue({ newFileName: name });
  };
  /** pdf */
  const handleUploadPdf = (file) => {
    props.setPdfFile(file);
    if (file.type !== "application/pdf") {
      alert('請上傳 pdf');
      return;
    }
    if (file.size > UPLOAD_FILE.LIMIT_SIZE) {
      alert('檔案大小限制 20MB');
      return;
    }
    handleSetFileName(file.name.replace('.pdf', ''));
    props.setFileUploaded(true);

    renderFile(file);
  };

  const renderFile = (file, pageNumber = 1) => {
    let fileReader = new FileReader();
    fileReader.onload = function () {
      const pdfData = new Uint8Array(this.result);
      // . Using DocumentInitParameters object to load binary data.
      const loadingTask = pdfjs.getDocument({ data: pdfData });
      loadingTask.promise.then(
        function (pdf) {
          // . Fetch the first page
          pdf.getPage(pageNumber).then(function (page) {
            const scale = 1.3;
            const viewport = page.getViewport({ scale });

            // . Prepare canvas using PDF page dimensions
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // . Render PDF page into canvas context
            const renderContext = {
              canvasContext: ctx,
              viewport: viewport
            };
            const renderTask = page.render(renderContext);
            renderTask.promise.then(function () {
              console.log("Page rendered");
            }).then(() => {
              handleConvertToImage();
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

  useEffect(() => {
    if (!props.pdfFile) return;
    // TODO
    // handleConvertToImage();
    renderFile(props.pdfFile, props.pageNumber);
  }, [props.pageNumber]);

  /** 輸出成圖片 */
  const handleConvertToImage = () => {
    const image = canvas.toDataURL();
    setBgFileData(image);
    setSrc(image);
  };

  useEffect(() => {
    if (props.pageCount === 1) {
      handleConvertToImage();
    }
  }, [props.pageCount]);

  return (
    <>
      <div style={{ textAlign: "center", position: 'relative', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* <div style={{ marginBottom: `1rem` }}>
        上傳 Image:
        <input type="file" onChange={handleUploadImage} />
        </div> */}
        <div>
          <div
            className="c-primary"
            style={{
              border: '2px dashed currentColor', position: 'absolute',
              width: '100%', height: '200px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}>
            <Button className="bg-primary" style={{ fontSize: '1.3rem', height: 'fit-content' }}>
              <span>Choose Files</span> &emsp;
              <span style={{ opacity: '0.6' }}>pdf only</span>
            </Button>
            <div>
              {fileName ? fileName : 'or drag to here'}
            </div>
          </div>
          <div style={{ width: '100%' }}>
            <Input
              style={{ height: '200px', opacity: '0', cursor: 'pointer', }}
              accept=".pdf" type="file" onChange={(event) => handleUploadPdf(event.target.files[0])} />
          </div>
        </div>
        {/* <img src={src} alt="imagePdf" /> */}
      </div>
      {/* 預覽 */}
      <canvas ref={canvasRef} width={canvasSize} height={canvasSize} style={{ boxShadow: "0 0 10px #eeeeff", display: 'none' }}></canvas>
    </>
  );
};

export default UploadFile;

// https://mozilla.github.io/pdf.js/examples/index.html#interactive-examples