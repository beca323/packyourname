import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as animationData from "../../data/sign.json";

const About = styled.div`
height: 100%;
background: linear-gradient(90deg, #006CAC 0%, #19A8B8 100%);
padding: 0;
`;

const StartButton = styled(Button)`
background: linear-gradient(92.49deg, #026BAC 0%, #0093BF 100%);
border: none;
color: #fff;
box-shadow: 0 0 4px #ffffff33;
font-size: 1.2rem;
height: fit-content;
`;

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
    <About>
      <h2 style={{ color: '#fff' }}>Pack Your Name</h2>
      <StartButton onClick={() => navigate("/quickstart")}>Getting Start <ArrowRightOutlined /></StartButton>
      <Lottie options={defaultOptions}
        height={400}
        width={400}
      />
    </About>
  );
}
