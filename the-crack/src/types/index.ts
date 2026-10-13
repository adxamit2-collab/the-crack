export interface Property {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  neighborhood: string;
  address: string;
  price: string;
  priceNumeric: number; // For filtering/sorting in USD raw numeric value
  pricePeriod: 'sale' | 'month';
  status: 'For Sale' | 'For Rent' | 'Under Offer';
  type: 'Luxury Residence' | 'City Apartment' | 'Family Home' | 'Penthouse' | 'Investment Property';
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  parkingSpaces: number;
  yearBuilt: number;
  furnishedStatus: 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
  featured: boolean;
  description: string;
  longDescription: string[];
  amenities: string[];
  images: string[];
  agentId: string;
  coordinates: { lat: number; lng: number };
  nearbyPoints: { name: string; distance: string; type: string }[];
}

export interface Agent {
  id: string;
  slug: string;
  name: string;
  title: string;
  role: string;
  image: string;
  phone: string;
  email: string;
  bio: string;
  specialties: string[];
  locations: string[];
  languages: string[];
  experienceYears: number;
  salesVolume?: string;
  social: {
    instagram?: string;
    linkedin?: string;
  };
}

export interface LocationItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  heroImage: string;
  propertyCount: number;
  avgPriceRange: string;
  lifestyleHighlights: string[];
  architectureNotes: string;
  popularSpots: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: 'Market' | 'Architecture' | 'Investment' | 'Lifestyle' | 'Guides';
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  heroImage: string;
  excerpt: string;
  content: string[];
}

export interface ViewingBooking {
  propertyId: string;
  propertyTitle: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  agentId?: string;
}

export interface LeadSubmission {
  name: string;
  email: string;
  phone: string;
  interest: string;
  location: string;
  budget: string;
  message: string;
}

export interface ValuationRequest {
  address: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  name: string;
  email: string;
  phone: string;
}

export interface PropertySubmission {
  ownerName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  propertyType: string;
  listingType: 'Sale' | 'Rent';
  expectedPrice: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  images: string[];
}
