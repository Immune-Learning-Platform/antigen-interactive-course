import { Link } from 'react-router-dom'
import { PageHeader } from '../components/learn'

export default function NotFound() {
  return (
    <>
      <PageHeader
        eyebrow="404"
        title="没有找到这个页面"
        lead="链接可能已经变更。请从下面的入口继续学习。"
      />
      <section className="section section--tight">
        <div className="container">
          <div className="row">
            <Link className="btn" to="/">
              回到首页
            </Link>
            <Link className="btn btn--ghost" to="/modules">
              模块学习
            </Link>
            <Link className="btn btn--ghost" to="/classroom">
              课堂互动
            </Link>
            <Link className="btn btn--ghost" to="/qr">
              扫码学习
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
