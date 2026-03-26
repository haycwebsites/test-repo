// =============================================================================
// Site Template Configuration
// =============================================================================
// All site content is configured here. Components render nothing when their
// primary config fields are empty strings or empty arrays.
//
// STRUCTURE RULE: All interfaces must come first, then all export consts.
// This is required for the pull-config script to work correctly.
// =============================================================================

// =============================================================================
// INTERFACES
// =============================================================================

export interface LocaleString {
  el: string;
  en: string;
}

export interface SiteConfig {
  title: LocaleString;
  description: LocaleString;
  language: string;
  keywords: LocaleString;
  ogImage: string;
  canonical: string;
  siteId: string;
  apiUrl: string;
}

export interface NavLink {
  path: string;
  label: LocaleString;
}

export interface NavigationConfig {
  brandName: LocaleString;
  bookViewingLink: LocaleString;
  menuButton: LocaleString;
  closeButton: LocaleString;
  navLinks: NavLink[];
}

export interface HeroConfig {
  heroImage: string;
  heroImageAlt: LocaleString;
  mainTitle: LocaleString;
  subtitle: LocaleString;
  requestTourButton: LocaleString;
  viewAvailabilityButton: LocaleString;
  availabilityLabel: LocaleString;
}

export interface AvailabilityConfig {
  image: string;
  imageAlt: LocaleString;
  title: LocaleString;
  description: LocaleString;
  pricingLink: LocaleString;
  moveInLabel: LocaleString;
  moveInValue: LocaleString;
}

export interface RoomConfig {
  image: string;
  imageAlt: LocaleString;
  title: LocaleString;
  description: LocaleString;
  linkText: LocaleString;
  tagline: LocaleString;
}

export interface AmenityItem {
  icon: string;
  label: LocaleString;
}

export interface AmenitiesPageConfig {
  title: LocaleString;
  subtitle: LocaleString;
  amenities: AmenityItem[];
  downloadButton: LocaleString;
  askQuestionButton: LocaleString;
}

export interface NearbyPlace {
  label: LocaleString;
  time: LocaleString;
}

export interface LocationPageConfig {
  mainImage: string;
  mainImageAlt: LocaleString;
  smallImage: string;
  smallImageAlt: LocaleString;
  title: LocaleString;
  description: LocaleString;
  viewMapButton: LocaleString;
  nearbyPlaces: NearbyPlace[];
}

export interface BookingFeature {
  icon: string;
  label: LocaleString;
}

export interface MoveInMonth {
  value: string;
  label: LocaleString;
}

export interface BookingPageConfig {
  title: LocaleString;
  subtitle: LocaleString;
  features: BookingFeature[];
  formLabels: {
    name: LocaleString;
    namePlaceholder: LocaleString;
    email: LocaleString;
    emailPlaceholder: LocaleString;
    moveInMonth: LocaleString;
    moveInPlaceholder: LocaleString;
    message: LocaleString;
    messagePlaceholder: LocaleString;
  };
  moveInMonths: MoveInMonth[];
  submitButton: LocaleString;
  successTitle: LocaleString;
  successMessage: LocaleString;
  backHomeButton: LocaleString;
}

export interface PreloaderConfig {
  brandName: LocaleString;
  brandSubname: LocaleString;
  yearText?: LocaleString;
}

export interface ScrollToTopConfig {
  ariaLabel: LocaleString;
}

export interface ContactPageConfig {
  title: LocaleString;
  subtitle: LocaleString;
  emailLabel: LocaleString;
  email: string;
  phoneLabel: LocaleString;
  phone: string;
  addressLabel: LocaleString;
  address: LocaleString;
  formTitle: LocaleString;
  formLabels: {
    name: LocaleString;
    namePlaceholder: LocaleString;
    email: LocaleString;
    emailPlaceholder: LocaleString;
    message: LocaleString;
    messagePlaceholder: LocaleString;
  };
  submitButton: LocaleString;
  submitting: LocaleString;
  successTitle: LocaleString;
  successText: LocaleString;
  errorText: LocaleString;
  nameRequired: LocaleString;
  emailInvalid: LocaleString;
  messageRequired: LocaleString;
  footerCopyright: LocaleString;
}

export interface DigitalProduct {
  id: string;
  type: 'course';
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  price: string;
  language: string;
  estimatedDurationMinutes?: number;
  chapters?: {
    id: string;
    title: string;
    lessons: { id: string; title: string }[];
  }[];
}

