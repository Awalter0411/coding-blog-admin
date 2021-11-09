import '../static/css/AddArticle.css'
import { useState } from 'react'
import { Row, Col, Input, Select, Button, DatePicker } from 'antd'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import moment from 'moment'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
const { TextArea } = Input
const AddArticle = () => {
  // antd
  const { Option } = Select
  // 文章标题
  const [title, setTitle] = useState('')
  // 文章内容
  const [articleContent, setArticleContent] = useState('')
  // 简介内容
  const [descriptionContent, setDescriptionContent] = useState('') 
  // 时间
  const [date, setDate] = useState('')
  // 分类
  const [categories, setCategories] = useState([])

  // 更新文章内容
  const changeInput = (e, callback) => {
    callback(e.target.value)
  }

  // 设置文章日期
  const handleDateChange = (date, dateString) => {
    console.log(date, dateString)
    setDate(dateString)
  }

  const publish = () => {
    console.log(articleContent, descriptionContent)
  }

  return (
    <div>
      <Row className='content'>
        <Col span={17}>
          <Row>
            <Col span={18} className="title">
              <Input placeholder='博客标题' />
            </Col>
            <Col span={6}>
              <Select
                style={{ width: 120 }}
                className='select'
                placeholder="请选择分类"
              >
                {categories.map(item => {
                  if (item) {
                    return <Option value={item.name}>{item.name}</Option>
                  }
                })}
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <TextArea
                className='markdown-content'
                onChange={e => {
                  changeInput(e, setArticleContent)
                }}
                placeholder='请输入文章内容'
                showCount
                autoSize={{ minRows: 28, maxRows: 28 }}
              ></TextArea>
            </Col>
            <Col span={12}>
              <div className='html-content'>
                <ReactMarkdown
                  children={articleContent}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, '')}
                          style={atomDark}
                          language={match[1]}
                          PreTag='div'
                          {...props}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    },
                  }}
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={7}>
          <Row>
            <Button className='saveArticle'>暂存文章</Button>
            <Button type='primary' onClick={publish}>
              发布文章
            </Button>
          </Row>
          <Row>
            <Col span={24}>
              <TextArea
                cols='30'
                rows='10'
                className='description-content'
                onChange={e => {
                  changeInput(e, setDescriptionContent)
                }}
                autoSize={{ minRows: 5, maxRows: 5 }}
                placeholder='请输入文章简介'
              ></TextArea>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className='description-html'>
                <ReactMarkdown
                  children={descriptionContent}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, '')}
                          style={atomDark}
                          language={match[1]}
                          PreTag='div'
                          {...props}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    },
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row className='datePicker'>
            创建时间：
            <DatePicker
              onChange={handleDateChange}
              format='YYYY-MM-DD'
              locale={locale}
            />
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AddArticle
