
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Carousel from '../../components/Carousel'
import Section from '../../components/Section'
import Reason from '../../components/Reason'
import { useUserContext } from '../../context/UserContext'
const Home = () => {
  return (
    <>
    <Navbar/>
    <Carousel/>
    <Section sectionName="featured Products" sectionBackgroundColor='bg-transparent'/>
    <Section sectionName="New Arrivals" sectionBackgroundColor='bg-white'/>
    <Section sectionName="Best Sellers" sectionBackgroundColor='bg-transparent'/>
    <Reason/>
    <Footer/>
    </>
  )
}

export default Home