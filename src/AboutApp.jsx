import AboutHeader from './components/AboutHeader'
import AboutPage from './pages/AboutPage'
import Footer from './components/Footer'

export default function AboutApp() {
  return (
    <div id="page-wrap">
      <AboutHeader />
      <main>
        <AboutPage />
      </main>
      <Footer />
    </div>
  )
}
