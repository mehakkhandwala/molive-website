import Header from './components/Header'
import Hero from './components/Hero'
import ProcessBanner from './components/ProcessBanner'
import ProductSection from './components/ProductSection'
import PickupSection from './components/PickupSection'
import AboutSection from './components/AboutSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div id="page-wrap">
      <Header />
      <main>
        <Hero />
        <ProcessBanner />
        <ProductSection />
        <PickupSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
