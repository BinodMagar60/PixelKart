
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Carousel from '../../components/Carousel'
import Section from '../../components/Section'
import Reason from '../../components/Reason'
import { useProductContext } from '../../context/ProductContext'
import InitialLoading from '../../loading/InitialLoading'
const Home = () => {
  const { productLoading } = useProductContext()
  return (
    <>
      {
        productLoading ? <InitialLoading /> :
          <>
            <Navbar />
            <Carousel />
            <Section sectionName="Featured Products" sectionBackgroundColor='bg-transparent' />
            <Section sectionName="New Arrivals" sectionBackgroundColor='bg-white' />
            <Section sectionName="Best Sellers" sectionBackgroundColor='bg-transparent' />
            <Reason />
            <Footer />
          </>
      }
    </>
  )
}

export default Home