export interface DigitalProductsConfig {
  enabled: boolean;
  lastSyncedAt?: string;
  products: DigitalProduct[];
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const siteConfig: SiteConfig = {
  title: { el: 'Apartment 128', en: 'Apartment 128' },
  description: { el: 'A calm, furnished rental in the city', en: 'A calm, furnished rental in the city' },
  language: 'en',
  keywords: { el: 'διαμέρισμα, ενοικίαση', en: 'apartment, rental, long-term' },
  ogImage: '/hero_portrait.jpg',
  canonical: '',
  siteId: 'test-repo',
  apiUrl: 'https://harmonious-embrace-staging.up.railway.app',
};

export const navigationConfig: NavigationConfig = {
  brandName: { el: 'Apartment 128', en: 'Apartment 128' },
  bookViewingLink: { el: 'Book a viewing', en: 'Book a viewing' },
  menuButton: { el: 'Menu', en: 'Menu' },
  closeButton: { el: 'Close', en: 'Close' },
  navLinks: [
    {
      path: '/',
      label: { el: 'Home', en: 'Home' },
    },
    {
      path: '/amenities',
      label: { el: 'Amenities', en: 'Amenities' },
    },
    {
      path: '/location',
      label: { el: 'Location', en: 'Location' },
    },
    {
      path: '/booking',
      label: { el: 'Book a Viewing', en: 'Book a Viewing' },
    },
    {
      path: '/contact',
      label: { el: 'Contact', en: 'Contact' },
    },
  ],
};

export const preloaderConfig: PreloaderConfig = {
  brandName: { el: 'Apartment 128', en: 'Apartment 128' },
  brandSubname: { el: 'Ένα ήσυχο διαμέρισμα στην πόλη', en: 'A calm apartment in the city' },
  yearText: { el: '2026', en: '2026' },
};

export const scrollToTopConfig: ScrollToTopConfig = {
  ariaLabel: { el: 'Πήγαινε πάνω', en: 'Scroll to top' },
};

export const heroConfig: HeroConfig = {
  heroImage: '/hero_portrait.jpg',
  heroImageAlt: { el: 'Εσωτερικό διαμερίσματος', en: 'Apartment interior' },
  mainTitle: { el: 'test here', en: 'Live here\nfor a\nwhile.' },
  subtitle: { el: 'A calm, batman rental in the city—available for stays of 3–12 months.', en: 'A calm, furnished rental in the city—available for stays of 3–12 months.' },
  requestTourButton: { el: 'LOCAL CHANGE TEST', en: 'Request a tour' },
  viewAvailabilityButton: { el: 'TEST SOMETHING', en: 'View availability' },
  availabilityLabel: { el: 'Now showing · Q3 2026', en: 'Now showing · Q3 2026' },
};

export const availabilityConfig: AvailabilityConfig = {
  image: '/availability_wide.jpg',
  imageAlt: { el: 'Διάδρομος διαμερίσματος', en: 'Apartment hallway' },
  title: { el: 'Available for\nlong stays.', en: 'Available for\nlong stays.' },
  description: { el: 'Minimum 3 months. Maximum 12. Quiet building, responsive management, simple monthly billing.', en: 'Minimum 3 months. Maximum 12. Quiet building, responsive management, simple monthly billing.' },
  pricingLink: { el: 'See pricing details', en: 'See pricing details' },
  moveInLabel: { el: 'Typical move-in', en: 'Typical move-in' },
  moveInValue: { el: '2 weeks', en: '2 weeks' },
};

export const bedroomConfig: RoomConfig = {
  image: '/bedroom_feature.jpg',
  imageAlt: { el: 'Υπνοδωμάτιο', en: 'Bedroom' },
  title: { el: 'Bedroom', en: 'Bedroom' },
  description: { el: 'Blackout curtains, built-in storage, and space for a desk. Designed for real rest—and real work.', en: 'Blackout curtains, built-in storage, and space for a desk. Designed for real rest—and real work.' },
  linkText: { el: 'View floor plan', en: 'View floor plan' },
  tagline: { el: 'Furnished · Linens included', en: 'Furnished · Linens included' },
};

export const livingRoomConfig: RoomConfig = {
  image: '/living_room_feature.jpg',
  imageAlt: { el: 'Σαλόνι', en: 'Living room' },
  title: { el: 'Living room', en: 'Living room' },
  description: { el: 'A sofa you can actually nap on. Fast wifi. A dining setup that doubles as a workspace.', en: 'A sofa you can actually nap on. Fast wifi. A dining setup that doubles as a workspace.' },
  linkText: { el: 'Check wifi speed', en: 'Check wifi speed' },
  tagline: { el: 'Seats 4 · Smart TV · HDMI', en: 'Seats 4 · Smart TV · HDMI' },
};

export const kitchenConfig: RoomConfig = {
  image: '/kitchen_feature.jpg',
  imageAlt: { el: 'Κουζίνα', en: 'Kitchen' },
  title: { el: 'Kitchen', en: 'Kitchen' },
  description: { el: 'Gas cooktop, full oven, dishwasher, and all the basics—pots, pans, knives, mugs.', en: 'Gas cooktop, full oven, dishwasher, and all the basics—pots, pans, knives, mugs.' },
  linkText: { el: 'See included items', en: 'See included items' },
  tagline: { el: 'Fridge + freezer · Waste bins · Cleaning kit', en: 'Fridge + freezer · Waste bins · Cleaning kit' },
};

export const bathroomConfig: RoomConfig = {
  image: '/bathroom_feature.jpg',
  imageAlt: { el: 'Μπάνιο', en: 'Bathroom' },
  title: { el: 'Bathroom', en: 'Bathroom' },
  description: { el: 'Rain shower, good water pressure, heated towel rail, and a full set of linens on arrival.', en: 'Rain shower, good water pressure, heated towel rail, and a full set of linens on arrival.' },
  linkText: { el: 'View photos', en: 'View photos' },
  tagline: { el: 'Ventilated · Storage niche · Eco products', en: 'Ventilated · Storage niche · Eco products' },
};

export const amenitiesPageConfig: AmenitiesPageConfig = {
  title: { el: 'Everything you need.', en: 'Everything you need.' },
  subtitle: { el: 'Move in with a suitcase. We\'ve handled the rest.', en: 'Move in with a suitcase. We\'ve handled the rest.' },
  amenities: [
    {
      icon: 'Wifi',
      label: { el: 'High-speed wifi', en: 'High-speed wifi' },
    },
    {
      icon: 'Calendar',
      label: { el: 'Utilities included (fair use)', en: 'Utilities included (fair use)' },
    },
    {
      icon: 'Bed',
      label: { el: 'Bed linen + bath towels', en: 'Bed linen + bath towels' },
    },
    {
      icon: 'Check',
      label: { el: 'Weekly cleaning (optional)', en: 'Weekly cleaning (optional)' },
    },
    {
      icon: 'Check',
      label: { el: 'Maintenance support', en: 'Maintenance support' },
    },
    {
      icon: 'Check',
      label: { el: 'Bike storage', en: 'Bike storage' },
    },
    {
      icon: 'Check',
      label: { el: 'Elevator access', en: 'Elevator access' },
    },
    {
      icon: 'Check',
      label: { el: 'Secure entry', en: 'Secure entry' },
    },
    {
      icon: 'Sofa',
      label: { el: 'Furnished throughout', en: 'Furnished throughout' },
    },
    {
      icon: 'UtensilsCrossed',
      label: { el: 'Fully equipped kitchen', en: 'Fully equipped kitchen' },
    },
    {
      icon: 'Bath',
      label: { el: 'Premium bathroom fixtures', en: 'Premium bathroom fixtures' },
    },
    {
      icon: 'Home',
      label: { el: 'Dedicated workspace', en: 'Dedicated workspace' },
    },
  ],
  downloadButton: { el: 'Download full checklist (PDF)', en: 'Download full checklist (PDF)' },
  askQuestionButton: { el: 'Ask a question', en: 'Ask a question' },
};

export const locationPageConfig: LocationPageConfig = {
  mainImage: '/neighborhood_main.jpg',
  mainImageAlt: { el: 'Καφετέρια γειτονιάς', en: 'Neighborhood cafe' },
  smallImage: '/neighborhood_small.jpg',
  smallImageAlt: { el: 'Κοντινό πάρκο', en: 'Nearby park' },
  title: { el: 'The neighborhood.', en: 'The neighborhood.' },
  description: { el: 'Cafes, parks, and grocery runs within walking distance. Transit links are close—without the noise.', en: 'Cafes, parks, and grocery runs within walking distance. Transit links are close—without the noise.' },
  viewMapButton: { el: 'View on map', en: 'View on map' },
  nearbyPlaces: [
    {
      label: { el: 'Café', en: 'Café' },
      time: { el: '3 min walk', en: '3 min walk' },
    },
    {
      label: { el: 'Metro', en: 'Metro' },
      time: { el: '6 min walk', en: '6 min walk' },
    },
    {
      label: { el: 'Market', en: 'Market' },
      time: { el: '4 min walk', en: '4 min walk' },
    },
  ],
};

export const bookingPageConfig: BookingPageConfig = {
  title: { el: 'Book a viewing.', en: 'Book a viewing.' },
  subtitle: { el: 'Reply within one business day.', en: 'Reply within one business day.' },
  features: [
    {
      icon: 'Calendar',
      label: { el: 'Flexible viewing times', en: 'Flexible viewing times' },
    },
    {
      icon: 'Check',
      label: { el: 'No obligation', en: 'No obligation' },
    },
    {
      icon: 'MapPin',
      label: { el: 'In-person or virtual tour', en: 'In-person or virtual tour' },
    },
  ],
  formLabels: {
    name: { el: 'Name', en: 'Name' },
    namePlaceholder: { el: 'Your full name', en: 'Your full name' },
    email: { el: 'Email', en: 'Email' },
    emailPlaceholder: { el: 'your@email.com', en: 'your@email.com' },
    moveInMonth: { el: 'Move-in month', en: 'Move-in month' },
    moveInPlaceholder: { el: 'Select month', en: 'Select month' },
    message: { el: 'Message (optional)', en: 'Message (optional)' },
    messagePlaceholder: { el: 'Any questions or specific requirements?', en: 'Any questions or specific requirements?' },
  },
  moveInMonths: [
    {
      value: 'june',
      label: { el: 'June 2026', en: 'June 2026' },
    },
    {
      value: 'july',
      label: { el: 'July 2026', en: 'July 2026' },
    },
    {
      value: 'august',
      label: { el: 'August 2026', en: 'August 2026' },
    },
    {
      value: 'september',
      label: { el: 'September 2026', en: 'September 2026' },
    },
    {
      value: 'october',
      label: { el: 'October 2026', en: 'October 2026' },
    },
    {
      value: 'later',
      label: { el: 'Later', en: 'Later' },
    },
  ],
  submitButton: { el: 'Send inquiry', en: 'Send inquiry' },
  successTitle: { el: 'Request received!', en: 'Request received!' },
  successMessage: { el: 'We\'ll get back to you within one business day to confirm your viewing.', en: 'We\'ll get back to you within one business day to confirm your viewing.' },
  backHomeButton: { el: 'Back to home', en: 'Back to home' },
};

export const contactPageConfig: ContactPageConfig = {
  title: { el: 'Get in touch.', en: 'Get in touch.' },
  subtitle: { el: 'Have questions? We\'re here to help.', en: 'Have questions? We\'re here to help.' },
  emailLabel: { el: 'Email', en: 'Email' },
  email: 'hello@apartment128.com',
  phoneLabel: { el: 'Phone', en: 'Phone' },
  phone: '+1 (555) 014-2201',
  addressLabel: { el: 'Address', en: 'Address' },
  address: { el: '128 Riverton Ave, Unit 4B', en: '128 Riverton Ave, Unit 4B' },
  formTitle: { el: 'Send a message', en: 'Send a message' },
  formLabels: {
    name: { el: 'Name', en: 'Name' },
    namePlaceholder: { el: 'Your name', en: 'Your name' },
    email: { el: 'Email', en: 'Email' },
    emailPlaceholder: { el: 'your@email.com', en: 'your@email.com' },
    message: { el: 'Message', en: 'Message' },
    messagePlaceholder: { el: 'How can we help?', en: 'How can we help?' },
  },
  submitButton: { el: 'Send message', en: 'Send message' },
  submitting: { el: 'Αποστολή...', en: 'Sending...' },
  successTitle: { el: 'Το μήνυμά σας στάλθηκε!', en: 'Message sent!' },
  successText: { el: 'Θα επικοινωνήσουμε μαζί σας σύντομα.', en: 'We will get back to you shortly.' },
  errorText: { el: 'Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά.', en: 'Something went wrong. Please try again.' },
  nameRequired: { el: 'Το όνομα είναι υποχρεωτικό.', en: 'Name is required.' },
  emailInvalid: { el: 'Εισάγετε έγκυρο email.', en: 'Please enter a valid email.' },
  messageRequired: { el: 'Το μήνυμα είναι υποχρεωτικό.', en: 'Message is required.' },
  footerCopyright: { el: '© Apartment 128. All rights reserved.', en: '© Apartment 128. All rights reserved.' },
};

export const digitalProductsConfig: DigitalProductsConfig = {
  enabled: true,
  lastSyncedAt: '2026-03-25T21:41:24.516Z',
  products: [
    {
      id: '0076b90e-f3bf-42fd-a1c3-deee2598563a',
      type: 'course',
      title: 'React - The Complete Guide (incl. Next.js, Redux)',
      slug: 'react-the-complete-guide-incl-nextjs-redux',
      description: 'Dive in and learn React.js from scratch! Learn React, Hooks, Redux, React Router, Next.js, Best Practices and way more!',
      thumbnail: 'https://www.jotform.com/blog/wp-content/uploads/2017/01/react-js.png',
      price: '0.00',
      language: 'el',
      estimatedDurationMinutes: 480,
      chapters: [
        {
          id: 'cb4de920-2fac-473f-948b-2f8597cca2d6',
          title: 'Getting started',
          lessons: [
            {
              id: '7d4163d7-57b9-4d51-9115-e080c11ceece',
              title: 'Welcome To The Course!',
            },
          ],
        },
      ],
    },
    {
      id: '122ba75a-e64b-485d-942a-c47805b7cf52',
      type: 'course',
      title: 'Introduction to Web Development',
      slug: 'introduction-to-web-development',
      description: 'test',
      thumbnail: '',
      price: '9.99',
      language: 'en',
      estimatedDurationMinutes: 19,
      chapters: [
        {
          id: '5b35ca00-f732-4610-bfe7-b0e9f6ec8a47',
          title: 'Basics of the Web',
          lessons: [
            {
              id: 'b65c749a-e055-4faf-894c-c831403db78b',
              title: 'What is the Internet?',
            },
            {
              id: 'fff1e1c6-d585-4a68-9b65-e0e7a22b49f8',
              title: 'How Websites Work',
            },
            {
              id: '8edec310-ee1d-4995-b9f5-477b5994d1c2',
              title: 'Browsers and Servers',
            },
          ],
        },
        {
          id: 'fe856d21-9984-44b2-9c6d-43b4f80e3159',
          title: 'HTML Fundamentals',
          lessons: [
            {
              id: '3feb5642-483d-4f09-9be4-8ab44e93c77c',
              title: 'What is HTML?',
            },
            {
              id: 'c16dac85-4ced-49d0-81ca-2decf7c18c46',
              title: 'Basic Tags',
            },
            {
              id: 'c3cbb1ef-cb4a-482c-a2ce-2762f0b03a30',
              title: 'Creating Your First Page',
            },
          ],
        },
        {
          id: 'a7420dfb-efb1-46e5-95a2-3701a0652907',
          title: 'CSS Basics',
          lessons: [
            {
              id: '2bfd39b4-f761-4748-bfeb-d69711444068',
              title: 'What is CSS?',
            },
            {
              id: '6b2f5595-2a62-42df-aa1a-35d985a59847',
              title: 'Colors and Fonts',
            },
            {
              id: 'ef920657-2a19-4671-9bd8-023d7fbc1e6e',
              title: 'Layout and Spacing',
            },
          ],
        },
        {
          id: 'ed923b01-9b42-482a-aed5-e301403c4693',
          title: 'JavaScript Intro',
          lessons: [
            {
              id: '498381f0-cd03-4dbf-a34e-1faa23acb77b',
              title: 'What is JavaScript?',
            },
            {
              id: '457a4e76-55a0-4b85-80e5-a068a18ccf49',
              title: 'Variables and Functions',
            },
            {
              id: 'dfe877e7-33eb-4fa2-bb4e-49553a4757c8',
              title: 'Simple Interactions',
            },
          ],
        },
      ],
    },
    {
      id: '9ba2d2ce-3e32-41dc-b375-c217de01c446',
      type: 'course',
      title: 'test werwerwer',
      slug: 'test-werwerwer',
      description: 'werwerwer',
      thumbnail: '',
      price: '500.00',
      language: 'el',
      estimatedDurationMinutes: 120,
      chapters: [],
    },
  ],
};
