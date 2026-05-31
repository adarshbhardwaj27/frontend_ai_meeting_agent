import { motion } from 'framer-motion'
import Navbar       from '../components/landing/Navbar'
import Hero         from '../components/landing/Hero'
import Stats        from '../components/landing/Stats'
import HowItWorks   from '../components/landing/HowItWorks'
import Features     from '../components/landing/Features'
import Platforms    from '../components/landing/Platforms'
import CTASection   from '../components/landing/CTASection'
import Footer       from '../components/landing/Footer'

const PAGE = {
  initial:  { opacity: 0 },
  animate:  { opacity: 1 },
  exit:     { opacity: 0 },
  transition: { duration: 0.3 },
}

export default function Landing() {
  return (
    <motion.div {...PAGE}>
      <Navbar />
      <Hero />
      <Stats />
      <HowItWorks />
      <Features />
      <Platforms />
      <CTASection />
      <Footer />
    </motion.div>
  )
}
