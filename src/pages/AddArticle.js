import '../static/css/AddArticle.css'
import { useState, useEffect } from 'react'
import { Row, Col, Input, Select, Button, message } from 'antd'
import 'moment/locale/zh-cn'
import MarkdownEditor from '@uiw/react-markdown-editor'
import request from '../request/request'
import { useNavigate, useParams } from 'react-router'
import PubSub from 'pubsub-js'
const AddArticle = () => {
  // 文章id
  const params = useParams()
  const [isEdit, setIsEdit] = useState(
    Boolean(Object.getOwnPropertyNames(params).length)
  )
  const navigate = useNavigate()
  // antd
  const { Option } = Select
  // 文章标题
  const [title, setTitle] = useState('')
  // 文章内容
  const [content, setContent] = useState('')
  // 分类
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState('请选择分类')
  // 简介
  const [description, setDescription] = useState('')

  // 发布文章的回调
  const publish = () => {
    // 如果是添加文章
    if (!isEdit) {
      setDescription()
      request
        .post('/articles/create', {
          title,
          description,
          content,
          category: categoryId,
        })
        .then(res => {
          message.success('发布文章成功')
          navigate('/index/articleList')
          PubSub.publish('selectKey', ['3'])
        })
        .catch(err => {
          message.error('发布文章失败')
        })
    } else {
      // 编辑文章
      request
        .post('/articles/update', {
          id: parseInt(params.id),
          title,
          description,
          content,
          category: categoryId,
        })
        .then(res => {
          message.success('修改文章成功')
          navigate('/index/articleList')
          PubSub.publish('selectKey', ['3'])
        })
    }
  }

  useEffect(() => {
    request.get('categories/list').then(res => {
      setCategories(res.data)
    })
    if (isEdit) {
      // 编辑文章
      request
        .get('/articles/' + params.id, {
          title,
          description,
          content,
          category: categoryId,
        })
        .then(res => {
          setCategoryId(res.data.category.id)
          setContent(res.data.content)
          setTitle(res.data.title)
        })
    }
  }, [])

  useEffect(() => {
    setDescription(content.slice(0, 30))
    return () => {}
  }, [content])

  const handleCateChange = val => {
    setCategoryId(val)
  }
  return (
    <div>
      <Row className='content'>
        <Col span={24} className='left'>
          <Row>
            <Col span={15} className='title'>
              <Input
                value={title}
                placeholder='博客标题'
                onChange={e => setTitle(e.target.value)}
              />
            </Col>
            <Col span={9}>
              <Select
                style={{ width: 150 }}
                className='select'
                placeholder='请选择分类'
                onChange={handleCateChange}
                value={categoryId}
              >
                {categories.map(item => {
                  if (item) {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    )
                  }
                })}
              </Select>
              <Button
                type='primary'
                onClick={publish}
                style={{ marginLeft: 10 + 'px' }}
                onClick={publish}
              >
                {isEdit ? '编辑文章' : '发布文章'}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={23}>
              <div className='editor-container'>
                <MarkdownEditor
                  value={content}
                  className='editor'
                  onChange={(editor, data, value) => setContent(value)}
                  height={500}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AddArticle
