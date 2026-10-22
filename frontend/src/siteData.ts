const address = {
  streetAddress: "11720 Alamo Ranch Parkway, Suite 240",
  addressLocality: "San Antonio",
  addressRegion: "TX",
  postalCode: "78253",
  addressCountry: "US",
} as const;

export const site = {
  name: "Titan Gym",
  url: "https://titangymsa.com/",
  address,
  addressLine: address.streetAddress,
  cityLine: `${address.addressLocality}, ${address.addressRegion} ${address.postalCode}`,
  phone: "210-267-2206",
  phoneHref: "tel:+12102672206",
  email: "info@titangymsa.com",
  signupUrl: "https://titan-gym.gymdesk.com/signup/v/lBZ8q",
  mapsUrl: "https://maps.app.goo.gl/PkzJchsbTsUVUgJ86",
  shareImage: {
    src: "images/hero.jpg",
    alt: "Titan Gym training floor in Alamo Ranch, San Antonio",
    width: 2560,
    height: 1920,
    type: "image/jpeg",
  },
  social: {
    facebook: "https://www.facebook.com/112064848507841",
    instagram: "https://www.instagram.com/titangymsa/",
    youtube: "https://www.youtube.com/channel/UCc10O7VogvhCafaqd-BIRdg",
  },
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Membership", href: "/#membership" },
  { label: "Student training", href: "/texas-sports-academy" },
  { label: "Contact us", href: "/join-now" },
] as const;

const weeklyHours = [
  { day: "Monday – Friday", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "05:00", closes: "22:00" },
  { day: "Saturday", days: ["Saturday"], opens: "08:00", closes: "19:00" },
  { day: "Sunday", days: ["Sunday"], opens: "10:00", closes: "18:00" },
] as const;

function formatOpeningTime(time: string) {
  const [hour, minutes] = time.split(":");
  const number = Number(hour);
  return `${number % 12 || 12}:${minutes} ${number < 12 ? "AM" : "PM"}`;
}

export const hours = weeklyHours.map((period) => ({
  ...period,
  time: `${formatOpeningTime(period.opens)} – ${formatOpeningTime(period.closes)}`,
}));

export type MembershipPlan = {
  name: string;
  price: string;
  period: string;
  description?: string;
  features?: readonly string[];
  featured: boolean;
  comparisonPrice?: string;
  offer?: string;
};

// Store confirmed membership prices in integer cents.
const monthlyMembershipCents = 5499;
const annualMembershipCents = 49400;
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const wholeUsd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
export const plans: readonly MembershipPlan[] = [
  { name: "Annual membership", price: wholeUsd.format(annualMembershipCents / 100), comparisonPrice: usd.format(monthlyMembershipCents * 12 / 100), offer: "25% off (3 months free)", period: "/ year", features: ["Annually", "Cancel annually", "No enrollment fee"], featured: true },
  { name: "Monthly membership", price: usd.format(monthlyMembershipCents / 100), period: "/ month", features: ["Month to month", "Cancel anytime", "No enrollment fee"], featured: false },
  { name: "Day pass", price: "$15", period: "/ day", description: "In town or checking us out? Come get a session in.", featured: false },
  { name: "Week pass", price: "$30", period: "/ week", description: "A short term home base for a full week of training.", featured: false },
] as const;

export const gallery = [
  { src: "./images/gym-floor.jpg", alt: "Titan Gym training floor with green power racks and strength equipment" },
  { src: "./images/christmas-giveaway.jpg", alt: "Titan Gym Christmas giveaway display with a small decorated tree, gym merchandise, and nutrition products" },
  { src: "./images/facility-02.jpg", alt: "Member using a cable machine at Titan Gym" },
  { src: "./images/facility-03.jpg", alt: "Member lifting inside a Titan Gym power rack" },
  { src: "./images/facility-04.jpg", alt: "Personal training session on a strength machine" },
  { src: "./images/barbell-squat.jpg", alt: "Member training with a barbell at Titan Gym" },
] as const;

export const openGymMedia = [
  { kind: "video", src: "./videos/open-gym/bench-press.mp4", poster: "./images/open-gym/bench-press.jpg", alt: "Member bench pressing with a spotter at Titan Gym", width: 480, height: 848 },
  { kind: "video", src: "./videos/open-gym/seated-cable-row.mp4", poster: "./images/open-gym/seated-cable-row.jpg", alt: "Member performing seated cable rows at Titan Gym", width: 720, height: 1280, fit: "contain" },
  { kind: "video", src: "./videos/open-gym/bench-press-spotter.mp4", poster: "./images/open-gym/bench-press-spotter.jpg", alt: "Member bench pressing with a spotter beside the bench at Titan Gym", width: 720, height: 1280, fit: "contain" },
  { kind: "video", src: "./videos/open-gym/seated-dumbbell-press.mp4", poster: "./images/open-gym/seated-dumbbell-press.jpg", alt: "Member performing a seated dumbbell shoulder press at Titan Gym", width: 720, height: 1280 },
  { kind: "video", src: "./videos/open-gym/lat-pulldown.mp4", poster: "./images/open-gym/lat-pulldown.jpg", alt: "Member performing lat pulldowns at Titan Gym", width: 720, height: 1280 },
  { kind: "image", src: "./images/open-gym/training-floor.jpg", alt: "Members training among dumbbells, benches, and green strength equipment at Titan Gym", fit: "contain" },
] as const;

