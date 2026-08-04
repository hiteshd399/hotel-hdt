import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

// Unsplash images (royalty-free, hot-linkable)
const IMG = {
  roomDeluxe1: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80',
  roomDeluxe2: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
  roomSuperior: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
  roomExecutive: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
  roomSuite: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
  roomPresidential: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80',
  restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
  breakfast: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80',
  lunch: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
  dinner: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
  drinks: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80',
  desserts: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
  special: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
  gallery1: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80',
  gallery2: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80',
  gallery3: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80',
  gallery4: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=80',
  gallery5: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
  gallery6: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
  pool: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
  spa: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80',
  event1: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80',
  event2: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1200&q=80',
  offer1: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80',
  offer2: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
  hero: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80',
}

async function main() {
  console.log('🌱 Seeding database...')

  // Clean
  await prisma.contact.deleteMany()
  await prisma.event.deleteMany()
  await prisma.offer.deleteMany()
  await prisma.restaurant.deleteMany()
  await prisma.gallery.deleteMany()
  await prisma.review.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.room.deleteMany()
  await prisma.user.deleteMany()

  // ===== Users =====
  const adminPass = await bcrypt.hash('admin123', 10)
  const userPass = await bcrypt.hash('user123', 10)

  const admin = await prisma.user.create({
    data: {
      name: 'Hotel Admin',
      email: 'admin@hotelhdt.com',
      password: adminPass,
      phone: '+977-9800000000',
      role: 'admin',
    },
  })

  const customer = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'user@hotelhdt.com',
      password: userPass,
      phone: '+977-9811111111',
      role: 'customer',
    },
  })

  const customer2 = await prisma.user.create({
    data: {
      name: 'Sita Sharma',
      email: 'sita@example.com',
      password: userPass,
      phone: '+977-9822222222',
      role: 'customer',
    },
  })

  console.log('✅ Users created (admin@hotelhdt.com / admin123, user@hotelhdt.com / user123)')

  // ===== Rooms =====
  const rooms = [
    {
      name: 'Deluxe Mountain View',
      slug: 'deluxe-mountain-view',
      category: 'Deluxe',
      description: 'A serene 32 sqm sanctuary with floor-to-ceiling windows framing the Himalayan horizon. Each Deluxe room features a king bed dressed in 400-thread-count Egyptian cotton, a marble bathroom with rainfall shower, and curated Nepali art.',
      price: 120,
      guests: 2,
      beds: '1 King Bed',
      bedType: 'King',
      size: '32 sqm',
      bathroom: 'Ensuite with Rainfall Shower',
      view: 'Mountain View',
      images: JSON.stringify([IMG.roomDeluxe1, IMG.roomDeluxe2]),
      features: JSON.stringify(['Free WiFi', 'Smart TV', 'Mini Bar', 'Coffee Machine', 'Air Conditioning', 'Safe']),
      count: 8,
    },
    {
      name: 'Superior City Room',
      slug: 'superior-city-room',
      category: 'Superior',
      description: 'Located on the upper floors, the Superior Room offers panoramic views of Kathmandu Valley. Designed in warm earth tones with bespoke teak furnishings and a private work desk ideal for business travelers.',
      price: 95,
      guests: 2,
      beds: '1 Queen Bed',
      bedType: 'Queen',
      size: '28 sqm',
      bathroom: 'Ensuite Bathroom',
      view: 'City View',
      images: JSON.stringify([IMG.roomSuperior]),
      features: JSON.stringify(['Free WiFi', 'Smart TV', 'Work Desk', 'Air Conditioning', 'Safe']),
      count: 10,
    },
    {
      name: 'Executive King',
      slug: 'executive-king',
      category: 'Executive',
      description: 'Our Executive King blends contemporary elegance with Nepali craft. Includes complimentary lounge access, evening cocktails, and a dedicated concierge service for the discerning traveler.',
      price: 180,
      guests: 3,
      beds: '1 King Bed + Sofa Bed',
      bedType: 'King',
      size: '40 sqm',
      bathroom: 'Marble Bathroom with Bathtub',
      view: 'Valley View',
      images: JSON.stringify([IMG.roomExecutive]),
      features: JSON.stringify(['Free WiFi', 'Smart TV', 'Mini Bar', 'Lounge Access', 'Espresso Machine', 'Bathrobe', 'Air Conditioning']),
      count: 6,
    },
    {
      name: 'HDT Suite',
      slug: 'hdt-suite',
      category: 'Suite',
      description: 'A 65 sqm signature suite with separate living area, panoramic windows, and a private balcony. The suite includes premium amenities, a dedicated butler, and curated in-room dining.',
      price: 280,
      guests: 4,
      beds: '1 King Bed + Living Room',
      bedType: 'King',
      size: '65 sqm',
      bathroom: 'Spa Bathroom with Jacuzzi',
      view: 'Panoramic Mountain & City',
      images: JSON.stringify([IMG.roomSuite]),
      features: JSON.stringify(['Free WiFi', 'Smart TV', 'Mini Bar', 'Butler Service', 'Private Balcony', 'Jacuzzi', 'Espresso Machine', 'Lounge Access']),
      count: 4,
    },
    {
      name: 'Presidential Suite',
      slug: 'presidential-suite',
      category: 'Presidential Suite',
      description: 'The crown jewel of Hotel HDT. A two-bedroom 120 sqm residence with private dining for eight, a study, panoramic terrace, and unparalleled Himalayan views. Includes private chef on request and airport transfer by luxury car.',
      price: 650,
      guests: 6,
      beds: '2 King Beds + Living + Dining',
      bedType: 'King',
      size: '120 sqm',
      bathroom: 'Two Spa Bathrooms + Powder Room',
      view: '360° Mountain Views',
      images: JSON.stringify([IMG.roomPresidential]),
      features: JSON.stringify(['Free WiFi', 'Smart TV', 'Mini Bar', 'Private Chef', 'Butler Service', 'Private Terrace', 'Jacuzzi', 'Airport Transfer', 'Lounge Access', 'Dining for 8']),
      count: 2,
    },
  ]

  const createdRooms = []
  for (const r of rooms) {
    const room = await prisma.room.create({ data: r })
    createdRooms.push(room)
  }
  console.log(`✅ ${createdRooms.length} rooms created`)

  // ===== Reviews =====
  const reviews = [
    { userId: customer.id, roomId: createdRooms[0].id, rating: 5, comment: 'Absolutely stunning view from the deluxe room. The staff went above and beyond. Will return!', approved: true },
    { userId: customer2.id, roomId: createdRooms[3].id, rating: 5, comment: 'The HDT Suite was beyond our expectations. Butler service was impeccable. Perfect anniversary stay.', approved: true },
    { userId: customer.id, roomId: createdRooms[2].id, rating: 4, comment: 'Executive King was elegant and spacious. Lounge access was a wonderful touch.', approved: true },
    { userId: customer2.id, roomId: createdRooms[1].id, rating: 4, comment: 'Lovely room with great city views. Housekeeping was prompt. Highly recommend.', approved: true },
    { userId: customer.id, roomId: createdRooms[4].id, rating: 5, comment: 'The Presidential Suite is in a league of its own. Worth every penny.', approved: true },
  ]
  for (const r of reviews) {
    await prisma.review.create({ data: r })
  }
  console.log(`✅ ${reviews.length} reviews created`)

  // ===== Gallery =====
  const gallery = [
    { title: 'Hotel Exterior', category: 'hotel', imageUrl: IMG.gallery1 },
    { title: 'Grand Lobby', category: 'hotel', imageUrl: IMG.gallery2 },
    { title: 'Rooftop Pool', category: 'pool', imageUrl: IMG.pool },
    { title: 'Spa Sanctuary', category: 'hotel', imageUrl: IMG.spa },
    { title: 'Fine Dining', category: 'restaurant', imageUrl: IMG.restaurant },
    { title: 'Suite Living', category: 'rooms', imageUrl: IMG.roomSuite },
    { title: 'Deluxe Bedroom', category: 'rooms', imageUrl: IMG.roomDeluxe1 },
    { title: 'Executive Lounge', category: 'rooms', imageUrl: IMG.roomExecutive },
    { title: 'Banquet Hall', category: 'events', imageUrl: IMG.event1 },
    { title: 'Wedding Setup', category: 'events', imageUrl: IMG.event2 },
    { title: 'Sunset Bar', category: 'restaurant', imageUrl: IMG.drinks },
    { title: 'Spa Pool', category: 'pool', imageUrl: IMG.gallery3 },
  ]
  for (const g of gallery) {
    await prisma.gallery.create({ data: g })
  }
  console.log(`✅ ${gallery.length} gallery items created`)

  // ===== Restaurant Menu =====
  const menu = [
    // Breakfast
    { name: 'Avocado Toast', description: 'Sourdough, smashed avocado, poached eggs, chili flakes, lime', price: 12, category: 'breakfast', image: IMG.breakfast },
    { name: 'Tibetan Tsampa Bowl', description: 'Roasted barley porridge, honey, almonds, seasonal berries', price: 9, category: 'breakfast' },
    { name: 'Full Nepali Breakfast', description: 'Sel roti, aloo tama, boiled eggs, yogurt, fresh juice', price: 14, category: 'breakfast' },
    { name: 'Eggs Benedict', description: 'Poached eggs, smoked salmon, hollandaise, English muffin', price: 16, category: 'breakfast' },
    // Lunch
    { name: 'Grilled Chicken Salad', description: 'Quinoa, avocado, cherry tomato, feta, lemon dressing', price: 18, category: 'lunch', image: IMG.lunch },
    { name: 'Dal Bhat Thali', description: 'Traditional lentil soup, steamed rice, seasonal vegetables, pickle', price: 16, category: 'lunch' },
    { name: 'Margherita Pizza', description: 'San Marzano tomato, fresh mozzarella, basil, olive oil', price: 20, category: 'lunch' },
    { name: 'Truffle Pasta', description: 'Tagliatelle, black truffle, parmesan, cream', price: 26, category: 'lunch' },
    // Dinner
    { name: 'Grilled Salmon', description: 'Atlantic salmon, asparagus, saffron risotto, citrus beurre blanc', price: 38, category: 'dinner', image: IMG.dinner },
    { name: 'Tenderloin Steak', description: '250g Wagyu, potato gratin, sautéed greens, red wine jus', price: 52, category: 'dinner' },
    { name: 'Momo Platter', description: 'Steamed & pan-fried Nepali dumplings, three sauces', price: 22, category: 'dinner' },
    { name: 'Lamb Rogan Josh', description: 'Slow-cooked lamb, Kashmiri spices, basmati rice, naan', price: 34, category: 'dinner' },
    // Drinks
    { name: 'HDT Signature Cocktail', description: 'Himalayan gin, elderflower, lime, soda, mountain herbs', price: 14, category: 'drinks', image: IMG.drinks },
    { name: 'Masala Chai', description: 'Cardamom, clove, fresh ginger, full cream milk', price: 6, category: 'drinks' },
    { name: 'Mango Lassi', description: 'Fresh mango, yogurt, cardamom, pistachio', price: 7, category: 'drinks' },
    { name: 'Single Malt Whisky', description: 'Selection of 12-year aged Scottish single malts', price: 18, category: 'drinks' },
    // Desserts
    { name: 'Molten Chocolate Cake', description: 'Warm dark chocolate, vanilla bean ice cream, gold leaf', price: 12, category: 'desserts', image: IMG.desserts },
    { name: 'Saffron Kulfi', description: 'Traditional Indian ice cream, pistachio, rose syrup', price: 10, category: 'desserts' },
    { name: 'Tiramisu', description: 'Mascarpone, espresso-soaked ladyfingers, cocoa', price: 11, category: 'desserts' },
    // Special
    { name: 'Chef Tasting Menu', description: 'Seven-course journey through Himalayan & continental cuisine', price: 120, category: 'special', image: IMG.special },
    { name: 'Rooftop Sunset Dinner', description: 'Five-course dinner with sommelier-paired wines on the rooftop', price: 95, category: 'special' },
  ]
  for (const m of menu) {
    await prisma.restaurant.create({ data: m })
  }
  console.log(`✅ ${menu.length} menu items created`)

  // ===== Offers =====
  const offers = [
    {
      title: 'Stay 3, Pay 2',
      description: 'Book three nights and enjoy the third night complimentary. Includes daily breakfast and airport pickup.',
      discount: '33%',
      image: IMG.offer1,
      validFrom: new Date(),
      validTo: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      active: true,
    },
    {
      title: 'Honeymoon Escape',
      description: 'Romantic suite, candle-lit dinner, couples spa, and a bottle of champagne. Curated for unforgettable moments.',
      discount: '25%',
      image: IMG.offer2,
      validFrom: new Date(),
      validTo: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      active: true,
    },
    {
      title: 'Business Traveler',
      description: 'Executive room, lounge access, complimentary airport transfer, and 24/7 business center.',
      discount: '20%',
      image: IMG.roomExecutive,
      validFrom: new Date(),
      validTo: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
      active: true,
    },
  ]
  for (const o of offers) {
    await prisma.offer.create({ data: o })
  }
  console.log(`✅ ${offers.length} offers created`)

  // ===== Events =====
  const events = [
    {
      title: 'New Year Gala 2026',
      description: 'Ring in 2026 with a black-tie gala dinner, live jazz, and champagne toast at midnight on the rooftop.',
      date: new Date('2026-12-31T19:00:00'),
      location: 'Rooftop Grand Hall',
      image: IMG.event1,
      capacity: 200,
    },
    {
      title: 'Himalayan Wine Tasting',
      description: 'Sommelier-led tasting of five rare wines paired with Himalayan canapés. Limited to 40 guests.',
      date: new Date('2026-09-15T18:00:00'),
      location: 'Cellar Lounge',
      image: IMG.event2,
      capacity: 40,
    },
    {
      title: 'Corporate Leadership Summit',
      description: 'A two-day summit for executives featuring keynote speakers, breakout sessions, and networking dinner.',
      date: new Date('2026-10-10T09:00:00'),
      location: 'Conference Hall A',
      image: IMG.gallery1,
      capacity: 300,
    },
  ]
  for (const e of events) {
    await prisma.event.create({ data: e })
  }
  console.log(`✅ ${events.length} events created`)

  // ===== Bookings =====
  const bookings = [
    {
      userId: customer.id,
      roomId: createdRooms[0].id,
      checkIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      checkOut: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      adults: 2,
      children: 0,
      nights: 3,
      guestsTotal: 2,
      pricePerNight: 120,
      totalPrice: 360,
      status: 'approved',
    },
    {
      userId: customer2.id,
      roomId: createdRooms[3].id,
      checkIn: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      checkOut: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000),
      adults: 2,
      children: 0,
      nights: 3,
      guestsTotal: 2,
      pricePerNight: 280,
      totalPrice: 840,
      status: 'pending',
    },
    {
      userId: customer.id,
      roomId: createdRooms[2].id,
      checkIn: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      checkOut: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000),
      adults: 1,
      children: 0,
      nights: 3,
      guestsTotal: 1,
      pricePerNight: 180,
      totalPrice: 540,
      status: 'completed',
    },
  ]
  for (const b of bookings) {
    await prisma.booking.create({ data: b })
  }
  console.log(`✅ ${bookings.length} bookings created`)

  // ===== Contacts =====
  await prisma.contact.create({
    data: {
      userId: customer.id,
      name: 'John Doe',
      email: 'user@hotelhdt.com',
      phone: '+977-9811111111',
      subject: 'Airport Pickup Inquiry',
      message: 'Hello, I have a booking next week. Could you arrange airport pickup at 14:00 from Tribhuvan International Airport?',
      resolved: false,
    },
  })
  await prisma.contact.create({
    data: {
      name: 'Jane Travels',
      email: 'jane@example.com',
      subject: 'Wedding Venue Availability',
      message: 'We are planning a destination wedding for 150 guests in March 2026. Could you share availability and packages?',
      resolved: true,
    },
  })
  console.log('✅ Contacts created')

  console.log('\n🎉 Seeding complete!')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('Admin:    admin@hotelhdt.com / admin123')
  console.log('Customer: user@hotelhdt.com / user123')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
