import { LocationItem } from '../types';

export const locations: LocationItem[] = [
  {
    id: 'loc-new-york',
    slug: 'new-york',
    name: 'New York',
    tagline: 'Limestone Townhouses, Pre-War Grandeur & Skyline Penthouses',
    description: 'From discreet Fifth Avenue cooperatives to soaring glass sky-mansions in Tribeca and SoHo. New York remains the undisputed epicenter of international commerce, architectural pedigree, and cultural gravity.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1920&q=80',
    propertyCount: 38,
    avgPriceRange: '$4,500,000 – $45,000,000',
    lifestyleHighlights: [
      'Central Park morning strolls and private museum galas',
      'Michelin three-star dining across Madison Avenue and Tribeca',
      'World-class private air charters via Teterboro (TEB)'
    ],
    architectureNotes: 'A rare spectrum spanning Robert A.M. Stern limestone facades, cast-iron loft volumes, and slender supertall engineering.',
    popularSpots: ['Central Park South', 'Fifth Avenue', 'SoHo Historic District', 'Tribeca Waterfront']
  },
  {
    id: 'loc-miami',
    slug: 'miami',
    name: 'Miami',
    tagline: 'Sculptural Modernism, Coastal Light & Private Deep-Water Docks',
    description: 'Where global contemporary architecture embraces turquoise Atlantic waters. Miami has transformed into an energetic financial capital and tropical sanctuary with private islands and resort-grade amenities.',
    image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?auto=format&fit=crop&w=1920&q=80',
    propertyCount: 29,
    avgPriceRange: '$3,800,000 – $35,000,000',
    lifestyleHighlights: [
      'Private yacht mooring accommodating 100ft+ vessels',
      'Art Basel Miami Beach private previews and Design District ateliers',
      'Gated island security on Star Island, Fisher Island, and Indian Creek'
    ],
    architectureNotes: 'Cantilevered poured-concrete terraces, seamless floor-to-ceiling hurricane glazing, and private rooftop infinity pools.',
    popularSpots: ['Star Island', 'Biscayne Bay Promenade', 'Faena District', 'South of Fifth']
  },
  {
    id: 'loc-los-angeles',
    slug: 'los-angeles',
    name: 'Los Angeles',
    tagline: 'Private Promontories, Gated Enclaves & Timeless Californian Light',
    description: 'Encompassing the golden triangle of Beverly Hills, Bel Air, and Holmby Hills through to the Hollywood Hills. Los Angeles offers unmatched acreage, privacy gates, and sweeping basin-to-ocean vistas.',
    image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80',
    propertyCount: 34,
    avgPriceRange: '$6,500,000 – $65,000,000',
    lifestyleHighlights: [
      'The Beverly Hills Hotel Polo Lounge and private members clubs',
      'Lush canyon microclimates with total perimeter privacy',
      'Sunset boulevard helicopter corridors and private estate screening rooms'
    ],
    architectureNotes: 'Organic modern estates framed by zero-edge pools, board-formed concrete, and preserved mid-century architectural milestones.',
    popularSpots: ['Beverly Hills Flats', 'Bel Air Gates', 'Bird Streets', 'Sunset Plaza']
  },
  {
    id: 'loc-malibu',
    slug: 'malibu',
    name: 'Malibu',
    tagline: 'Dramatic Pacific Bluffs & Oceanfront Architectural Pavilions',
    description: 'Twenty-one miles of coastal perfection. Malibu embodies barefoot elegance, private sandy coves, and world-renowned architectural pavilions designed around crashing surf and golden sunsets.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
    propertyCount: 19,
    avgPriceRange: '$8,900,000 – $75,000,000',
    lifestyleHighlights: [
      'Direct beach access along Billionaires’ Beach (Carbon Beach)',
      'Nobu Malibu seaside dining and Soho Little Beach House',
      'Private equestrian trails through the Santa Monica Mountains'
    ],
    architectureNotes: 'Cedar, stone, and post-tensioned glass cantilevered directly over tide lines with marine-grade bronze finishes.',
    popularSpots: ['Carbon Beach', 'Point Dume', 'Paradise Cove', 'Broad Beach']
  },
  {
    id: 'loc-aspen',
    slug: 'aspen',
    name: 'Aspen',
    tagline: 'Trophy Mountain Compounds & Alpine Cultural Prestige',
    description: 'Perched high in the Roaring Fork Valley, Aspen pairs legendary winter slopes with summer chamber music festivals, Aspen Institute ideas, and Red Mountain billionaire compounds.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80',
    propertyCount: 16,
    avgPriceRange: '$9,500,000 – $55,000,000',
    lifestyleHighlights: [
      'Ski-in/ski-out access onto Aspen Mountain and Highlands',
      'Private aviation landing rights at Aspen/Pitkin County Airport (ASE)',
      'World-class art galleries, Michelin dining, and wine auctions'
    ],
    architectureNotes: 'Modern timber-and-steel alpine chalets featuring heated outdoor stone terraces, oxygenated master suites, and wall-to-wall glass.',
    popularSpots: ['Red Mountain', 'Downtown Core', 'West End', 'Starwood']
  },
  {
    id: 'loc-the-hamptons',
    slug: 'the-hamptons',
    name: 'The Hamptons',
    tagline: 'Oceanfront Acreage, Shingle-Style Heritage & Hedgerow Privacy',
    description: 'The storied summer haven of New York’s cultural and financial elite. Known for pristine dunes, private beach easements, and historic estates secluded behind ten-foot privet hedges.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1920&q=80',
    propertyCount: 22,
    avgPriceRange: '$5,500,000 – $48,000,000',
    lifestyleHighlights: [
      'Atlantic Ocean beach clubs and Southampton golf championships',
      'Private organic farmstands, polo matches, and vineyard tastings',
      'Helicopter and seaplane commutes from Manhattan in under 35 minutes'
    ],
    architectureNotes: 'Classic cedar-shingle manors juxtaposed with sculptural glass pavilions nestled between the bays and ocean.',
    popularSpots: ['Meadow Lane', 'Further Lane', 'Sagaponack South', 'Wiborg Beach']
  }
];
