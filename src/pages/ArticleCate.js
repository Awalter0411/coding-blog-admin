import {
  Button,
  Modal,
  Table,
  Form,
  Input,
  message,
  Space,
  Popconfirm,
  Spin,
} from 'antd'
import { useEffect, useState, useRef } from 'react'
import '../static/css/ArticleCate.css'
import request from '../request/request'

const ArticleCate = () => {
  // 模态框显示
  const [visible, setVisible] = useState(false)
  // 加载中
  const [confirmLoading, setConfirmLoading] = useState(false)
  // 分类名称
  const [cateName, setCateName] = useState('')
  // 分类
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const input = useRef(null)

  // 显示模态框
  const showModal = () => {
    setVisible(true)
  }

  // 确认添加分类
  const handleOk = () => {
    setConfirmLoading(true)
    setIsLoading(true)
    request
      .post('/categories/create', {
        name: cateName,
      })
      .then(res => {
        message.success('添加成功')
        setVisible(false)
        setConfirmLoading(false)
        setIsLoading(false)
        setCategories(
          res.data.map(item => {
            item.key = item.id
            return item
          })
        )
        setCateName('')
      })
      .catch(err => {
        message.error('分类已经存在')
        setConfirmLoading(false)
        setIsLoading(false)
      })
  }

  // 取消添加
  const handleCancel = () => {
    setVisible(false)
  }

  useEffect(() => {
    setIsLoading(true)
    request.get('/categories/list').then(res => {
      const categories = res.data.map(item => {
        item.key = item.id
        return item
      })
      setCategories(categories)
      setIsLoading(false)
    })
  }, [])

  // 删除分类的回调
  const confirmDelete = (e, record) => {
    setIsLoading(true)
    request.delete('/categories/delete/' + record.id).then(res => {
      setCategories(
        res.data.map(item => {
          item.key = item.id
          return item
        })
      )
      message.success('删除成功')
      setIsLoading(false)
    })
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
      <Spin tip='loading' spinning={isLoading}>
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
                ref={input}
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
      </Spin>
    </div>
  )
}

export default ArticleCate
