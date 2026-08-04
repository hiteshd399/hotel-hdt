import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import useFetch from '../../hooks/useFetch'
import RoomCard from '../ui/RoomCard'
import SectionHeader from '../ui/SectionHeader'
import Skeleton from '../ui/Skeleton'

export default function PremiumRooms() {
  const { data, loading } = useFetch('/rooms', { limit: 6, sort: 'newest' }, [])

  const rooms = data?.data || []

  return (
    <section className="py-28 md:py-32 bg-ink-light/40 relative overflow-hidden">
      <div className="container-lux">
        <SectionHeader
          eyebrow="Premium Accommodations"
          title="Rooms & Suites Crafted for You"
          description="From intimate deluxe rooms to the iconic Presidential Suite, every space at Hotel HDT is a private sanctuary of comfort and refined design."
        />

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] !rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, i) => (
              <RoomCard key={room.id} room={room} index={i} />
            ))}
          </div>
        )}

        <div className="text-center mt-14">
          <Link to="/rooms" className="btn-primary group">
            View All Rooms
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
