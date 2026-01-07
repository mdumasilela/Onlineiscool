
import React from 'react';
import { Tutor, PricingPackage, FeatureInfo, Testimonial, FAQItem } from './types';

export const TUTORS: Tutor[] = [
  {
    name: 'Mbali Mashiyane CA(SA)',
    title: 'Managing Director',
    credentials: ['Bachelor of Accounting, University of Johannesburg', 'Postgraduate Diploma in Accounting, Milpark Education'],
    imageUrl: 'https://picsum.photos/seed/mbali/400/400',
    bio: "Mbali combines her expertise as a Chartered Accountant with a passion for empowering students."
  },
  {
    name: 'Mduduzi Masilela',
    title: 'Director & Tutor',
    credentials: ['Bcom Actuarial Science, University of Cape Town'],
    imageUrl: 'https://picsum.photos/seed/mduduzi/400/400',
    bio: "A near-qualified Actuary from UCT, Mduduzi excels at breaking down complex DBE Math concepts."
  },
  {
    name: 'Lawrence Mashiane',
    title: 'Tutor',
    credentials: ['Bcom Actuarial Science, University of Cape Town'],
    imageUrl: 'https://picsum.photos/seed/lawrence/400/400',
    bio: "Lawrence brings fresh energy and relatable teaching methods to every session."
  }
];

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    title: 'Online Classes',
    price: 500,
    features: [
      '50% OFF (Usually R1000)',
      'Full DBE Syllabus Coverage',
      '2 x 2-hour lessons per week',
      'Personalized study materials',
      'Access to recorded lessons'
    ]
  },
  {
    title: 'Online Classes + Workshop',
    price: 650,
    features: [
      '50% OFF (Usually R1300)',
      'Full DBE Syllabus Coverage',
      'Monthly 4-hour in-person workshop',
      'Location: Rosebank/Sandton area',
      'Exclusive exam-prep materials'
    ],
    highlight: true
  }
];

export const FEATURES: FeatureInfo[] = [
  {
    icon: <svg className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: 'DBE Focused',
    description: 'Specialized support for the Department of Basic Education curriculum Grade 10-12.'
  },
  {
    icon: <svg className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" /></svg>,
    title: 'Affordable Rates',
    description: 'At R62.50/hour, top-tier tutoring is finally accessible to everyone.'
  },
  {
    icon: <svg className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479" /></svg>,
    title: 'Expert Tutors',
    description: 'Our team consists of UCT graduates and top actuarial science students.'
  },
  {
    icon: <svg className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" /></svg>,
    title: 'Proven Results',
    description: 'We turn confusion into confidence with our consistent school-like structure.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
    {
        quote: "The progress my son has made with the DBE syllabus is remarkable. His confidence has soared.",
        name: 'Thabo M.',
        relation: 'Parent of a Grade 12 Student'
    },
    {
        quote: "I used to dread math, but these sessions make sense. The workshops are a game-changer.",
        name: 'Anika P.',
        relation: 'Grade 12 Student'
    }
];

export const FAQS: FAQItem[] = [
    {
        question: "What grades do you cover?",
        answer: "We specialize in Mathematics for Grade 10, 11, and 12 following the DBE curriculum."
    },
    {
        question: "How are classes conducted?",
        answer: "Live via Microsoft Teams with interactive digital whiteboards. All sessions are recorded."
    }
];
