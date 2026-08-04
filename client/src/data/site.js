// Static hotel information shared across the site.
export const HOTEL = {
  name: 'Hotel HDT',
  tagline: 'A Sanctuary in the Heart of the Himalayas',
  location: 'Kathmandu, Nepal',
  address: 'Durbar Marg, Kathmandu 44600, Nepal',
  phone: '+977-98XXXXXXXX',
  email: 'info@hotelhdt.com',
  description:
    'Hotel HDT is a premium luxury hotel in Kathmandu offering elegant rooms, rooftop dining, conference halls, airport pickup, and unforgettable hospitality.',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0740899894794!2d85.31763587537844!3d27.71298112567069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a8b5b89e6f%3A0x9c5d2c0b9c5d2c0b!2sDurbar%20Marg%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1700000000000',
  socials: {
    instagram: '#',
    facebook: '#',
    twitter: '#',
    youtube: '#',
  },
}

export const AMENITIES = [
  { name: 'Free WiFi', icon: 'FiWifi', desc: 'High-speed internet throughout the property' },
  { name: 'Airport Pickup', icon: 'FiTruck', desc: 'Complimentary luxury car transfer' },
  { name: 'Spa', icon: 'FiHeart', desc: 'Rejuvenating treatments by expert therapists' },
  { name: 'Gym', icon: 'FiActivity', desc: '24/7 fitness center with premium equipment' },
  { name: 'Restaurant', icon: 'FiCoffee', desc: 'Rooftop dining with panoramic views' },
  { name: 'Bar', icon: 'FiSun', desc: 'Curated cocktails and rare spirits' },
  { name: 'Parking', icon: 'FiGrid', desc: 'Valet parking for all guests' },
  { name: 'Conference Hall', icon: 'FiBriefcase', desc: 'State-of-the-art event spaces' },
  { name: 'Swimming Pool', icon: 'FiDroplet', desc: 'Heated rooftop infinity pool' },
]

export const STATS = [
  { label: 'Happy Guests', value: 12500, suffix: '+' },
  { label: 'Luxury Rooms', value: 30, suffix: '' },
  { label: 'Years of Excellence', value: 15, suffix: '' },
  { label: '5-Star Reviews', value: 2400, suffix: '+' },
]

export const TESTIMONIALS = [
  {
    name: 'Aarav Mehta',
    role: 'Business Traveler, India',
    rating: 5,
    quote: 'From the moment I arrived, every detail was flawless. The Presidential Suite was beyond imagination, and the staff anticipated every need. This is what true luxury feels like.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    name: 'Emma Wilson',
    role: 'Honeymoon Guest, UK',
    rating: 5,
    quote: 'We chose Hotel HDT for our honeymoon and it was magical. The rooftop dinner under the stars, the spa treatments, the suite with mountain views — every moment was perfect.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
  {
    name: 'Chen Wei',
    role: 'Leisure Traveler, Singapore',
    rating: 5,
    quote: 'The blend of Nepali warmth and modern luxury is unmatched. The HDT Suite was breathtaking and the restaurant served the best dal bhat I have ever had.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
  },
  {
    name: 'Sophie Laurent',
    role: 'Travel Writer, France',
    rating: 5,
    quote: 'Hotel HDT redefines luxury in South Asia. The attention to detail, the curated experiences, and the genuine hospitality make this a destination in itself.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
  },
  {
    name: 'Rajesh Sharma',
    role: 'Conference Attendee, Nepal',
    rating: 5,
    quote: 'Hosted our annual leadership summit here. The conference facilities were world-class, the catering exceptional, and the team handled every request with grace.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  },
]

export const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80',
    title: 'Where Luxury',
    subtitle: 'Meets the Himalayas',
    description: 'A premium sanctuary in the heart of Kathmandu, crafted for the discerning traveler.',
  },
  {
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1920&q=80',
    title: 'Elegant Rooms',
    subtitle: 'Designed for Serenity',
    description: 'Each room a private retreat with floor-to-ceiling windows framing majestic peaks.',
  },
  {
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80',
    title: 'Rooftop Dining',
    subtitle: 'Under the Stars',
    description: 'A culinary journey curated by our Michelin-trained executive chef.',
  },
]

export const MENU_CATEGORIES = [
  { id: 'breakfast', name: 'Breakfast', desc: 'Start your day with Himalayan-inspired mornings' },
  { id: 'lunch', name: 'Lunch', desc: 'Light and flavorful midday creations' },
  { id: 'dinner', name: 'Dinner', desc: 'Curated tasting menus and signature mains' },
  { id: 'drinks', name: 'Drinks', desc: 'Hand-crafted cocktails and rare spirits' },
  { id: 'desserts', name: 'Desserts', desc: 'Sweet conclusions to your dining experience' },
  { id: 'special', name: 'Special Menu', desc: 'Chef-curated exclusive experiences' },
]
