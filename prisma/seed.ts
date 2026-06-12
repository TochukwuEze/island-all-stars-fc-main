import 'dotenv/config'
import { prisma } from '../src/lib/prisma'
import { newsItems } from '../src/data/news'
import { galleryItems } from '../src/app/gallery/gallery-data'

const DEFAULT_MEMBERS = [
  {
    name: "Emeka Okafor",
    email: "emeka.okafor@email.com",
    password: "password123",
    role: "Senior Player",
    number: "#14",
    position: "Midfielder",
    joined: "January 2023",
    membershipType: "Premium",
    membershipExpiry: "December 2026",
    avatar: null,
    status: "active",
    stats: { matches: 32, goals: 7, assists: 11, rating: 7.8 },
    activity: [
      { type: "match", label: "Match vs Apapa FC — Won 3-1", time: "2 days ago" },
      { type: "training", label: "Training Session — Tactical Drills", time: "4 days ago" },
      { type: "payment", label: "Membership Renewed — ₦50,000", time: "1 week ago" },
      { type: "match", label: "Match vs Bar Beach Boys — Draw 1-1", time: "2 weeks ago" },
    ],
    messages: [
      { from: "Coach Tunde", subject: "Training update for next week", time: "2h ago", read: false },
      { from: "Club Admin", subject: "Membership renewal confirmation", time: "1d ago", read: true },
      { from: "Coach Tunde", subject: "Team selection for Saturday", time: "3d ago", read: true },
      { from: "IFC Events", subject: "Annual Club Gala — RSVP Required", time: "5d ago", read: false },
    ],
  },
  {
    name: "John Doe",
    email: "john.doe@email.com",
    password: "password123",
    role: "Junior Player",
    number: "#9",
    position: "Forward",
    joined: "March 2024",
    membershipType: "Basic",
    membershipExpiry: "March 2027",
    avatar: null,
    status: "active",
    stats: { matches: 12, goals: 8, assists: 2, rating: 7.2 },
    activity: [
      { type: "match", label: "Match vs Marina Strikers — Won 2-0", time: "5 days ago" },
      { type: "training", label: "Fitness Drills Session", time: "1 week ago" },
    ],
    messages: [
      { from: "Coach Tunde", subject: "Tactical briefing agenda", time: "1d ago", read: false },
    ],
  },
  {
    name: "Admin User",
    email: "detobisz@yahoo.com",
    password: "123456",
    role: "admin",
    number: "IFC-01",
    position: "Club Administrator",
    joined: "June 2026",
    membershipType: "Club Admin",
    membershipExpiry: "2099-12-31",
    avatar: null,
    status: "active",
  },
];

const DEFAULT_BUSINESSES = [
  {
    name: "Sterling Legal Partners",
    owner: "Chief Adekunle Williams",
    description: "Premium legal consulting, corporate advisory, and dispute resolution services for enterprise clients and individuals.",
    location: "Ikoyi, Lagos",
    tags: ["Legal", "Consulting", "B2B"],
    isVerified: true,
    status: "active",
    phone: "+234 801 234 5678",
  },
  {
    name: "TechNova Solutions Ltd",
    owner: "Mr. Chukwudi Eze",
    description: "End-to-end software development, IT infrastructure setup, and digital transformation consulting.",
    location: "Victoria Island, Lagos",
    tags: ["Technology", "IT Services", "B2B"],
    isVerified: true,
    status: "active",
    phone: "+234 802 345 6789",
  },
  {
    name: "Island Prime Properties",
    owner: "Mrs. Folashade Ojo",
    description: "Luxury real estate brokerage, property management, and investment advisory on the Island.",
    location: "Lekki Phase 1, Lagos",
    tags: ["Real Estate", "Sales", "Management"],
    isVerified: false,
    status: "active",
    phone: "+234 803 456 7890",
  },
  {
    name: "HealthPlus Diagnostics",
    owner: "Dr. Ibrahim Musa",
    description: "State-of-the-art medical laboratory and diagnostic center providing fast and accurate test results.",
    location: "Surulere, Lagos",
    tags: ["Healthcare", "Medical", "B2C"],
    isVerified: true,
    status: "active",
    phone: "+234 804 567 8901",
  },
  {
    name: "Global Trade & Logistics",
    owner: "Alhaji Sani Danjuma",
    description: "International freight forwarding, customs clearance, and supply chain management services.",
    location: "Apapa, Lagos",
    tags: ["Logistics", "Import/Export", "B2B"],
    isVerified: false,
    status: "active",
    phone: "+234 805 678 9012",
  },
];

async function main() {
  console.log("Seeding database...")

  // Seed Members
  const members = DEFAULT_MEMBERS
  for (const m of members) {
    await prisma.member.upsert({
      where: { email: m.email },
      update: {},
      create: {
        name: m.name,
        email: m.email,
        password: m.password,
        role: m.role,
        number: m.number,
        position: m.position,
        joined: m.joined,
        membershipType: m.membershipType,
        membershipExpiry: m.membershipExpiry,
        avatar: m.avatar,
        status: m.status,
        stats: m.stats ? {
          create: {
            matches: m.stats.matches,
            goals: m.stats.goals,
            assists: m.stats.assists,
            rating: m.stats.rating
          }
        } : undefined,
        activity: m.activity && m.activity.length > 0 ? {
          create: m.activity.map(a => ({
            type: a.type,
            label: a.label,
            time: a.time
          }))
        } : undefined,
        messages: m.messages && m.messages.length > 0 ? {
          create: m.messages.map(msg => ({
            from: msg.from,
            subject: msg.subject,
            time: msg.time,
            read: msg.read
          }))
        } : undefined
      }
    })
  }

  // Seed Businesses
  const businesses = DEFAULT_BUSINESSES
  for (const b of businesses) {
    await prisma.business.upsert({
      where: { name: b.name },
      update: {},
      create: {
        name: b.name,
        owner: b.owner,
        description: b.description,
        location: b.location,
        tags: b.tags,
        isVerified: b.isVerified,
        status: b.status,
        phone: b.phone
      }
    })
  }

  // Seed News
  for (const n of newsItems) {
    await prisma.newsItem.upsert({
      where: { slug: n.slug },
      update: {},
      create: {
        slug: n.slug,
        title: n.title,
        category: n.category,
        date: n.date,
        comments: n.comments,
        image: n.image,
        content: n.content
      }
    })
  }

  // Seed Gallery
  for (const g of galleryItems) {
    const existing = await prisma.galleryItem.findFirst({
      where: { src: g.src }
    })
    if (!existing) {
      await prisma.galleryItem.create({
        data: {
          type: g.type,
          src: g.src,
          thumbnail: g.thumbnail,
          title: g.title,
          category: g.category,
          year: g.year,
          description: g.description
        }
      })
    }
  }

  console.log("Seeding complete.")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
