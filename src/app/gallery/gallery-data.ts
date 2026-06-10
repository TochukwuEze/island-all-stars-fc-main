export type GalleryItem = {
  id: string;
  type: "photo" | "video";
  src: string;
  thumbnail: string;
  title: string;
  category: string;
  year: number;
  description?: string;
};

export const galleryItems: GalleryItem[] = [
  // -- Photos ------------------------------------------------------------------
  {
    id: "photo-1",
    type: "photo",
    src: "/images/members/memberImage11.webp",
    thumbnail: "/images/members/memberImage11.webp",
    title: "Match Day Intensity",
    category: "Match",
    year: 2024,
  },
  {
    id: "photo-2",
    type: "photo",
    src: "/images/hero-bg-2.webp",
    thumbnail: "/images/hero-bg-2.webp",
    title: "Team Training Session",
    category: "Training",
    year: 2024,
  },
  {
    id: "photo-3",
    type: "photo",
    src: "/images/hero-bg-3.webp",
    thumbnail: "/images/hero-bg-3.webp",
    title: "Stadium Atmosphere",
    category: "Fans",
    year: 2024,
  },
  {
    id: "photo-4",
    type: "photo",
    src: "/images/members/memberImage6.webp",
    thumbnail: "/images/members/memberImage6.webp",
    title: "Grassroots Development",
    category: "Community",
    year: 2024,
  },
  {
    id: "photo-5",
    type: "photo",
    src: "/images/news/unites.png",
    thumbnail: "/images/news/unites.png",
    title: "Football Unites Everyone",
    category: "Community",
    year: 2024,
  },

  // -- IASC Lekki 8 Aside Tournament 2016 --------------------------------------

  {
    id: "t16-1",
    type: "video",
    src: "https://www.youtube.com/embed/Ix9iBf2oihY",
    thumbnail: "https://img.youtube.com/vi/Ix9iBf2oihY/hqdefault.jpg",
    title: "ISLAND ALL STARS SPORTS CLUB HONOURS ARISE TV",
    description:
      "Arise TV was recognized for their support and contribution to the success of the Island All Stars Sports Club. The award was presented at the club's End of Year Party in 2024.",
    category: "Dec 16, 2024",
    year: 2024,
  },
  {
    id: "t16-2",
    type: "video",
    src: "https://www.youtube.com/embed/Pfl76o_jTQM",
    thumbnail: "https://img.youtube.com/vi/Pfl76o_jTQM/hqdefault.jpg",
    title: "Arise TV awarded at IASC End of Year Party 2024",
    description:
      "Arise TV was recognized for their support and contribution to the success of the Island All Stars Sports Club. The award was presented at the club's End of Year Party in 2024.",
    category: "Others",
    year: 2024,
  },
  {
    id: "t16-3",
    type: "video",
    src: "https://www.youtube.com/embed/Dh0JCODTtPk",
    thumbnail: "https://img.youtube.com/vi/Dh0JCODTtPk/maxresdefault.jpg",
    title:
      "Island All Stars SC vs All Stars International FC - Saturday, July 26, 2025",
    description:
      "Watch the electrifying clash between Island All Stars SC and All Stars International FC! Catch all the highlights from this thrilling encounter. Don’t miss a moment—watch, like, and subscribe for more exciting match coverage!",
    category: "July 26, 2025",
    year: 2025,
  },
  {
    id: "t16-4",
    type: "video",
    src: "https://www.youtube.com/embed/1lAOnbD8TpQ",
    thumbnail: "https://img.youtube.com/vi/1lAOnbD8TpQ/maxresdefault.jpg",
    title:
      "ISLAND ALLSTARS SPORTS CLUB: HOMECOMING NOVELTY MATCH & EARLY BIRTHDAY CELEBRATION",
    description:
      "Island Allstars Sports Club hosts a lively novelty football match celebrating a member's homecoming. Teams Global and Island Allstars showcase energetic play and skillful maneuvers in a close contest. The friendly match concludes with a celebratory atmosphere despite a tie.",
    category: "OCT 25 2025",
    year: 2025,
  },
  {
    id: "t16-5",
    type: "video",
    src: "https://www.youtube.com/embed/g7PK5Umkazs",
    thumbnail: "https://img.youtube.com/vi/g7PK5Umkazs/maxresdefault.jpg",
    title: "Island Allstars vs Navy Town Ojo | Lagos Football Showdown | Super",
    description:
      "This video features a friendly, competitive football match between Island Allstars Sports Club and Navy Town Ojo held at the Lagos Business School Arena on April 25, 2026. The event emphasized brotherhood, sportsmanship, and the spirit of community bonding.",
    category: "April 25, 2026",
    year: 2026,
  },
  {
    id: "t16-6",
    type: "video",
    src: "https://www.youtube.com/embed/hWXhmC7I7-c",
    thumbnail: "https://img.youtube.com/vi/hWXhmC7I7-c/maxresdefault.jpg",
    title:
      "Africa’s Social Football Spectacle! | Island All Stars Synergy Cup 2025 – Week 2 Live from Lagos",
    description:
      "The Island All Stars WERBLACK WINES Synergy Cup 2025 is redefining what social football means across the continent — passion, unity, and pure flair!",
    category: "October 25, 2025",
    year: 2025,
  },
  {
    id: "t16-7",
    type: "video",
    src: "https://www.youtube.com/embed/38USi62sDjg",
    thumbnail: "https://img.youtube.com/vi/38USi62sDjg/maxresdefault.jpg",
    title: "IASC Super Cup 2026 🏆 | Team Lugna 🆚 Island Allstars SC",
    description:
      "Football passion meets competition as both teams battle for glory in this highly anticipated Super Cup encounter, played at the iconic Lagos Business School. From intense tackles to moments of brilliance, this match delivered excitement from start to finish.",
    category: "Feb 21, 2026",
    year: 2026,
  },
  {
    id: "t16-8",
    type: "video",
    src: "https://www.youtube.com/embed/mQW7UdgY1Kk",
    thumbnail: "https://img.youtube.com/vi/mQW7UdgY1Kk/maxresdefault.jpg",
    title:
      "1st Half Enugu Selected All Stars vs Island AllStars Sports Club of Lagos",
    description:
      "This video features a novelty football match played in Enugu between the Enugu Selected All Stars and the Island AllStars Sports Club of Lagos. The match serves as a homecoming event for the visiting Lagos team, as many of the players originally come from the region.",
    category: "Mar 15, 2025",
    year: 2025,
  },
  {
    id: "t16-9",
    type: "video",
    src: "https://www.youtube.com/embed/8LRrdd0GlGE",
    thumbnail: "https://img.youtube.com/vi/8LRrdd0GlGE/maxresdefault.jpg",
    title:
      "Global Football Stream: Island AllStars WERBLACK WINES Cup 2025 | Week 1 Live",
    description:
      "The Island AllStars Sports Club proudly presents the WERBLACK WINES Synergy Cup 2025, kicking off Week 1 from Lagos Business School Arena, Ajah. This tournament is a celebration of sport, unity, friendship, and community, bringing some of the most talented social club teams together.",
    category: "Oct 18, 2025",
    year: 2025,
  },
  {
    id: "t16-10",
    type: "video",
    src: "https://www.youtube.com/embed/bg0UPcDIq2Q",
    thumbnail: "https://img.youtube.com/vi/bg0UPcDIq2Q/maxresdefault.jpg",
    title:
      "ISLAND ALLSTARS SC 1-2 ELITE FOOTBALL CLUB LAGOS | HIGHLIGHTS | CLUB CHALLENGE",
    description:
      "This video features a novelty football match played in Enugu between the Enugu Selected All Stars and the Island AllStars Sports Club of Lagos. The match serves as a homecoming event for the visiting Lagos team, as many of the players originally come from the region.",
    category: "Mar 27, 2024",
    year: 2024,
  },
  {
    id: "t16-11",
    type: "video",
    src: "https://www.youtube.com/embed/b8xWKxkvOcI",
    thumbnail: "https://img.youtube.com/vi/b8xWKxkvOcI/maxresdefault.jpg",
    title: "ISLAND ALLSTARS SPORTS CLUB ELECTION 2022",
    description:
      "Island Allstars Sports Club Presidential Election 2022: Haliru Momodu (The Bridge) vs. Ikenna Maduagwu (The New Order)",
    category: "May 28, 2022",
    year: 2022,
  },
  {
    id: "t16-12",
    type: "video",
    src: "https://www.youtube.com/embed/cSWyFIwxXy8",
    thumbnail: "https://img.youtube.com/vi/cSWyFIwxXy8/maxresdefault.jpg",
    title: "ISLAND ALL STARS ABOVE 45 TOURNAMENT 2024",
    description:
      "This video features a football match between Real Tonex and Live Station, held on October 5, 2024, at the Lagos Business School as part of the Island All Stars Above 45 Tournament.",
    category: "Oct 5, 2024",
    year: 2024,
  },
  {
    id: "t16-13",
    type: "video",
    src: "https://www.youtube.com/embed/whfSZwZxy5U",
    thumbnail: "https://img.youtube.com/vi/whfSZwZxy5U/maxresdefault.jpg",
    title: "2024 IASC PROVIDUS BANK ACHIEVERS CUP: TEAM T-GOLD VS TEAM PROSSY",
    description:
      "2024 Island All Stars Sports Club Providus Bank Achievers Cup: Team T-Gold vs. Team Prossy",
    category: "Oct 19, 2024",
    year: 2024,
  },
  {
    id: "t16-14",
    type: "video",
    src: "https://www.youtube.com/embed/FiHeled5VjI",
    thumbnail: "https://img.youtube.com/vi/FiHeled5VjI/maxresdefault.jpg",
    title:
      "Allstars Sports Club Inaugurates Excos And Inducts New Members | Metrofile",
    description:
      "Allstars Sports Club Inaugurates Excos And Inducts New Members | Metrofile",
    category: "Jan 14, 2023",
    year: 2023,
  },
  {
    id: "t16-15",
    type: "video",
    src: "https://www.youtube.com/embed/faIk1Ew2wEc",
    thumbnail: "https://img.youtube.com/vi/faIk1Ew2wEc/maxresdefault.jpg",
    title: "HIGHLIGHT: ISLAND ALLSTARS MANIFESTO NIGHT & ELECTION 2022.",
    description:
      "The anticipated general election of the Island Allstars Sports Club held on Saturday May 28, 2022 saw Mr Ikenna Maduagwu emerge as the President of the club for the next three years, defeating Mr Haliru Momodu with 99 votes to 88 votes.",
    category: "May 31, 2022",
    year: 2022,
  },
  {
    id: "t16-16",
    type: "video",
    src: "https://www.youtube.com/embed/hfdTuxrm4Sc",
    thumbnail: "https://img.youtube.com/vi/hfdTuxrm4Sc/maxresdefault.jpg",
    title: "2023 ISLAND ALLSTARS PROVIDUS LOVE CUP MATCHDAY 2 HIGHLIGHT",
    description:
      "2023 Island Allstars Providus Bank Love Cup Matchday 1: Realitypro Vs Lush Club and Lorenzo-Phianni Vs  Ailes Group",
    category: "Oct 31, 2023",
    year: 2023,
  },
  {
    id: "t16-17",
    type: "video",
    src: "https://www.youtube.com/embed/HR0E38l6DZQ",
    thumbnail: "https://img.youtube.com/vi/HR0E38l6DZQ/maxresdefault.jpg",
    title: "2nd Half Enugu Selected All stars vs Island Sports Club of Lagos",
    description:
      "This video captures the 2nd half of a novelty football match between the Enugu Selected All Stars and the Island Sports Club of Lagos. Throughout the match, the commentary highlights the skill of veteran players, the flow of the game, and moments of high excitement.",
    category: "Mar 15, 2025",
    year: 2025,
  },
  {
    id: "t16-18",
    type: "video",
    src: "https://www.youtube.com/embed/V-2oJjOMukk",
    thumbnail: "https://img.youtube.com/vi/V-2oJjOMukk/maxresdefault.jpg",
    title:
      "2023 Island Allstars Providus Bank Love Cup: Realitypro Vs Lush Club",
    description:
      "2023 Island Allstars Providus Bank Love Cup Matchday 1: Realitypro Vs Lush Club and Lorenzo-Phianni Vs Ailes Group",
    category: "Oct 21, 2023",
    year: 2023,
  },
  {
    id: "t16-19",
    type: "video",
    src: "https://www.youtube.com/embed/Bu2ErPSFzIA",
    thumbnail: "https://img.youtube.com/vi/Bu2ErPSFzIA/maxresdefault.jpg",
    title: "National Club Friendly: Island Allstars SC VS Primus City AS",
    description:
      "This video features a football match between Island Allstars SC and Primus City AS. The event serves as a grassroots sports exhibition, organized by Sports247 ",
    category: "Nov 4, 2023",
    year: 2023,
  },
  {
    id: "t16-20",
    type: "video",
    src: "https://www.youtube.com/embed/XWVUzpK0aks",
    thumbnail: "https://img.youtube.com/vi/XWVUzpK0aks/maxresdefault.jpg",
    title:
      "Club Election: Island All Stars Holds Manifesto Night Ahead Of Club Elections",
    description:
      "This video reports on the Manifesto Night hosted by the Island All Stars Sports Club in Lagos, where candidates presented their visions for upcoming leadership elections  ",
    category: " May 12, 2025",
    year: 2025,
  },
  {
    id: "t16-21",
    type: "video",
    src: "https://www.youtube.com/embed/MgPZiftcehQ",
    thumbnail: "https://img.youtube.com/vi/MgPZiftcehQ/maxresdefault.jpg",
    title:
      "2023 Island Allstars Providus Bank Love Cup: Lush Club Vs Lorenzo-Phianni",
    description:
      "2023 Island Allstars Providus Bank Love Cup: Lush Club Vs Lorenzo-Phianni",
    category: "Oct 28, 2023",
    year: 2023,
  },
];