export const personalTrainingMedia = [
  { kind: "video", src: "./videos/pt/strength-machine-coaching.mp4", poster: "./images/pt/strength-machine-coaching.jpg", alt: "Trainer guiding a member on a strength machine at Titan Gym", width: 720, height: 1280 },
  { kind: "video", src: "./videos/pt/pull-up-coaching.mp4", poster: "./images/pt/pull-up-coaching.jpg", alt: "Trainer supervising a member practicing pull-ups at Titan Gym", width: 720, height: 1280 },
  { kind: "video", src: "./videos/pt/pull-up-practice.mp4", poster: "./images/pt/pull-up-practice.jpg", alt: "Member practicing pull-ups in a Titan Gym power rack", width: 720, height: 1280, fit: "contain" },
  { kind: "image", src: "./images/facility-01.jpg", alt: "A spotter assisting a member with a bench press at Titan Gym" },
] as const;

export const nutritionCoachingMedia = [
  { kind: "image", src: "./images/nutrition-coaching/progress-160-to-141-lb.png", alt: "Side-by-side progress photos labeled 160 lb on October 16, 2024 and 141 lb on February 23, 2025", fit: "contain" },
  { kind: "video", src: "./videos/nutrition-coaching/winter-winner.mp4", poster: "./images/nutrition-coaching/winter-winner.jpg", alt: "Woman holding nutrition products outside Titan Gym", width: 720, height: 1280 },
  { kind: "image", src: "./images/nutrition-coaching/progress-152-to-137-lb.png", alt: "Side-by-side progress photos labeled 152 lb on June 20, 2025 and 137 lb on October 2, 2025", fit: "contain" },
  { kind: "image", src: "./images/nutrition-coaching/progress-247-to-195-lb.png", alt: "Side-by-side progress photos labeled 247.6 lb on December 10, 2024 and 195.4 lb on November 13, 2025", fit: "contain" },
  { kind: "image", src: "./images/nutrition-coaching/progress-woman-profile.png", alt: "Side-by-side progress photos showing a woman standing in profile", fit: "contain" },
  { kind: "image", src: "./images/nutrition-coaching/progress-man.png", alt: "Side-by-side progress photos showing a man outdoors and taking a gym mirror photo", fit: "contain" },
  { kind: "image", src: "./images/nutrition-coaching/progress-163-157-lb.jpg", alt: "Side-by-side body composition progress photos labeled 163.5 lb and 157.2 lb", fit: "contain" },
] as const;

export const bodybuildingMedia = [
  { kind: "image", src: "./images/body-building/competition-stage.jpg", alt: "Athlete posing on stage at a bodybuilding competition", fit: "contain" },
  { kind: "image", src: "./images/body-building/competition-collage.jpg", alt: "Collage of bodybuilding competition poses and medal presentation", fit: "contain" },
] as const;

// Owner confirmed the updated rating. Reviews are curated, not fetched live.
export const googleReviews = {
  rating: 5.0,
  url: "https://www.google.com/maps/search/Titan+Gym+Alamo+Ranch+San+Antonio",
} as const;

export const reviews = [
  {
    quote: "Love this place. Clean, inviting and friendly.",
    author: "Gemma H",
    date: "August 2026",
  },
  {
    quote: "This gym is great. I was in town for a couple of weeks. I signed up for weekly passes. I felt very welcome there. Facilities are clean and absolutely top notch in terms of quality.",
    author: "David Bryan",
    date: "July 2026",
  },
  {
    quote: "If you're looking for a gym with a welcoming atmosphere, supportive staff, and people who are there to put in the work, this is definitely the place to be.",
    author: "Lee",
    date: "June 2026",
  },
  {
    quote: "Very clean and the owners, Norm and Joana, are very welcoming and kind. The community there is awesome and the equipment always gets the job done.",
    author: "Jeremy Cahigas",
    date: "April 2026",
  },
] as const;

export const roles = [
  {
    title: "Certified personal trainer",
    summary: "Create personal training programs and support members one on one.",
    requirements: ["NASM, ACE, or ISSA certification", "CPR/AED certification", "Training experience", "Strong communication"],
    subject: "Application: Certified Personal Trainer",
  },
  {
    title: "Front desk associate",
    summary: "Welcome members, handle check-ins, and help people get started.",
    requirements: ["Customer service experience", "Friendly communication", "Basic computer skills", "Weekend availability"],
    subject: "Application: Front Desk Associate",
  },
  {
    title: "Group fitness instructor",
    summary: "Lead energizing classes for members at different fitness levels.",
    requirements: ["Group fitness certification", "Class instruction experience", "CPR/AED certification", "Flexible schedule"],
    subject: "Application: Group Fitness Instructor",
  },
] as const;
