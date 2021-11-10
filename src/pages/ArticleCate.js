import {
  Button,
  Modal,
  Table,
  Form,
  Input,
  message,
  Space,
  Popconfirm,
} from 'antd'
import { useEffect, useState } from 'react'
import '../static/css/ArticleCate.css'
import request from '../request/request'

const ArticleCate = () => {
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [cateName, setCateName] = useState('')

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    setConfirmLoading(true)
    request
      .post('/categories/create', {
        name: cateName,
      })
      .then(res => {
        console.log(res)
        message.success('添加成功')
        setVisible(false)
        setConfirmLoading(false)
      })
      .catch(err => {
        console.log(err)
        message.error('分类已经存在')
        setConfirmLoading(false)
      })
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const [categories, setCategories] = useState([])

  useEffect(() => {
    request.get('/categories/list').then(res => {
      console.log(res)
      const categories = res.data.map(item => {
        item.key = item.id
        return item
      })
      setCategories(categories)
    })
  }, [])

  const confirmDelete = (e,record) =>{
    console.log(record);
    message.success('删除成功')
  }

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <Space>
          <Popconfirm
            title='删除该分类会删除其所有文章,确定要删除吗'
            onConfirm={e => confirmDelete(e, record)}
            okText='确定'
            cancelText='取消'
          >
            <Button
              type='primary'
              size='middle'
              style={{ fontSize: 14 + 'px' }}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
      align: 'center',
    },
  ]

  return (
    <div>
      <Button type='primary' onClick={showModal}>
        添加分类
      </Button>
      <Modal
        title='添加分类'
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          name='basic'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete='off'
          className='addCateForm'
        >
          <Form.Item
            label='分类名称'
            name='cateName'
            rules={[{ required: true, message: '分类名称不能为空' }]}
          >
            <Input
              value={cateName}
              onChange={e => setCateName(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={categories}
        style={{ marginTop: 20 + 'px' }}
      />
    </div>
  )
}

export default ArticleCate
