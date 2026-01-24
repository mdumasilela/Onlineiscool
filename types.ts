
import React from 'react';

export interface Tutor {
  name: string;
  title: string;
  credentials: string[];
  imageUrl: string;
  bio: string;
  moreInfoUrl?: string;
}

export interface PricingPackage {
  title: string;
  price: number;
  features: string[];
  highlight?: boolean;
}

export interface FeatureInfo {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  relation: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export enum MarketingCopyType {
  FACEBOOK_POST = 'Facebook Post',
  TIKTOK_SCRIPT = 'TikTok Script',
  EMAIL_TO_PARENTS = 'Email to Parents',
  SHORT_AD_COPY = 'Short Ad Copy',
  ONBOARDING_EMAIL = 'Onboarding Request Email',
}

export type MathTopic = 'Algebra' | 'Functions' | 'Trigonometry' | 'Geometry' | 'Probability';

export interface DiagnosticQuestion {
  id: number;
  topic: MathTopic;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface TopicResult {
  topic: MathTopic;
  score: number;
  total: number;
}

export type LeadStatus = 'New' | 'Info Requested' | 'Call Scheduled' | 'Follow-up Needed' | 'Enrolled';

export interface Lead {
  id: string;
  parentName: string;
  studentName: string;
  email: string;
  phone: string;
  grade: string;
  package: string;
  status: LeadStatus;
  dateJoined: string;
}

export interface Student extends Lead {
  paymentStatus: 'Paid' | 'Pending' | 'Overdue';
  lastAttendance: string;
  zoomLink: string;
}

export interface ClassSession {
  id: string;
  grade: string;
  day: 'Monday' | 'Saturday' | 'Workshop';
  time: string;
  topic: string;
  tutor: string;
}
