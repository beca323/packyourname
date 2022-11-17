import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import Icon from "@ant-design/icons";
import React from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../Atoms/Icons/Logo.svg";
import styled from "styled-components";
import * as animationData from "../../data/sign.json";

const About = styled.div`
height: 100%;
background: linear-gradient(-90deg, #006CAC 0%, #19A8B8 100%);
padding: 4rem;
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
      <div style={{ display: 'flex', gap: '1.2rem', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Icon component={Logo} style={{ fontSize: '6rem' }} />
        <h2 style={{ color: '#fff', transform: 'translateY(10px)' }}>Pack Your Name</h2>
      </div>
      <Row typeof="flex" gutter={32} justify="center">
        <Col span={8} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', padding: '4rem 0' }}>
          <h1 style={{ textAlign: 'start', color: '#fff' }}>關於我們</h1>
          <p style={{ textAlign: 'start', color: '#fff' }}>Pack your name是一個新興線上簽名平台，讓您可以不限時間、不限地點，隨心所欲辦公與洽談。
            平台兼顧「簡約、環保、時尚」的設計理念，讓用戶在使用過程中能獲得「便利、省時、護眼」的使用者體驗。所節省下的金錢與時間，更可以讓您舒心體驗生活。
            現在就讓Pack your name ，Open your life吧！</p>
          <StartButton onClick={() => navigate("/quickstart")} style={{ width: 'fit-content', padding: '0.5rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>立即體驗</span>
            <span style={{ opacity: '0.6' }}>Free!!</span>
            <ArrowRightOutlined />
          </StartButton>
        </Col>
        <Col span={8}>
          <Lottie options={defaultOptions}
            height={400}
            width={400}
          />
        </Col>
      </Row>
    </About>
  );
}
