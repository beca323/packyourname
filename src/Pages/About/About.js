import { Button } from "antd";
import React from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import * as animationData from "../../data/sign.json";

export default function Home() {
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <>
      <div>About</div>
      <Button onClick={() => navigate("/quickstart")} >Getting Start</Button>
      <Lottie options={defaultOptions}
        height={400}
        width={400}
      />
    </>
  );
}
