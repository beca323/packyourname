import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import Icon from "@ant-design/icons";
import React from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../Atoms/Icons/Logo.svg";
import logo from "../../Atoms/Icons/logo.png";
import styled from "styled-components";
import * as animationData from "../../data/sign.json";
import useMediaQuery from "../../Hooks/useMediaQuery/useMediaQuery";

const About = styled.div`
min-height: 100%;
height: fit-content;
overflow: auto;
background: linear-gradient(-90deg, #006CAC 0%, #19A8B8 100%);
padding: 3rem 0;
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
  const isSmall = useMediaQuery("(max-width: 680px)");
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const renderIntro = () => {
    return (
      <>
        <h1 style={{ textAlign: 'start', color: '#fff' }}>
          不限時間、不限地點，<br />
          隨心所欲辦公與洽談。
        </h1>
        <p style={{ textAlign: 'start', color: '#fff' }}>Pack your name是一個新興線上簽名平台，讓您可以不限時間、不限地點，隨心所欲辦公與洽談。
          平台兼顧「簡約、環保、時尚」的設計理念，讓用戶在使用過程中能獲得「便利、省時、護眼」的使用者體驗。所節省下的金錢與時間，更可以讓您舒心體驗生活。
          現在就讓Pack your name ，Open your life吧！</p>
        <StartButton onClick={() => navigate("/quickstart")} style={{ width: 'fit-content', padding: '0.5rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>立即體驗</span>
          <span style={{ opacity: '0.6' }}>Free!!</span>
          <ArrowRightOutlined />
        </StartButton>
      </>
    );
  };

  return (
    <About>
      <div style={{ display: 'flex', gap: '1.2rem', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <img src={logo} alt="logo" />
        <h2 style={{ color: '#fff', transform: 'translateY(10px)' }}>Pack Your Name</h2>
        <div style={{ width: '1rem', opacity: '0' }}></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isSmall ? '1fr' : '1fr 1fr', width: '95%', maxWidth: '900px', margin: 'auto' }}>
        <div style={{ display: isSmall ? 'none' : 'flex', flexDirection: 'column', justifyContent: 'space-around', padding: '4rem 0' }}>
          {renderIntro()}
        </div>
        <div>
          <Lottie options={defaultOptions} height={isSmall ? 300 : 400} width={isSmall ? 300 : 400} />
        </div>
        {isSmall && (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', padding: '4rem 0', width: '90%', margin: 'auto' }}>
            {renderIntro()}
          </div>
        )}
      </div>
    </About>
  );
}
