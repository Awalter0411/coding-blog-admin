import { Card } from 'antd'
import '../static/css/Error.css'
const Error = () => {
  return (
    <div className='error-card'>
      <Card bordered={true} style={{ width: 600 }}>
        <div className="statusCode">
          <div className="red">4</div>
          <div className="green">0</div>
          <div className="red">4</div>
        </div>
        <div className="desc">
          你要找的页面飞走了
        </div>
      </Card>
    </div>
  )
}
export default Error
