import { Tabs } from 'antd'
import React, { Component } from 'react'
import styled from 'styled-components'
import AllDocs from './AllDocs/AllDocs'

export default class MyDocuments extends Component {
  render() {
    return (
      <>
        <Overview />
      </>
    )
  }
}

const MyTabs = styled(Tabs)`
.ant-tabs-nav-wrap{
  padding: 0 2rem;
  height: 70px;
  .ant-tabs-tab{
    color: #7B7B7B;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
    color: #026CAD;
  }
}
`

const TabContent = [
  {
    key: "1",
    count: 10,
    name: "All Document",
    render: () => <AllDocs />
  },
  {
    key: "2",
    count: 1,
    name: "Important",
    render: () => { <div>Important!!! </div> }
  },
  {
    key: "3",
    count: 2,
    name: "To Do",
    render: () => { <div>to do </div> }
  },
  {
    key: "4",
    count: 2,
    name: "Finished",
    render: () => { <div>to do </div> }
  },
  {
    key: "5",
    count: 12,
    name: "Others",
    render: () => { <div>to do </div> }
  },
]

export function Overview() {
  const renderTab = (count, name) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ opacity: 0 }}>.</div>
        <div style={{ fontSize: '1.6rem', lineHeight: '1.5rem', fontWeight: 'bold' }}>{count}</div>
        <div>{name}</div>
      </div>
    )

  }
  return (
    <>
      <MyTabs defaultActiveKey="1">
        {TabContent.map((tab) => {
          return (
            <Tabs.TabPane tab={renderTab(tab.count, tab.name)} key={tab.key}>
              {tab.render()}
            </Tabs.TabPane>
          )
        })}
      </MyTabs>
    </>
  )
}