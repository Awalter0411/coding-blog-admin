import '../static/css/Profile.css'
import { Card, Button, message, Spin } from 'antd'
import MarkdownEditor from '@uiw/react-markdown-editor'
import { useState, useEffect } from 'react'
import request from '../request/request'
const Profile = () => {
  const [desc, setDesc] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    request
      .get(
        '/users/userInfo/' +
          JSON.parse(localStorage.getItem('coding-blog')).username
      )
      .then(res => {
        setDesc(res.data.desc)
        setIsLoading(false)
      })
      .catch(err => {
        message.error('获取个人信息失败')
        setIsLoading(false)
      })
  }, [])

  const handleEdit = () => {
    if (!desc) {
      message.error('个人介绍不能为空')
      return
    }
    setIsLoading(true)
    request
      .post('/users/update', {
        desc,
      })
      .then(res => {
        console.log(res)
        setIsLoading(false)
        message.success('更新个人介绍成功')
      })
      .catch(err => {
        // message.error('原密码错误,请重新输入')
        setIsLoading(false)
      })
  }

  return (
    <div className='site-card-border-less-wrapper'>
      <Spin tip='loading' spinning={isLoading}>
        <Card title={'个人介绍'} bordered={true} style={{ width: 800 }}>
          <MarkdownEditor
            value={desc}
            onChange={(editor, data, value) => {
              setDesc(value)
            }}
            height={150}
          />
          <div className='button-container'>
            <Button type='primary' onClick={handleEdit}>
              确认修改
            </Button>
          </div>
        </Card>
      </Spin>
    </div>
  )
}

export default Profile
