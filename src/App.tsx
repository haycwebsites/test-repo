import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight, Wifi, Calendar, MapPin, Phone, Mail, Check, Home, Bed, Bath, UtensilsCrossed, Sofa } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HaycProvider, useHayc } from './hayc/config-context';
import { ContactForm } from '@/components/ContactForm';
import './App.css';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wifi,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Check,
  Home,
  Bed,
  Bath,
  UtensilsCrossed,
  Sofa,
};

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t, config } = useHayc();
  const { navigationConfig } = config;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold tracking-tight text-[#111111]">
            {t(navigationConfig.brandName)}
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              to="/booking" 
              className="hidden md:inline-flex items-center text-sm font-medium text-[#2F6BFF] hover:underline"
            >
              {t(navigationConfig.bookViewingLink)}
            </Link>
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="text-sm font-medium text-[#111111] hover:text-[#2F6BFF] transition-colors"
            >
              {t(navigationConfig.menuButton)}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#F4F2EE]">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 md:px-10">
              <span className="text-lg font-semibold tracking-tight text-[#111111]">
                {t(navigationConfig.brandName)}
              </span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium text-[#111111] hover:text-[#2F6BFF] transition-colors"
              >
                {t(navigationConfig.closeButton)}
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-center justify-center gap-8">
              {navigationConfig.navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-4xl md:text-5xl font-semibold tracking-tight transition-colors ${
                    location.pathname === link.path 
                      ? 'text-[#2F6BFF]' 
                      : 'text-[#111111] hover:text-[#2F6BFF]'
                  }`}
                >
                  {t(link.label)}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="fixed inset-0 pointer-events-none z-40 border-[8px] md:border-[12px] border-[#111111]" />
    </>
  );
}

function HomePage() {
  const { t, img, config } = useHayc();
  const { heroConfig, availabilityConfig, bedroomConfig, livingRoomConfig, kitchenConfig, bathroomConfig } = config;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F2EE]">
      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center">
        <div className="w-full px-6 md:px-[6vw] py-20 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="relative aspect-[3/4] max-h-[76vh] overflow-hidden">
                <img 
                  src={img(heroConfig.heroImage)} 
                  alt={t(heroConfig.heroImageAlt)} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="lg:col-span-5 order-1 lg:order-2 lg:pl-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95] text-[#111111] mb-6 whitespace-pre-line">
                {t(heroConfig.mainTitle)}
              </h1>
              <p className="text-lg text-[#6D6A63] mb-8 max-w-md">
                {t(heroConfig.subtitle)}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/booking">
                  <Button className="bg-[#2F6BFF] hover:bg-[#2556CC] text-white px-8 py-6 text-base font-medium">
                    {t(heroConfig.requestTourButton)}
                  </Button>
                </Link>
                <Link to="/booking">
                  <Button variant="outline" className="border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white px-8 py-6 text-base font-medium">
                    {t(heroConfig.viewAvailabilityButton)}
                  </Button>
                </Link>
              </div>
              <p className="text-xs uppercase tracking-[0.08em] text-[#6D6A63] font-mono">
                {t(heroConfig.availabilityLabel)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Availability Section */}
      <section className="min-h-screen relative flex items-center py-20">
        <div className="w-full px-6 md:px-[6vw]">
          <div className="mb-12">
            <img 
              src={img(availabilityConfig.image)} 
              alt={t(availabilityConfig.imageAlt)} 
              className="w-full h-[40vh] md:h-[46vh] object-cover"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[0.95] text-[#111111] mb-6 whitespace-pre-line">
                {t(availabilityConfig.title)}
              </h2>
              <p className="text-lg text-[#6D6A63] mb-6 max-w-md">
                {t(availabilityConfig.description)}
              </p>
              <Link to="/booking" className="inline-flex items-center text-[#2F6BFF] font-medium hover:underline">
                {t(availabilityConfig.pricingLink)} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="lg:text-right lg:pt-8">
              <div className="inline-block">
                <div className="w-10 h-0.5 bg-[#111111] mb-4" />
                <p className="text-xs uppercase tracking-[0.08em] text-[#6D6A63] font-mono mb-2">
                  {t(availabilityConfig.moveInLabel)}
                </p>
                <p className="text-5xl md:text-6xl font-semibold text-[#111111]">
                  {t(availabilityConfig.moveInValue).split(' ')[0]}
                  <span className="text-2xl md:text-3xl ml-2">{t(availabilityConfig.moveInValue).split(' ').slice(1).join(' ')}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bedroom Section */}
      <section className="min-h-screen relative flex items-center py-20">
        <div className="w-full px-6 md:px-[6vw]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] max-h-[76vh] overflow-hidden">
                <img 
                  src={img(bedroomConfig.image)} 
                  alt={t(bedroomConfig.imageAlt)} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-5">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#111111] mb-6">
                {t(bedroomConfig.title)}
              </h2>
              <p className="text-lg text-[#6D6A63] mb-6 max-w-md">
                {t(bedroomConfig.description)}
              </p>
              <Link to="/amenities" className="inline-flex items-center text-[#2F6BFF] font-medium hover:underline mb-8">
                {t(bedroomConfig.linkText)} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <p className="text-xs uppercase tracking-[0.08em] text-[#6D6A63] font-mono">
                {t(bedroomConfig.tagline)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Living Room Section */}
      <section className="min-h-screen relative flex items-center py-20">
        <div className="w-full px-6 md:px-[6vw]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#111111] mb-6">
                {t(livingRoomConfig.title)}
              </h2>
              <p className="text-lg text-[#6D6A63] mb-6 max-w-md">
                {t(livingRoomConfig.description)}
              </p>
              <Link to="/amenities" className="inline-flex items-center text-[#2F6BFF] font-medium hover:underline mb-8">
                {t(livingRoomConfig.linkText)} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <p className="text-xs uppercase tracking-[0.08em] text-[#6D6A63] font-mono">
                {t(livingRoomConfig.tagline)}
              </p>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative aspect-[4/3] max-h-[76vh] overflow-hidden">
                <img 
                  src={img(livingRoomConfig.image)} 
                  alt={t(livingRoomConfig.imageAlt)} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kitchen Section */}
      <section className="min-h-screen relative flex items-center py-20">
        <div className="w-full px-6 md:px-[6vw]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] max-h-[76vh] overflow-hidden">
                <img 
                  src={img(kitchenConfig.image)} 
                  alt={t(kitchenConfig.imageAlt)} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-5">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#111111] mb-6">
                {t(kitchenConfig.title)}
              </h2>
              <p className="text-lg text-[#6D6A63] mb-6 max-w-md">
                {t(kitchenConfig.description)}
              </p>
              <Link to="/amenities" className="inline-flex items-center text-[#2F6BFF] font-medium hover:underline mb-8">
                {t(kitchenConfig.linkText)} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <p className="text-xs uppercase tracking-[0.08em] text-[#6D6A63] font-mono">
                {t(kitchenConfig.tagline)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bathroom Section */}
      <section className="min-h-screen relative flex items-center py-20">
        <div className="w-full px-6 md:px-[6vw]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#111111] mb-6">
                {t(bathroomConfig.title)}
              </h2>
              <p className="text-lg text-[#6D6A63] mb-6 max-w-md">
                {t(bathroomConfig.description)}
              </p>
              <Link to="/amenities" className="inline-flex items-center text-[#2F6BFF] font-medium hover:underline mb-8">
                {t(bathroomConfig.linkText)} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <p className="text-xs uppercase tracking-[0.08em] text-[#6D6A63] font-mono">
                {t(bathroomConfig.tagline)}
              </p>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative aspect-[4/3] max-h-[76vh] overflow-hidden">
                <img 
                  src={img(bathroomConfig.image)} 
                  alt={t(bathroomConfig.imageAlt)} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AmenitiesPage() {
  const { t, config } = useHayc();
  const { amenitiesPageConfig } = config;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F2EE] pt-24 pb-20">
      <div className="px-6 md:px-[8vw]">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#111111] mb-6">
            {t(amenitiesPageConfig.title)}
          </h1>
          <p className="text-lg text-[#6D6A63]">
            {t(amenitiesPageConfig.subtitle)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 mb-16">
          {amenitiesPageConfig.amenities.map((amenity, index) => {
            const IconComponent = iconMap[amenity.icon] || Check;
            return (
              <div key={index} className="flex items-center gap-4 py-3 border-b border-[#111111]/10">
                <IconComponent className="w-5 h-5 text-[#2F6BFF]" />
                <span className="text-lg text-[#111111]">{t(amenity.label)}</span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="bg-[#2F6BFF] hover:bg-[#2556CC] text-white px-8 py-6 text-base font-medium">
            {t(amenitiesPageConfig.downloadButton)}
          </Button>
          <Link to="/contact">
            <Button variant="outline" className="border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white px-8 py-6 text-base font-medium">
              {t(amenitiesPageConfig.askQuestionButton)}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function LocationPage() {
  const { t, img, config } = useHayc();
  const { locationPageConfig } = config;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F2EE] pt-24 pb-20">
      <div className="px-6 md:px-[8vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src={img(locationPageConfig.mainImage)} 
                alt={t(locationPageConfig.mainImageAlt)} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 md:right-8 w-48 md:w-64 aspect-video border-4 border-[#F4F2EE] overflow-hidden shadow-lg">
              <img 
                src={img(locationPageConfig.smallImage)} 
                alt={t(locationPageConfig.smallImageAlt)} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:pt-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#111111] mb-6">
              {t(locationPageConfig.title)}
            </h1>
            <p className="text-lg text-[#6D6A63] mb-8">
              {t(locationPageConfig.description)}
            </p>
            <Link to="/contact">
              <Button variant="outline" className="border-[#2F6BFF] text-[#2F6BFF] hover:bg-[#2F6BFF] hover:text-white px-6 py-5 text-base font-medium">
                <MapPin className="mr-2 w-4 h-4" /> {t(locationPageConfig.viewMapButton)}
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locationPageConfig.nearbyPlaces.map((place, index) => (
            <div key={index} className="p-6 border border-[#111111]/10 bg-white/50">
              <p className="text-3xl md:text-4xl font-semibold text-[#111111] mb-2">
                {t(place.time).split(' ')[0]}
              </p>
              <p className="text-sm uppercase tracking-[0.08em] text-[#6D6A63] font-mono">
                {t(place.time).split(' ').slice(1).join(' ')} — {t(place.label)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BookingPage() {
  const { t, config } = useHayc();
  const { bookingPageConfig } = config;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F4F2EE] pt-24 pb-20 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-16 h-16 bg-[#2F6BFF] rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#111111] mb-4">
            {t(bookingPageConfig.successTitle)}
          </h1>
          <p className="text-lg text-[#6D6A63] mb-8 max-w-md mx-auto">
            {t(bookingPageConfig.successMessage)}
          </p>
          <Link to="/">
            <Button className="bg-[#2F6BFF] hover:bg-[#2556CC] text-white px-8 py-6 text-base font-medium">
              {t(bookingPageConfig.backHomeButton)}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F2EE] pt-24 pb-20">
      <div className="px-6 md:px-[8vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#111111] mb-6">
              {t(bookingPageConfig.title)}
            </h1>
            <p className="text-lg text-[#6D6A63] mb-12">
              {t(bookingPageConfig.subtitle)}
            </p>
            
            <div className="space-y-6">
              {bookingPageConfig.features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon] || Check;
                return (
                  <div key={index} className="flex items-center gap-4">
                    <IconComponent className="w-5 h-5 text-[#2F6BFF]" />
                    <span className="text-[#111111]">{t(feature.label)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 border border-[#111111]/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-[#111111] mb-2 block">{t(bookingPageConfig.formLabels.name)}</Label>
                <Input 
                  id="name" 
                  placeholder={t(bookingPageConfig.formLabels.namePlaceholder)} 
                  required
                  className="border-[#111111]/20 focus:border-[#2F6BFF] focus:ring-[#2F6BFF]"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-[#111111] mb-2 block">{t(bookingPageConfig.formLabels.email)}</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder={t(bookingPageConfig.formLabels.emailPlaceholder)} 
                  required
                  className="border-[#111111]/20 focus:border-[#2F6BFF] focus:ring-[#2F6BFF]"
                />
              </div>
              
              <div>
                <Label htmlFor="month" className="text-[#111111] mb-2 block">{t(bookingPageConfig.formLabels.moveInMonth)}</Label>
                <Select required>
                  <SelectTrigger className="border-[#111111]/20 focus:border-[#2F6BFF] focus:ring-[#2F6BFF]">
                    <SelectValue placeholder={t(bookingPageConfig.formLabels.moveInPlaceholder)} />
                  </SelectTrigger>
                  <SelectContent>
                    {bookingPageConfig.moveInMonths.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {t(month.label)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="message" className="text-[#111111] mb-2 block">{t(bookingPageConfig.formLabels.message)}</Label>
                <Textarea 
                  id="message" 
                  placeholder={t(bookingPageConfig.formLabels.messagePlaceholder)}
                  rows={4}
                  className="border-[#111111]/20 focus:border-[#2F6BFF] focus:ring-[#2F6BFF]"
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-[#2F6BFF] hover:bg-[#2556CC] text-white py-6 text-base font-medium"
              >
                {t(bookingPageConfig.submitButton)}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const { t, config } = useHayc();
  const { contactPageConfig, navigationConfig } = config;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#111111] text-[#F4F2EE] pt-24 pb-20">
      <div className="px-6 md:px-[8vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
              {t(contactPageConfig.title)}
            </h1>
            <p className="text-lg text-[#6D6A63] mb-12">
              {t(contactPageConfig.subtitle)}
            </p>
            
            <div className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.08em] text-[#6D6A63] font-mono mb-2">
                  {t(contactPageConfig.emailLabel)}
                </p>
                <a 
                  href={`mailto:${contactPageConfig.email}`} 
                  className="text-xl md:text-2xl font-medium hover:text-[#2F6BFF] transition-colors flex items-center gap-3"
                >
                  <Mail className="w-5 h-5" />
                  {contactPageConfig.email}
                </a>
              </div>
              
              <div>
                <p className="text-xs uppercase tracking-[0.08em] text-[#6D6A63] font-mono mb-2">
                  {t(contactPageConfig.phoneLabel)}
                </p>
                <a 
                  href={`tel:${contactPageConfig.phone.replace(/[^+\d]/g, '')}`} 
                  className="text-xl md:text-2xl font-medium hover:text-[#2F6BFF] transition-colors flex items-center gap-3"
                >
                  <Phone className="w-5 h-5" />
                  {contactPageConfig.phone}
                </a>
              </div>
              
              <div>
                <p className="text-xs uppercase tracking-[0.08em] text-[#6D6A63] font-mono mb-2">
                  {t(contactPageConfig.addressLabel)}
                </p>
                <p className="text-xl md:text-2xl font-medium flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  {t(contactPageConfig.address)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] p-8 md:p-10 border border-[#F4F2EE]/10">
            <h2 className="text-2xl font-semibold mb-6">{t(contactPageConfig.formTitle)}</h2>
            <ContactForm />
          </div>
        </div>

        <div className="pt-12 border-t border-[#F4F2EE]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#6D6A63]">
            {t(contactPageConfig.footerCopyright)}
          </p>
          <div className="flex gap-6">
            {navigationConfig.navLinks.slice(0, 3).map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="text-sm text-[#6D6A63] hover:text-[#F4F2EE] transition-colors"
              >
                {t(link.label)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <HaycProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/amenities" element={<AmenitiesPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>
    </HaycProvider>
  );
}

export default App;
