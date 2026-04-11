import OriginHeader from './components/OriginHeader'
import OriginPage from './pages/OriginPage'
import Footer from './components/Footer'

export default function OriginApp() {
  return (
    <div id="page-wrap">
      <OriginHeader />
      <main>
        <OriginPage />
      </main>
      <Footer />
    </div>
  )
}
