import { Layout, Menu, Breadcrumb } from 'antd'
import {
  UserOutlined,
  FileTextOutlined,
  FileAddOutlined,
  CoffeeOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { Route, Link } from 'react-router-dom'
import AddArticle from './AddArticle'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

function Home() {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className='logo' />
        <Menu theme='dark' defaultSelectedKeys={['1']} >
          <Menu.Item key='1' icon={<CoffeeOutlined />}>
            工作台
          </Menu.Item>
          <Menu.Item key='2' icon={<FileAddOutlined />}>
            添加文章
          </Menu.Item>
          <SubMenu key='sub1' icon={<FileTextOutlined />} title='文章管理'>
            <Menu.Item key='3'>文章列表</Menu.Item>
            <Menu.Item key='4'>文章分类</Menu.Item>
          </SubMenu>
          <Menu.Item key='5' icon={<UserOutlined />}>
            个人设置
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className='site-layout-background'
          >
            <Route path='/index' exact component={AddArticle}></Route>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Home
