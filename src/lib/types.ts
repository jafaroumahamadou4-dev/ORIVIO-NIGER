export type OpportunityCategory = 'Employment' | 'Internship' | 'Scholarships' | 'Entrepreneurship' | 'Formations' | 'Autres';

// Represents the data structure within a Firestore document
export interface OpportunityData {
  title: string;
  company: string;
  category: OpportunityCategory;
  location: string;
  description: string;
  imageUrl: string;
  applyLink: string;
  closingDate: any; // Can be string or Firestore Timestamp
  requirements: string[];
  createdAt?: any;
  status: 'pending' | 'approved' | 'rejected';
}

// Represents the data structure used in the application, including the document ID
export interface Opportunity extends OpportunityData {
  id: string;
}

export interface PartnerData {
  partnerName: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
}

export interface Partner extends PartnerData {
  id: string;
}

export interface AdministratorData {
  name: string;
  role: string;
  imageUrl: string;
  displayOrder: number;
}

export interface Administrator extends AdministratorData {
  id: string;
}

export interface NewsArticleData {
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  date: any; // Firestore Timestamp
}

export interface NewsArticle extends NewsArticleData {
  id: string;
}


export interface TestimonialData {
  name: string;
  role: string;
  testimony: string;
  imageUrl: string;
  language: 'en' | 'fr';
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: any;
  page?: 'home' | 'orientation';
}

export interface Testimonial extends TestimonialData {
  id: string;
}

    