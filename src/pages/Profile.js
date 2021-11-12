import '../static/css/Profile.css'
import { Card, Form, Input, Button, message, Spin } from 'antd'
import MarkdownEditor from '@uiw/react-markdown-editor'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import request from '../request/request'
const Profile = () => {
  const [username, setUsername] = useState('')
  const [desc, setDesc] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setnewPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    setIsLoading(true)
    request.get('/users/userInfo').then(res => {
      setUsername(res.data.username)
      setDesc(res.data.desc)
      setIsLoading(false)
    })
  }, [])

  const handleEdit = () => {
    if (!username || !desc) {
      message.error('请确认表单填写完整')
      return
    }
    if (oldPassword === newPassword) {
      message.error('修改前后的密码不能一致')
      return
    }
    setIsLoading(true)
    request
      .post('/users/update', {
        username,
        desc,
        oldPassword,
        newPassword,
      })
      .then(res => {
        console.log(res)
        setIsLoading(false)
        message.success('修改成功,请重新登录')
        navigate('/login')
      })
      .catch(err => {
        message.error('原密码错误,请重新输入')
        setIsLoading(false)
      })
  }

  return (
    <div className='site-card-border-less-wrapper'>
      <Spin tip='loading' spinning={isLoading}>
        <Card
          title={'个人设置'}
          bordered={true}
          style={{ width: 800 }}
        >
          <Form
            layout='horizontal'
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
          >
            <Form.Item label='个人名称'>
              <Input
                value={username}
                onChange={e => {
                  setUsername(e.target.value)
                }}
              />
            </Form.Item>
            {/* <Form.Item label='原密码'>
              <Input
                type='password'
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item label='新密码'>
              <Input
                type='password'
                value={newPassword}
                onChange={e => setnewPassword(e.target.value)}
              />
            </Form.Item> */}
            <Form.Item label='个人介绍'>
              <MarkdownEditor
                value={desc}
                onChange={(editor, data, value) => {
                  setDesc(value)
                }}
                height={150}
              />
            </Form.Item>
            <div className='button-container'>
              <Button type='primary' onClick={handleEdit}>
                确认修改
              </Button>
            </div>
          </Form>
        </Card>
      </Spin>
    </div>
  )
}

export default Profile
