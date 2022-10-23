import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import MyMenu from '../../Common/MyMenu/MyMenu'
import MyDocuments from '../MyDocuments/MyDocuments'
import MySigns from '../MySigns/MySigns'
import styled from 'styled-components'
import ComingSoon from '../ComingSoon/ComingSoon'
import TopBar from '../../Common/TopBar/TopBar'

const Page = styled.div`
display: flex;
height: 100vh;
overflow: hidden;
`

const ContentContainer = styled.div`
padding: 2rem;
`

export default class MainApp extends Component {
  render() {
    return (
      <Page>
        <MyMenu />
        <div style={{ width: '100%' }}>
          <TopBar />
          <ContentContainer>
            <Routes>
              <Route path="mydoc" element={<MyDocuments />} />
              <Route path="mysign" element={<MySigns />} />
              <Route path='*' element={<ComingSoon />} />
            </Routes>
          </ContentContainer>
        </div>
      </Page>
    )
  }
}
