
import React from 'react';
import { Tutor, PricingPackage, FeatureInfo, Testimonial, FAQItem, DiagnosticQuestion, Lead } from './types';

export const TUTORS: Tutor[] = [
  {
    name: 'Mbali Mashiyane CA(SA)',
    title: 'Managing Director',
    credentials: ['Bachelor of Accounting, University of Johannesburg', 'Postgraduate Diploma in Accounting, Milpark Education'],
    imageUrl: 'https://picsum.photos/seed/mbali/400/400',
    bio: "As the driving force behind ONLINE S'COOL, Mbali combines her expertise as a Chartered Accountant with a passion for empowering students to achieve academic excellence."
  },
  {
    name: 'Mduduzi Masilela',
    title: 'Director, Course Co-ordinator & Tutor',
    credentials: ['Bcom Actuarial Science, University of Cape Town', 'Technical Member of Actuarial Society of South Africa'],
    imageUrl: 'https://picsum.photos/seed/mduduzi/400/400',
    bio: "A near-qualified Actuary from UCT, Mduduzi is the architect of our curriculum. He excels at breaking down complex mathematical concepts into understandable lessons."
  },
  {
    name: 'Lawrence Mashiane',
    title: 'Tutor',
    credentials: ['Bcom Actuarial Science, University of Cape Town', 'Student Member of Actuarial Society of South Africa'],
    imageUrl: 'https://picsum.photos/seed/lawrence/400/400',
    bio: "Currently on his own actuarial science journey, Lawrence connects with students on their level, bringing fresh energy and relatable teaching methods to every session."
  }
];

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    title: 'Online Classes',
    price: 500, // 50% of R1000
    features: [
      'Back to School Offer: 50% OFF (Usually R1000)',
      'GDE & IEB Syllabus Coverage',
      '2 x 2-hour lessons per week',
      'Wednesday evenings & Sunday mornings',
      'Personalized study materials',
      'Access to recorded lessons'
    ]
  },
  {
    title: 'Online Classes + Workshop',
    price: 650, // 50% of R1300
    features: [
      'Back to School Offer: 50% OFF (Usually R1300)',
      'Full GDE & IEB Support',
      'All Online Classes features',
      'Monthly 4-hour in-person workshop',
      'Location: Rosebank/Sandton area (JHB)',
      'Must be able to travel to venue'
    ],
    highlight: true
  }
];

export const FEATURES: FeatureInfo[] = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 10v-1m0 0c-1.657 0-3-.895-3-2s1.343-2 3-2 3-.895 3-2-1.343-2-3-2m0 8c-1.11 0-2.08-.402-2.599-1M12 16v1" /></svg>,
    title: 'Affordable Pricing',
    description: 'At just R62.50 per hour, our highly competitive rates make top-tier tutoring accessible to a wider audience.'
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>,
    title: 'Expert & Qualified Tutors',
    description: 'Our team consists of top mathematics achievers and graduates from the University of Cape Town, ensuring high-quality teaching.'
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    title: 'GDE & IEB Focused',
    description: 'Comprehensive coverage of both the Department of Education (GDE) and Independent Examinations Board (IEB) curricula.'
  },
   {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    title: 'Elite Academic Quality',
    description: 'We prioritize excellence through rigorous tutor selection and a methodology that transforms struggling students into top achievers.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
    {
        quote: "The progress my son has made since joining ONLINE S'COOL is remarkable. The tutors are knowledgeable and incredibly patient. His confidence in math has soared, and his grades reflect it. Highly recommended!",
        name: 'Thabo M.',
        relation: 'Parent of a Grade 12 Student'
    },
    {
        quote: "I used to dread math class, but the sessions here are actually fun and make sense. The workshop was a game-changer for me, helping me tackle the toughest problems for my final exams.",
        name: 'Anika P.',
        relation: 'Grade 12 Student'
    },
    {
        quote: "A fantastic and affordable service. The school-like structure provides consistency that you don't get from other platforms. The team is professional and truly cares about the students' success.",
        name: 'Sarah J.',
        relation: 'Parent of a Grade 11 Student'
    }
];

