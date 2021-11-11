import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import AddArticle from './pages/AddArticle'
import WorkSpace from './pages/WorkSpace'
import ArticleList from './pages/ArticleList'
import ArticleCate from './pages/ArticleCate'
import Profile from './pages/Profile'
import Error from './pages/Error'

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='login' element={<Login />} />
          <Route path='index' element={<Home />}>
            <Route path='workspace' element={<WorkSpace />} />
            <Route path='addArticle' element={<AddArticle />} />
            <Route path='addArticle/:id' element={<AddArticle />} />
            <Route path='articleList' element={<ArticleList />} />
            <Route path='articleCate' element={<ArticleCate />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  </ConfigProvider>,
  document.getElementById('root')
)
