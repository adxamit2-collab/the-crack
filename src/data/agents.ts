import { Agent } from '../types';

export const agents: Agent[] = [
  {
    id: 'agent-1',
    slug: 'alexander-reed',
    name: 'Alexander Reed',
    title: 'Senior Property Advisor',
    role: 'Managing Director, New York',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    phone: '+1 (212) 555-0198',
    email: 'alexander.reed@veraestates.com',
    bio: 'With over sixteen years advising family offices, private equity principals, and international collectors in Manhattan and the Hamptons, Alexander specializes in off-market penthouses, historic limestone townhouses, and trophy residential assets.',
    specialties: ['Manhattan Penthouses', 'Limestone Townhouses', 'Private Trusts'],
    locations: ['New York', 'Manhattan', 'The Hamptons'],
    languages: ['English', 'French'],
    experienceYears: 16,
    salesVolume: '$420M+ Career Volume',
    social: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    id: 'agent-2',
    slug: 'maya-laurent',
    name: 'Maya Laurent',
    title: 'Luxury Property Advisor',
    role: 'Director of Coastal Residences, Miami',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    phone: '+1 (305) 555-0142',
    email: 'maya.laurent@veraestates.com',
    bio: 'A former architectural curator with an honors degree from Rhode Island School of Design, Maya guides discerning buyers through waterfront sanctuaries across Miami Beach, Star Island, and Palm Beach with an eye for sculptural elegance and climate durability.',
    specialties: ['Waterfront Architecture', 'Oceanfront Penthouses', 'Island Enclaves'],
    locations: ['Miami', 'Miami Beach', 'Palm Beach'],
    languages: ['English', 'Spanish', 'French'],
    experienceYears: 12,
    salesVolume: '$310M+ Career Volume',
    social: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    id: 'agent-3',
    slug: 'daniel-brooks',
    name: 'Daniel Brooks',
    title: 'Estate Specialist',
    role: 'Principal, West Coast Holdings',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    phone: '+1 (310) 555-0184',
    email: 'daniel.brooks@veraestates.com',
    bio: 'Daniel represents entertainment executives, founders, and private individuals acquiring gated acreage and landmark mid-century modern residences throughout Beverly Hills, Bel Air, and Malibu.',
    specialties: ['Architectural Estates', 'Mid-Century Moderns', 'Malibu Coastline'],
    locations: ['Los Angeles', 'Beverly Hills', 'Malibu'],
    languages: ['English'],
    experienceYears: 14,
    salesVolume: '$510M+ Career Volume',
    social: {
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: 'agent-4',
    slug: 'elena-rostova',
    name: 'Elena Rostova',
    title: 'Alpine & Private Holdings Lead',
    role: 'Senior Advisor, Mountain & Sanctuary Estates',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    phone: '+1 (970) 555-0129',
    email: 'elena.rostova@veraestates.com',
    bio: 'Specializing in trophy alpine compounds and secluded sporting ranches across Aspen and the Roaring Fork Valley, Elena orchestrates discrete acquisitions with utmost privacy and speed.',
    specialties: ['Ski-In/Ski-Out Estates', 'Red Mountain Compounds', 'Private Ranches'],
    locations: ['Aspen', 'The Hamptons', 'New York'],
    languages: ['English', 'German'],
    experienceYears: 11,
    salesVolume: '$280M+ Career Volume',
    social: {
      instagram: 'https://instagram.com'
    }
  }
];
