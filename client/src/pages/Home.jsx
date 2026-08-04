import Hero from '../components/sections/Hero'
import AboutPreview from '../components/sections/AboutPreview'
import PremiumRooms from '../components/sections/PremiumRooms'
import RestaurantPreview from '../components/sections/RestaurantPreview'
import GalleryPreview from '../components/sections/GalleryPreview'
import Testimonials from '../components/sections/Testimonials'
import Amenities from '../components/sections/Amenities'
import Statistics from '../components/sections/Statistics'
import CTA from '../components/sections/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <PremiumRooms />
      <RestaurantPreview />
      <GalleryPreview />
      <Amenities />
      <Statistics />
      <Testimonials />
      <CTA />
    </>
  )
}
