import { Table, Space, Button, message, Popconfirm, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import PubSub from 'pubsub-js'
import request from '../request/request'
const ArticleList = () => {
  const [dataSource, setDataSource] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // 处理请求的文章数据
  const formatData = res => {
    return res.data.map(item => {
      item.key = item.id
      item.createTime = item.createTime.slice(0, 10)
      item.categoryName = item.category.name
      return item
    })
  }
  // 确认删除的回调
  const confirmDelete = (e, record) => {
    setIsLoading(true)
    request
      .delete('/articles/delete/' + record.id)
      .then(res => {
        setIsLoading(false)
        setDataSource(formatData(res))
        message.success('删除成功')
      })
      .catch(err => {
        message.error('删除失败')
        setIsLoading(false)
      })
  }

  const editArticle = (e, record) => {
    navigate('/index/addArticle/' + record.id)
    PubSub.publish('selectKey', ['2'])
  }

  const columns = [
    {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
    },
    {
      title: '文章分类',
      dataIndex: 'categoryName',
      key: 'category.name',
      align: 'center',
    },
    {
      title: '发布时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center',
    },

    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <Space size='middle'>
          <Button
            size='middle'
            type='primary'
            onClick={e => editArticle(e, record)}
          >
            修改
          </Button>
          <Popconfirm
            title='确定要删除文章么'
            onConfirm={e => confirmDelete(e, record)}
            okText='确定'
            cancelText='取消'
          >
            <Button size='middle' type='ghost'>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
      align: 'center',
    },
  ]

  useEffect(() => {
    setIsLoading(true)
    request.post('/articles/list').then(res => {
      setDataSource(formatData(res))
      setIsLoading(false)
    })
  }, [])

  return (
    <div>
      <Spin tip='loading' spinning={isLoading}>
        <Table dataSource={dataSource} columns={columns} />
      </Spin>
    </div>
  )
}

export default ArticleList
