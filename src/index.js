import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {ConfigProvider} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import zhCN from 'antd/lib/locale/zh_CN';

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App/>
  </ConfigProvider>
  , document.getElementById('root'))
