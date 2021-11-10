import { Table, Space, Button, message, Popconfirm } from 'antd'
import { useEffect, useState } from 'react'
import request from '../request/request'
const ArticleList = () => {
  const [dataSource, setDataSource] = useState([])

  const confirmDelete = (e, record) => {
    request.delete('/articles/delete/' + record.id).then(res => {
      message.success('删除成功')
    })
  }
  const columns = [
    {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
    },
    {
      title: '文章简介',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
    },

    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <Space size='middle'>
          <Button size='middle' type='primary'>
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
          ,
        </Space>
      ),
      align: 'center',
    },
  ]

  useEffect(() => {
    request.post('/articles/list').then(res => {
      console.log(res.data)
      const data = res.data.map(item => {
        item.key = item.id
        return item
      })
      setDataSource(data)
    })
  }, [])

  useEffect(() => {
    console.log(1);
  }, [dataSource])

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  )
}

export default ArticleList
