import React from 'react';

export interface Tutor {
  name: string;
  title: string;
  credentials: string[];
  imageUrl: string;
  bio: string;
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

// FIX: Define and export the MarketingCopyType enum to be used for the AI marketing generator.
export enum MarketingCopyType {
  FACEBOOK_POST = 'Facebook Post',
  TIKTOK_SCRIPT = 'TikTok Script',
  EMAIL_TO_PARENTS = 'Email to Parents',
  SHORT_AD_COPY = 'Short Ad Copy',
}