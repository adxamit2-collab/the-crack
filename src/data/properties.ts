import { Property } from '../types';

export const properties: Property[] = [
  {
    id: 'prop-ocean-house',
    slug: 'the-ocean-house',
    title: 'The Ocean House',
    subtitle: 'Sculptural coastal residence designed around light, privacy and uninterrupted Pacific views',
    location: 'Malibu',
    neighborhood: 'Malibu Coast, California',
    address: '31244 Broad Beach Road, Malibu, CA 90265',
    price: '$18,500,000',
    priceNumeric: 18500000,
    pricePeriod: 'sale',
    status: 'For Sale',
    type: 'Luxury Residence',
    bedrooms: 5,
    bathrooms: 7,
    areaSqFt: 6800,
    parkingSpaces: 4,
    yearBuilt: 2024,
    furnishedStatus: 'Furnished',
    featured: true,
    description: 'A sculptural coastal residence designed around light, privacy and uninterrupted Pacific views. Engineered with post-tensioned board-formed concrete, marine-grade bronze joinery, and private steps descending to a secluded sandy cove.',
    longDescription: [
      'The Ocean House represents the zenith of modern Californian coastal architecture. Positioned along an exclusive ocean bluff in Western Malibu, this architectural achievement merges brutalist sculptural mass with ethereal coastal transparency.',
      'Inside, an expansive triple-exposure great room frames 180-degree Pacific horizons through motorized Schuco glass walls that disappear seamlessly into structural pockets. Honed Pietra di Cardoso stone floors flow effortlessly out to a cantilevered heated horizon pool and teak dining loggia.',
      'The primary retreat spans the entire upper western wing, featuring dual dressing rooms clad in smoked rift-sawn oak, an open-hearth fireplace, and an en-suite bath carved from bookmatched Calacatta marble with an outdoor soaking terrace.'
    ],
    amenities: [
      'Private Beach Staircase',
      'Cantilevered Infinity Ocean Pool',
      'Sub-Zero & Gaggenau Chef Scullery',
      'Motorized Pocketing Glass Walls',
      'Crestron Whole-Home Automation',
      'Temperature-Controlled 600-Bottle Wine Room',
      '4-Car Secured Temperature-Zoned Garage',
      'Private Wellness Spa & Sauna',
      '24/7 Monitored Perimeter Defense'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85'
    ],
    agentId: 'agent-3',
    coordinates: { lat: 34.0259, lng: -118.7798 },
    nearbyPoints: [
      { name: 'Broad Beach Shoreline', distance: 'Direct Access', type: 'Beach' },
      { name: 'Nobu Malibu & Soho Little Beach House', distance: '12 min', type: 'Dining' },
      { name: 'Malibu Country Mart', distance: '14 min', type: 'Shopping' },
      { name: 'Camarillo Airport Private Terminal', distance: '30 min', type: 'Aviation' }
    ]
  },
  {
    id: 'prop-hudson',
    slug: 'the-hudson-residence',
    title: 'The Hudson Residence',
    subtitle: 'Full-floor corner aerie overlooking the Hudson River and Manhattan skyline',
    location: 'New York',
    neighborhood: 'Manhattan, New York',
    address: '150 Charles Street, West Village, New York, NY 10014',
    price: '$6,950,000',
    priceNumeric: 6950000,
    pricePeriod: 'sale',
    status: 'For Sale',
    type: 'City Apartment',
    bedrooms: 4,
    bathrooms: 4.5,
    areaSqFt: 4820,
    parkingSpaces: 2,
    yearBuilt: 2023,
    furnishedStatus: 'Semi-Furnished',
    featured: true,
    description: 'A museum-grade full-floor sanctuary in the West Village, offering four exposures, dramatic Hudson River sunset panoramas, and private key-locked elevator foyer access.',
    longDescription: [
      'Commanding one of the most coveted corner positions in Manhattan’s historic West Village, The Hudson Residence balances historical cobblestone neighborhood intimacy with soaring scale and uncompromised light.',
      'The dramatic 60-foot corner living gallery features 11-foot finished ceilings, chevron European white oak parquetry, and continuous bronze casement windows framing maritime river traffic.',
      'The Molteni custom kitchen is centered around a monolithic honed Saint Laurent marble island, Dornbracht platinum matte fixtures, and integrated Miele master series appliances.'
    ],
    amenities: [
      'Private Key-Locked Elevator Foyer',
      'Direct Hudson River Sunset Vistas',
      '75-Foot Lap Pool & Spa in Building',
      '24-Hour Concierge & Doorman',
      'On-Site Underground Parking Stall',
      'Private Wine Cellar Storage',
      'Integrated Humidification & Acoustic Glazing',
      'Cold Storage for Private Deliveries'
    ],
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=85'
    ],
    agentId: 'agent-1',
    coordinates: { lat: 40.7335, lng: -74.0084 },
    nearbyPoints: [
      { name: 'Hudson River Greenway', distance: '1 block', type: 'Park' },
      { name: 'Whitney Museum of American Art', distance: '8 min walk', type: 'Culture' },
      { name: 'The Little Owl & West Village Dining', distance: '3 min walk', type: 'Dining' },
      { name: 'Downtown Heliport (JRB)', distance: '10 min', type: 'Aviation' }
    ]
  },
  {
    id: 'prop-beverly-hills',
    slug: 'beverly-hills-estate',
    title: 'Beverly Hills Estate',
    subtitle: 'Promontory modern compound wrapped in mature olive groves and city lights',
    location: 'Beverly Hills',
    neighborhood: 'Beverly Hills, California',
    address: '1185 Laurel Way, Beverly Hills, CA 90210',
    price: '$24,500,000',
    priceNumeric: 24500000,
    pricePeriod: 'sale',
    status: 'For Sale',
    type: 'Luxury Residence',
    bedrooms: 6,
    bathrooms: 8,
    areaSqFt: 9400,
    parkingSpaces: 6,
    yearBuilt: 2024,
    furnishedStatus: 'Furnished',
    featured: true,
    description: 'An architectural tour de force crowning a private promontory behind double security gates. Boasts an infinity-edge swimming pool hovering above Los Angeles and a private screening pavilion.',
    longDescription: [
      'Unrivaled in scale and finish, this Beverly Hills compound offers absolute perimeter privacy and dramatic sightlines stretching from Downtown Los Angeles to Catalina Island.',
      'Designed by an internationally recognized architectural atelier, the residence showcases board-formed concrete, travertine exterior terraces, water courts with specimen ancient olive trees, and soaring ceiling volumes.',
      'Entertainment amenities include a Dolby Atmos certified 12-seat private screening room, commercial catering back-kitchen, fitness wellness center with cold plunge, and temperature-controlled gallery for automobile display.'
    ],
    amenities: [
      'Gated Double Motor Court',
      '12-Seat Dolby Atmos Screening Theater',
      'Zero-Edge Horizon Swimming Pool',
      'Wellness Center with Cold Plunge & Steam',
      'Catering Scullery & Staff Suite',
      'Automated Security Perimeter Defense',
      'Lutron Ketra Architectural Circadian Lighting',
      'Sub-Zero Dual Climate Controlled Cellar'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85'
    ],
    agentId: 'agent-3',
    coordinates: { lat: 34.0895, lng: -118.4068 },
    nearbyPoints: [
      { name: 'The Beverly Hills Hotel', distance: '3 min', type: 'Hospitality' },
      { name: 'Rodeo Drive Flagships', distance: '6 min', type: 'Shopping' },
      { name: 'SoHo Warehouse & Sunset Strip', distance: '8 min', type: 'Social' },
      { name: 'Van Nuys Airport (VNY) Private Terminal', distance: '22 min', type: 'Aviation' }
    ]
  },
  {
    id: 'prop-mercer',
    slug: 'the-mercer-house',
    title: 'The Mercer House',
    subtitle: 'Cast-iron architectural loft featuring museum light and private landscaped terrace',
    location: 'New York',
    neighborhood: 'SoHo, New York',
    address: '94 Mercer Street, SoHo, New York, NY 10012',
    price: '$4,850,000',
    priceNumeric: 4850000,
    pricePeriod: 'sale',
    status: 'For Sale',
    type: 'City Apartment',
    bedrooms: 3,
    bathrooms: 3.5,
    areaSqFt: 3400,
    parkingSpaces: 1,
    yearBuilt: 2023,
    furnishedStatus: 'Furnished',
    featured: true,
    description: 'The archetype of SoHo cast-iron living. Spanning 3,400 interior square feet with soaring 13-foot timber ceilings, restored Corinthian cast-iron columns, and a private 800 sq ft planted terrace.',
    longDescription: [
      'Positioned along cobblestone Mercer Street, this loft exemplifies pure architectural heritage elevated for contemporary connoisseurs.',
      'Massive wood-framed south-facing windows flood the gallery-scale salon with golden natural light, highlighting wide-plank reclaimed pine floors and custom Belgian linen drapery.',
      'The residence includes an open Boffi kitchen with brushed black metal finishes, a secluded primary wing with dual walk-in closets, and direct access to an intimate courtyard loggia.'
    ],
    amenities: [
      'Original Cast-Iron Architectural Columns',
      'Private 800 Sq Ft Landscaped Loggia',
      '13-Foot Soaring Ceilings',
      'Keyed Direct Elevator Access',
      'Boffi Kitchen with Miele Induction',
      'Radiant Heated Bathroom Slabs',
      'Discreet Doorman & Package Reception'
    ],
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85'
    ],
    agentId: 'agent-1',
    coordinates: { lat: 40.7243, lng: -73.9983 },
    nearbyPoints: [
      { name: 'Mercer Street Cobblestones', distance: 'Direct Frontage', type: 'Historic' },
      { name: 'Cipriani Downtown', distance: '3 min walk', type: 'Dining' },
      { name: 'The Mercer Kitchen', distance: '2 min walk', type: 'Dining' }
    ]
  },
  {
    id: 'prop-palm-house',
    slug: 'palm-house',
    title: 'Palm House',
    subtitle: 'Organic modernist waterfront villa with private deepwater yacht slip',
    location: 'Miami',
    neighborhood: 'Miami Beach, Florida',
    address: '4530 N Bay Road, Miami Beach, FL 33140',
    price: '$5,250,000',
    priceNumeric: 5250000,
    pricePeriod: 'sale',
    status: 'For Sale',
    type: 'Luxury Residence',
    bedrooms: 4,
    bathrooms: 4.5,
    areaSqFt: 4200,
    parkingSpaces: 3,
    yearBuilt: 2024,
    furnishedStatus: 'Furnished',
    featured: true,
    description: 'An organic tropical modernist waterfront villa along prestigious North Bay Road, pairing poured architectural concrete with lush interior courtyards and deepwater Biscayne Bay access.',
    longDescription: [
      'Conceived as a tranquil tropical pavilion, Palm House creates an effortless continuity between indoor living halls and sunlit outdoor water terraces.',
      'Floor-to-ceiling impact glass walls slide away to reveal a 60-foot lap pool, an outdoor teak summer lounge, and a private dock ready to accommodate deep-draft sport yachts.',
      'The interiors showcase light travertine flooring, custom white oak millwork, and a master sanctuary that commands sunset water vistas toward the Miami skyline.'
    ],
    amenities: [
      'Private 80ft Deepwater Yacht Dock',
      'Direct Biscayne Bay Open Water Access',
      '60-Foot Saltwater Heated Lap Pool',
      'Summer Kitchen & Covered Dining Loggia',
      'Smart Hurricane Impact Resistance System',
      'Sub-Zero & Wolf Kitchen Suite',
      'Security Camera & Guard Gate Proximity'
    ],
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85'
    ],
    agentId: 'agent-2',
    coordinates: { lat: 25.8175, lng: -80.1362 },
    nearbyPoints: [
      { name: 'Biscayne Bay Open Water', distance: 'Direct Dock', type: 'Marine' },
      { name: 'Faena District & Beach Club', distance: '5 min', type: 'Hospitality' },
      { name: 'Miami Design District', distance: '10 min', type: 'Culture' },
      { name: 'Miami International Airport (MIA)', distance: '18 min', type: 'Aviation' }
    ]
  },
  {
    id: 'prop-ocean-crest',
    slug: 'ocean-crest',
    title: 'Ocean Crest',
    subtitle: 'Blufftop modern villa overlooking Point Dume and crashing Pacific surf',
    location: 'Malibu',
    neighborhood: 'Malibu, California',
    address: '28912 Cliffside Drive, Malibu, CA 90265',
    price: '$12,800,000',
    priceNumeric: 12800000,
    pricePeriod: 'sale',
    status: 'For Sale',
    type: 'Luxury Residence',
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 5900,
    parkingSpaces: 4,
    yearBuilt: 2024,
    featured: false,
    furnishedStatus: 'Furnished',
    description: 'A discreet modern estate perched atop Point Dume bluffs, featuring deeded beach key privileges, zero-edge pool overlooking dolphin pods, and warm cedar cladding.',
    longDescription: [
      'Set behind tall privacy hedges on premier Cliffside Drive, Ocean Crest offers private deeded access to Little Dume Beach—one of California’s most exclusive surf breaks.',
      'The residence embraces indoor-outdoor living with seamless limestone terraces, an open chef’s kitchen, temperature-controlled cellar, and private detached guest pavilion.'
    ],
    amenities: [
      'Deeded Little Dume Private Beach Key',
      'Oceanfront Horizon Pool & Spa',
      'Detached Private Guest House',
      'Outdoor Dining Pavilion with Pizza Hearth',
      'Solar Battery Whole-Property Resilience',
      '3-Car Enclosed Garage'
    ],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
    ],
    agentId: 'agent-3',
    coordinates: { lat: 34.0049, lng: -118.8042 },
    nearbyPoints: [
      { name: 'Little Dume Beach', distance: 'Private Gate Access', type: 'Beach' },
      { name: 'Point Dume Natural Reserve', distance: '4 min walk', type: 'Scenic' },
      { name: 'Nobu Malibu', distance: '10 min', type: 'Dining' }
    ]
  },
  {
    id: 'prop-central-park-penthouse',
    slug: 'central-park-penthouse',
    title: 'Central Park Penthouse',
    subtitle: 'Duplex crown crowning Central Park South with wraparound terrace',
    location: 'New York',
    neighborhood: 'Manhattan, New York',
    address: '220 Central Park South, New York, NY 10019',
    price: '$9,750,000',
    priceNumeric: 9750000,
    pricePeriod: 'sale',
    status: 'For Sale',
    type: 'Penthouse',
    bedrooms: 4,
    bathrooms: 5,
    areaSqFt: 5100,
    parkingSpaces: 2,
    yearBuilt: 2024,
    featured: true,
    furnishedStatus: 'Furnished',
    description: 'An imperial duplex penthouse commanding direct, unobstructed panoramic views across the full expanse of Central Park. Designed with limestone fireplaces and double-height gallery salon.',
    longDescription: [
      'Hovering majestically above the tree canopy of Central Park, this signature duplex penthouse is an irreproducible jewel on Billionaires’ Row.',
      'Boasting custom Thierry Despont millwork, a grand curved bronze staircase, and a 1,200 sq ft private outdoor loggia looking directly north across the park reservoir.'
    ],
    amenities: [
      'Unobstructed Direct Central Park Vistas',
      '1,200 Sq Ft Private Stone Loggia',
      'White-Glove Private Dining Club',
      'Private Motor Court Porte-Cochere',
      'Indoor Saltwater Pool & Squash Court',
      'Separate Staff Studio Suite Included'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85'
    ],
    agentId: 'agent-1',
    coordinates: { lat: 40.7667, lng: -73.9806 },
    nearbyPoints: [
      { name: 'Central Park South Gates', distance: 'Across Street', type: 'Park' },
      { name: 'Bergdorf Goodman & Fifth Ave', distance: '4 min walk', type: 'Shopping' },
      { name: 'Per Se & Jean-Georges', distance: '3 min walk', type: 'Dining' }
    ]
  },
  {
    id: 'prop-aspen-sanctuary',
    slug: 'red-mountain-sanctuary',
    title: 'Red Mountain Sanctuary',
    subtitle: 'Trophy alpine compound overlooking Aspen Mountain and Roaring Fork Valley',
    location: 'Aspen',
    neighborhood: 'Aspen, Colorado',
    address: '720 Red Mountain Road, Aspen, CO 81611',
    price: '$16,400,000',
    priceNumeric: 16400000,
    pricePeriod: 'sale',
    status: 'For Sale',
    type: 'Luxury Residence',
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 7200,
    parkingSpaces: 3,
    yearBuilt: 2024,
    featured: true,
    furnishedStatus: 'Furnished',
    description: 'Nestled on the lower slopes of Red Mountain, this timber-and-granite residence showcases wall-to-wall glass framing the iconic pyramid peak of Aspen Mountain.',
    longDescription: [
      'Constructed from reclaimed Colorado fir, native river granite, and black steel, Red Mountain Sanctuary represents the ultimate modern alpine compound.',
      'Features include an oxygen-regulated primary suite, heated outdoor stone terrace with fire hearth, ski tuning atelier, and private elevator.'
    ],
    amenities: [
      'Direct Aspen Mountain Panoramic Views',
      'Oxygen-Enriched Master Sleeping Suite',
      'Heated Stone Driveway & Terrace',
      'Commercial Grade Ski Room & Boot Warmers',
      'Heated Outdoor Jacuzzi Grotto',
      'Custom Temperature-Controlled Wine Vault'
    ],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
    ],
    agentId: 'agent-4',
    coordinates: { lat: 39.1989, lng: -106.8242 },
    nearbyPoints: [
      { name: 'Aspen Mountain Silver Queen Gondola', distance: '5 min', type: 'Skiing' },
      { name: 'Downtown Core Fine Dining & Galleries', distance: '4 min', type: 'Social' },
      { name: 'Aspen Airport (ASE) Private Terminal', distance: '12 min', type: 'Aviation' }
    ]
  },
  {
    id: 'prop-park-avenue',
    slug: 'park-avenue-residence',
    title: 'Park Avenue Residence',
    subtitle: 'Classic pre-war residence restored with bespoke French limestone and herringbone floors',
    location: 'New York',
    neighborhood: 'Manhattan, New York',
    address: '740 Park Avenue, Upper East Side, New York, NY 10021',
    price: '$7,950,000',
    priceNumeric: 7950000,
    pricePeriod: 'sale',
    status: 'For Sale',
    type: 'City Apartment',
    bedrooms: 4,
    bathrooms: 4,
    areaSqFt: 4100,
    parkingSpaces: 1,
    yearBuilt: 2023,
    featured: false,
    furnishedStatus: 'Furnished',
    description: 'An elegant Park Avenue home retaining Rosario Candela pre-war architectural grandeur alongside modern acoustic glass, concealed smart HVAC, and Smallbone of Devizes kitchen.',
    longDescription: [
      'Situated within one of Park Avenue’s most storied cooperative buildings, this high-floor residence offers triple Park Avenue frontage.',
      'The formal library is clad in hand-rubbed French walnut, complemented by wood-burning fireplaces, staff quarters, and soaring ten-foot-six ceilings.'
    ],
    amenities: [
      'Wood-Burning Hand-Carved Marble Fireplaces',
      'Full-Time Doormen & Elevator Operators',
      'Smallbone of Devizes Handcrafted Kitchen',
      'Dedicated Basement Wine Storage',
      'Private Fitness Center in Building'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85'
    ],
    agentId: 'agent-1',
    coordinates: { lat: 40.7712, lng: -73.9647 },
    nearbyPoints: [
      { name: 'Central Park Conservatory Water', distance: '2 blocks', type: 'Park' },
      { name: 'The Carlyle Hotel', distance: '4 min walk', type: 'Hospitality' },
      { name: 'The Met Museum', distance: '8 min walk', type: 'Culture' }
    ]
  },
  {
    id: 'prop-oceanfront-rental',
    slug: 'oceanfront-penthouse-miami',
    title: 'Oceanfront Penthouse',
    subtitle: 'Sky mansion suspended over South Beach with 360-degree Atlantic and city views',
    location: 'Miami',
    neighborhood: 'Miami Beach, Florida',
    address: '321 Ocean Drive, South of Fifth, Miami Beach, FL 33139',
    price: '$48,000 / mo',
    priceNumeric: 48000,
    pricePeriod: 'month',
    status: 'For Rent',
    type: 'Penthouse',
    bedrooms: 3,
    bathrooms: 3.5,
    areaSqFt: 3850,
    parkingSpaces: 2,
    yearBuilt: 2024,
    featured: false,
    furnishedStatus: 'Furnished',
    description: 'An executive penthouse rental in South of Fifth. Features private rooftop plunge pool, designer Poliform furnishings, and hotel-caliber concierge services.',
    longDescription: [
      'Available for discerning long-term luxury lease, this South of Fifth sky estate combines oceanfront serenity with effortless dining access to Joe’s Stone Crab and Carbone.',
      'Fully turnkey with custom Italian furnishings, Poggenpohl kitchen, smart shades, and continuous ocean breezes.'
    ],
    amenities: [
      'Private Rooftop Plunge Pool & Sun Deck',
      'Direct Private Beachfront Access',
      'Turnkey Poliform Designer Furnishings',
      '2 Dedicated Valet Parking Spaces',
      'Sommelier & Private Chef Coordination'
    ],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
    ],
    agentId: 'agent-2',
    coordinates: { lat: 25.7728, lng: -80.1311 },
    nearbyPoints: [
      { name: 'South Pointe Park Pier', distance: '3 min walk', type: 'Park' },
      { name: 'Carbone Miami & Prime 112', distance: '2 min walk', type: 'Dining' },
      { name: 'Miami Beach Marina', distance: '4 min', type: 'Marine' }
    ]
  }
];
