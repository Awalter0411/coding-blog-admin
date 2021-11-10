import { Layout, Menu, Breadcrumb } from 'antd'
import {
  UserOutlined,
  FileTextOutlined,
  FileAddOutlined,
  CoffeeOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../static/css/Home.css'

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
        <div className='logo'></div>
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
          <Menu.Item key='1' icon={<CoffeeOutlined />}>
            <Link to='workspace'>工作台</Link>
          </Menu.Item>
          <Menu.Item key='2' icon={<FileAddOutlined />}>
            <Link to='addArticle'>添加文章</Link>
          </Menu.Item>
          <SubMenu key='sub1' icon={<FileTextOutlined />} title='文章管理'>
            <Menu.Item key='3'>
              <Link to='articleList'>文章列表</Link>
            </Menu.Item>
            <Menu.Item key='4'>
              <Link to='articleCate'>文章分类</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key='5' icon={<UserOutlined />}>
            <Link to="profile">
              个人设置
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div className='site-layout-background'>
            {/* <Route path='/index' exact component={AddArticle}></Route> */}
            <Outlet />
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
