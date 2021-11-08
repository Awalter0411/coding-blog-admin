import { useState } from 'react'
import { Card, Input, Button, Spin } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import '../static/css/Login.css'
const Login = () => {
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const checkLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }
  return (
    <div className='login-container'>
      <Spin tip='loading' spinning={isLoading}>
        <Card title='博客后台管理系统' bordered={true} style={{ width: 400 }}>
          <Input
            id='username'
            size='large'
            placeholder='输入你的用户名'
            prefix={<UserOutlined />}
            onChange={e => {
              setUsername(e.target.value)
            }}
          />
          <br />
          <br />
          <Input
            id='password'
            size='large'
            placeholder='输入你的密码'
            prefix={<KeyOutlined />}
            onChange={e => {
              setPassword(e.target.value)
            }}
          />
          <Button style={{marginTop:'20px'}} type='primary' size='large' block onClick={checkLogin}>
            登录
          </Button>
        </Card>
      </Spin>
    </div>
  )
}

export default Login
