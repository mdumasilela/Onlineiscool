import React from 'react';
import { Tutor, PricingPackage, FeatureInfo, Testimonial, FAQItem, DiagnosticQuestion, Lead, Student, ClassSession } from './types';

export const TUTORS: Tutor[] = [
  {
    name: 'Mbali Mashiyane CA(SA)',
    title: 'Tutor',
    credentials: ['Bachelor of Accounting, University of Johannesburg', 'Postgraduate Diploma in Accounting, Milpark Education'],
    imageUrl: 'https://picsum.photos/seed/mbali/400/400',
    bio: "As the driving force behind ONLINE S'COOL, Mbali combines her expertise as a Chartered Accountant with a passion for empowering students to achieve academic excellence."
  },
  {
    name: 'Mduduzi Masilela',
    title: 'Course Co-ordinator & Tutor',
    credentials: ['Bcom Actuarial Science, University of Cape Town', 'Technical Member of Actuarial Society of South Africa'],
    imageUrl: 'https://picsum.photos/seed/mduduzi/400/400',
    bio: "A near-qualified Actuary from UCT, Mduduzi is the architect of our curriculum. He excels at breaking down complex mathematical concepts into understandable lessons.",
    moreInfoUrl: 'https://enke.co.za/mduduzi-extra-lessons-aficionado/'
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
    price: 750,
    features: [
      'Back to School Offer: 25% OFF (Usually R1000)',
      'Sign up before 31 August 2026 (2026 Intake)',
      'DBE & IEB Syllabus Coverage',
      '2 x 2-hour lessons per week',
      'Weekly 1-hour Q&A support session',
      'Access to recorded lessons'
    ],
    highlight: true 
  },
  {
    title: 'One-on-One Tutoring',
    price: 2500,
    features: [
      'Personalised 1:1 online sessions',
      'Flexible scheduling to suit the student',
      'Tailored curriculum focusing on weak topics',
      'Weekly personalised progress report',
      'Direct access to your tutor for quick questions'
    ],
    highlight: false
  }
];

export const FEATURES: FeatureInfo[] = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strok[...]
    title: 'Affordable Pricing',
    description: 'At just R62.50 per hour, our highly competitive rates make top-tier tutoring accessible to a wider audience.'
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16[...]
    title: 'Expert & Qualified Tutors',
    description: 'Our team consists of top mathematics achievers and graduates from the University of Cape Town, ensuring high-quality teaching.'
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strok[...]
    title: 'DBE & IEB Focused',
    description: 'Comprehensive coverage of both the Department of Basic Education (DBE) and Independent Examinations Board (IEB) curricula.'
  },
   {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strok[...]
    title: 'Personalised Q&A Sessions',
    description: 'Weekly sessions where students can bring specific challenges from their own schools for expert guidance.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
    {
        quote: "The progress my son has made since joining ONLINE S'COOL is remarkable. The tutors are knowledgeable and incredibly patient. His confidence in math has soared, and his grades refle[...]
        name: 'Thabo M.',
        relation: 'Parent of a Grade 12 Student'
    },
    {
        quote: "I used to dread math class, but the sessions here are actually fun and make sense. The online platform is seamless.",
        name: 'Anika P.',
        relation: 'Grade 12 Student'
    },
    {
        quote: "A fantastic and affordable service. The school-like structure provides consistency that you don't get from other platforms. The team is professional and truly cares about the stude[...]
        name: 'Sarah J.',
        relation: 'Parent of a Grade 11 Student'
    }
];

export const FAQS: FAQItem[] = [
    {
        question: "When do classes officially start for 2026?",
        answer: "Our 2026 academic year officially commences on Monday, 26 January 2026. We recommend enrolling early to ensure all onboarding is complete before the first session."
    },
    {
        question: "What is the 1-hour weekly Q&A session?",
        answer: "This is a dedicated time every week for students to bring any mathematical questions they have or specific challenges they've faced in their school lessons recently. It ensures t[...]
    },
    {
        question: "What grades and subjects do you currently offer?",
        answer: "We specialise in mathematics for Grade 10, Grade 11 and Grade 12 students. We cover both the DBE and IEB syllabuses."
    },
    {
        question: "How are the online classes conducted?",
        answer: "Our lessons are conducted live on Zoom. We provide a highly interactive and engaging digital experience. All sessions are recorded, so students can review them anytime."
    },
    {
        question: "What is the Back to School Offer?",
        answer: "We are offering a massive 25% discount on all our monthly packages if you sign up before 31 August 2026! This is our way of helping students kickstart their 2026 academic year wit[...]
    },
    {
        question: "Why do you only take new learners at the start of the year?",
        answer: "At ONLINE S'COOL, we believe mathematics is a language of logic that requires time to master. By starting at the beginning of the academic year, we have the necessary 'runway' to[...]
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
    question: "In Euclidean geometry, the angle at the centre of a circle is ___ the angle at the circumference subtended by the same arc.",
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
    package: 'One-on-One Tutoring',
    status: 'New',
    dateJoined: '2026-07-31T10:30:00Z'
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
    dateJoined: '2026-07-30T14:15:00Z'
  }
];

export const SAMPLE_STUDENTS: Student[] = [
  {
    id: 's1',
    parentName: 'Thabo Mokoena',
    studentName: 'Kabelo Mokoena',
    email: 'thabo@mokoena.co.za',
    phone: '071 222 3333',
    grade: 'Grade 12',
    package: 'Online Classes',
    status: 'Enrolled',
    dateJoined: '2025-01-05T08:00:00Z',
    paymentStatus: 'Paid',
    lastAttendance: '2025-05-07',
    zoomLink: 'https://zoom.us/j/grade12'
  },
  {
    id: 's2',
    parentName: 'Zanele Ndlovu',
    studentName: 'Sizwe Ndlovu',
    email: 'zanele@ndlovu.net',
    phone: '082 555 6666',
    grade: 'Grade 11',
    package: 'Online Classes',
    status: 'Enrolled',
    dateJoined: '2025-01-15T12:00:00Z',
    paymentStatus: 'Overdue',
    lastAttendance: '2025-05-07',
    zoomLink: 'https://zoom.us/j/grade11'
  }
];

export const CLASS_SCHEDULE: any[] = [
  { id: 'c1', grade: 'Grade 12', day: 'Monday', time: '18:00 - 20:00', topic: 'Calculus - Limits & Continuity', tutor: 'Mduduzi Masilela' },
  { id: 'c2', grade: 'Grade 11', day: 'Monday', time: '18:00 - 20:00', topic: 'Functions - Parabola & Hyperbola', tutor: 'Lawrence Mashiane' },
  { id: 'c3', grade: 'Grade 10', day: 'Monday', time: '18:00 - 20:00', topic: 'Algebra - Factorisation', tutor: 'Mbali Mashiyane' },
  { id: 'q1', grade: 'All Grades', day: 'Saturday', time: '08:00 - 09:00', topic: 'Live Q&A: Bring Your School Questions', tutor: 'Mduduzi Masilela' },
  { id: 'c4', grade: 'All Grades', day: 'Saturday', time: '09:00 - 11:00', topic: 'Exam Preparation & Q&A Rotation', tutor: 'Rotation' }
];
