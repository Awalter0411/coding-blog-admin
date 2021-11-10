import { Table, Space, Button } from 'antd'
import { useEffect, useState } from 'react'
import request from '../request/request'
const ArticleList = () => {
  const [dataSource, setDataSource] = useState([])

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
            修改 {record.name}
          </Button>
          <Button size='middle' type='ghost'>
            删除
          </Button>
        </Space>
      ),
      align: 'center',
    },
  ]

  useEffect(() => {
    request.get('/articles/list').then(res => {
      console.log(res.data)
      const data = res.data.map(item => {
        item.key = item.id
        return item
      })
      setDataSource(data)
    })
  }, [])

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  )
}

export default ArticleList
