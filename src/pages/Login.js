import { useState } from 'react'
import { Card, Input, Button, Spin, message } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import '../static/css/Login.css'
import request from '../request/request'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const checkLogin = () => {
    setIsLoading(true)
    request
      .post('/users/login', {
        username: userName,
        password: password,
      })
      .then(res => {
        message.success('登录成功')
        localStorage.setItem('token', res.data.token)
        navigate('/index', { replace: true })
        setIsLoading(false)
      })
      .catch(err => {
        setIsLoading(false)
        message.error('用户名或密码错误')
      })
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
            type='password'
            placeholder='输入你的密码'
            prefix={<KeyOutlined />}
            onChange={e => {
              setPassword(e.target.value)
            }}
          />
          <Button
            style={{ marginTop: '20px' }}
            type='primary'
            size='large'
            block
            onClick={checkLogin}
            loading={isLoading}
          >
            登录
          </Button>
        </Card>
      </Spin>
    </div>
  )
}

export default Login
