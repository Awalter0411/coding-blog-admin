import '../static/css/AddArticle.css'
import { useState } from 'react'
import { Row, Col, Input, Select, Button, DatePicker } from 'antd'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
const { Option } = Select
const { TextArea } = Input
const AddArticle = () => {
  const [articleContent, setArticleContent] = useState('') //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容

  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    },
    gfm: true, // 允许 Git Hub标准的markdown.
    pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
    sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
    tables: true, // 允许支持表格语法（该选项要求 gfm 为true）
    breaks: false, // 允许回车换行（该选项要求 gfm 为true）
    smartLists: true, // 使用比原生markdown更时髦的列表
    smartypants: false, // 使用更为时髦的标点
  })

  const changeContent = e => {
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }
  return (
    <div>
      <Row className='content'>
        <Col span={17}>
          <Row>
            <Col span={18}>
              <Input placeholder='博客标题' />
            </Col>
            <Col span={6}>
              <Select
                defaultValue='JavaScript'
                style={{ width: 120 }}
                className='select'
              >
                <Option value='JavaScript'>JavaScript</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <TextArea
                className='markdown-content'
                autoSize={{ minRows: 20, maxRows: 20 }}
                onChange={changeContent}
                onPressEnter={changeContent}
              ></TextArea>
            </Col>
            <Col span={12}>
              <div className='html-content'></div>
            </Col>
          </Row>
        </Col>
        <Col span={7}>
          <Row>
            <Button className='saveArticle'>暂存文章</Button>
            <Button type='primary'>发布文章</Button>
          </Row>
          <Row>
            <Col span={24}>
              <TextArea
                className='description-markdown'
                autoSize={{ minRows: 4, maxRows: 4 }}
              ></TextArea>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className='description-html'></div>
            </Col>
          </Row>
          <Row className='datePicker'>
            <DatePicker showTime format='YYYY-MM-DD' />
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AddArticle