export const FAQS: FAQItem[] = [
    {
        question: "What grades and subjects do you currently offer?",
        answer: "We specialize in mathematics for Grade 10, Grade 11, and Grade 12 students. We cover both the GDE and IEB syllabuses. We are planning to expand to include other subjects like Physics, IT, and Accounting in the future."
    },
    {
        question: "How are the online classes conducted?",
        answer: "Our lessons are conducted live on Microsoft Teams. We use iPads and Apple Pencils to create an interactive and engaging digital whiteboard experience. All sessions are recorded, so students can review them anytime."
    },
    {
        question: "What is the Back to School Offer?",
        answer: "We are offering a massive 50% discount on all our monthly packages if you sign up before 1 March 2026! This is our way of helping students kickstart their academic year with the best support."
    },
    {
        question: "Where do the in-person workshops take place?",
        answer: "The monthly 4-hour workshops are held in the Rosebank/Sandton area of Johannesburg. Please ensure you are able to travel to this area if you choose the Workshop package."
    },
    {
        question: "How is ONLINE S'COOL different from other tutoring platforms?",
        answer: "We differentiate ourselves through our holistic, school-like structure with consistent, in-house tutors (not freelancers), and a focus on both GDE and IEB curricula. Our competitive pricing and unwavering commitment to high-calibre, university-standard instruction also set us apart."
    }
];

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    topic: 'Algebra',
    question: "Solve for x in the equation: 2x² - 5x - 3 = 0",
    options: ["x = 3 or x = -1/2", "x = -3 or x = 1/2", "x = 2 or x = 3/2", "x = 1 or x = 6"],
    correctAnswer: 0
  },
  {
    id: 2,
    topic: 'Algebra',
    question: "Which of the following simplifies 3^(x+2) / 3^x?",
    options: ["3", "6", "9", "3x"],
    correctAnswer: 2
  },
  {
    id: 3,
    topic: 'Functions',
    question: "Find the turning point of the parabola defined by f(x) = (x-2)² + 5",
    options: ["(-2, 5)", "(2, 5)", "(2, -5)", "(5, 2)"],
    correctAnswer: 1
  },
  {
    id: 4,
    topic: 'Functions',
    question: "If f(x) = 2x + 3, what is the inverse function f⁻¹(x)?",
    options: ["f⁻¹(x) = (x-3)/2", "f⁻¹(x) = x/2 - 3", "f⁻¹(x) = 2x - 3", "f⁻¹(x) = 3x + 2"],
    correctAnswer: 0
  },
  {
    id: 5,
    topic: 'Trigonometry',
    question: "Simplify: sin²θ + cos²θ",
    options: ["0", "tan²θ", "2", "1"],
    correctAnswer: 3
  },
  {
    id: 6,
    topic: 'Trigonometry',
    question: "In which quadrants is sinθ negative?",
    options: ["1 and 2", "2 and 3", "3 and 4", "1 and 4"],
    correctAnswer: 2
  },
  {
    id: 7,
    topic: 'Geometry',
    question: "A line passing through (1, 2) and (3, 6) has what gradient?",
    options: ["1/2", "2", "3", "4"],
    correctAnswer: 1
  },
  {
    id: 8,
    topic: 'Geometry',
    question: "In Euclidean geometry, the angle at the center of a circle is ___ the angle at the circumference subtended by the same arc.",
    options: ["equal to", "half of", "twice", "unrelated to"],
    correctAnswer: 2
  },
  {
    id: 9,
    topic: 'Probability',
    question: "If P(A) = 0.4 and P(B) = 0.3, and A and B are independent, what is P(A and B)?",
    options: ["0.7", "0.1", "0.12", "0.5"],
    correctAnswer: 2
  },
  {
    id: 10,
    topic: 'Probability',
    question: "What is the median of the data set: 2, 5, 8, 10, 12?",
    options: ["5", "8", "10", "7.4"],
    correctAnswer: 1
  }
];

export const SAMPLE_LEADS: Lead[] = [
  {
    id: '1',
    parentName: 'Lerato Kganyago',
    studentName: 'Buhle Kganyago',
    email: 'lerato@example.com',
    phone: '082 111 2222',
    grade: 'Grade 11',
    package: 'Online + Workshop',
    status: 'New',
    dateJoined: '2025-05-10T10:30:00Z'
  },
  {
    id: '2',
    parentName: 'Johan Smith',
    studentName: 'Pieter Smith',
    email: 'johan.s@example.com',
    phone: '011 345 6789',
    grade: 'Grade 12',
    package: 'Online Classes',
    status: 'Info Requested',
    dateJoined: '2025-05-09T14:15:00Z'
  },
  {
    id: '3',
    parentName: 'Zanele Mthembu',
    studentName: 'Sipho Mthembu',
    email: 'z.mthembu@example.com',
    phone: '071 999 8888',
    grade: 'Grade 10',
    package: 'Online + Workshop',
    status: 'Call Scheduled',
    dateJoined: '2025-05-08T09:00:00Z'
  }
];
