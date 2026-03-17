// ─── Unit / Configuration ───
export const UNIT_SIZE_OPTIONS = ['2BHK', '2.5BHK', '3BHK', '4BHK', '5BHK'] // No change needed

// ─── Project Classification ───
// Flats & Sky Villas share the full list
export const PROJECT_TYPE_OPTIONS = [
  'Standalone',
  'Semi-Gated',
  'Fully Gated (up to 5 Floors)',
  'Low-Rise (6–10 Floors)',
  'Mid-Rise (11–14 Floors)',
  'High-Rise (15–24 Floors)',
  'High-Rise Premium (25–39 Floors)',
  'Skyscrapers (40+ Floors)',
]

// Villas use a simpler list
export const VILLAS_PROJECT_TYPE_OPTIONS = [
  'Standalone',
  'Semi-Gated',
  'Fully Gated',
]

// ─── Possession Timeline ───
export const PROJECT_STATUS_OPTIONS = [
  'Ready to Move',
  '6 Months',
  '2027',
  '2028',
  '2029',
  '2030',
]

// ─── Property Condition ───
export const PROPERTY_AGE_OPTIONS = ['New Projects', 'New Properties', 'Used Properties']

// ─── Investment Benefits ───
export const SPECIAL_OFFER_OPTIONS = [
  'Rental Yield Offers',
  'One-Time Settlement',
  '50:50 Payment Plan',
  'Pre-EMI Support',
  'Low Downpayment',
  'No GST',
  'Complimentary Benefits',
  'Others',
]

// ─── Plots: Project Classification ───
export const PLOT_PROJECT_TYPE_OPTIONS = [
  'Independent Plot',
  'Semi-Gated Layout',
  'Fully Gated Layout',
  'Fully Gated with Clubhouse',
]

// ─── Plots: Approvals ───
export const PLOT_APPROVAL_OPTIONS = ['GHMC', 'HMDA', 'DTCP', 'Gram Panchayat']

// ─── Plots: Final Layout Permission ───
export const PLOT_FINAL_PERMISSION_OPTIONS = ['Received', 'Not Received']

// ─── Plots: Plot Type ───
export const PLOT_TYPE_OPTIONS = [
  'Ready for Construction',
  'Construction (1–5 years)',
  'Others',
]

// ─── Plots: Sale Type ───
export const PLOT_SALE_TYPE_OPTIONS = [
  'Direct Sale (Developer / Landlord)',
  'Resale',
]

// ─── Plots: Speciality ───
export const SPECIALITY_PROJECT_OPTIONS = [
  'Villa Plots',
  'Spiritual',
  'Plantation',
  'Farmhouse',
  'Organic Farming',
  'Integrated Township',
]

export const PLOT_SIZE_OPTIONS = ['120 Sq.Yd', '180 Sq.Yd', '240 Sq.Yd', '300 Sq.Yd+']

// ─── Budget Range ───
export const BUDGET_OPTIONS = [
  { label: '₹10L', value: '10' },
  { label: '₹20L', value: '20' },
  { label: '₹30L', value: '30' },
  { label: '₹40L', value: '40' },
  { label: '₹50L', value: '50' },
  { label: '₹75L', value: '75' },
  { label: '₹1Cr', value: '100' },
]

// ─── Flats: Per Sqft (₹5K–₹25K, ₹1K increments) ───
export const FLATS_PER_SQFT_OPTIONS = [
  { label: '₹5,000', value: '5000' },
  { label: '₹6,000', value: '6000' },
  { label: '₹7,000', value: '7000' },
  { label: '₹8,000', value: '8000' },
  { label: '₹9,000', value: '9000' },
  { label: '₹10,000', value: '10000' },
  { label: '₹11,000', value: '11000' },
  { label: '₹12,000', value: '12000' },
  { label: '₹13,000', value: '13000' },
  { label: '₹14,000', value: '14000' },
  { label: '₹15,000', value: '15000' },
  { label: '₹16,000', value: '16000' },
  { label: '₹17,000', value: '17000' },
  { label: '₹18,000', value: '18000' },
  { label: '₹19,000', value: '19000' },
  { label: '₹20,000', value: '20000' },
  { label: '₹21,000', value: '21000' },
  { label: '₹22,000', value: '22000' },
  { label: '₹23,000', value: '23000' },
  { label: '₹24,000', value: '24000' },
  { label: '₹25,000', value: '25000' },
]

// ─── Flats: Overall ───
export const FLATS_OVERALL_OPTIONS = [
  { label: '₹10L', value: '10' },
  { label: '₹20L', value: '20' },
  { label: '₹30L', value: '30' },
  { label: '₹40L', value: '40' },
  { label: '₹50L', value: '50' },
  { label: '₹60L', value: '60' },
  { label: '₹70L', value: '70' },
  { label: '₹80L', value: '80' },
  { label: '₹90L', value: '90' },
  { label: '₹1Cr', value: '100' },
  { label: '₹1.5Cr', value: '150' },
  { label: '₹2Cr', value: '200' },
  { label: '₹2.5Cr', value: '250' },
  { label: '₹3Cr', value: '300' },
  { label: '₹3.5Cr', value: '350' },
  { label: '₹4Cr', value: '400' },
  { label: '₹4.5Cr', value: '450' },
  { label: '₹5Cr', value: '500' },
  { label: '₹5.5Cr', value: '550' },
  { label: '₹6Cr', value: '600' },
  { label: '₹6.5Cr', value: '650' },
  { label: '₹7Cr', value: '700' },
  { label: '₹7.5Cr', value: '750' },
]

// ─── Sky Villas: Per Sqft (₹5K–₹25K, ₹1K increments) ───
export const SKY_VILLAS_PER_SQFT_OPTIONS = [
  { label: '₹5,000', value: '5000' },
  { label: '₹6,000', value: '6000' },
  { label: '₹7,000', value: '7000' },
  { label: '₹8,000', value: '8000' },
  { label: '₹9,000', value: '9000' },
  { label: '₹10,000', value: '10000' },
  { label: '₹11,000', value: '11000' },
  { label: '₹12,000', value: '12000' },
  { label: '₹13,000', value: '13000' },
  { label: '₹14,000', value: '14000' },
  { label: '₹15,000', value: '15000' },
  { label: '₹16,000', value: '16000' },
  { label: '₹17,000', value: '17000' },
  { label: '₹18,000', value: '18000' },
  { label: '₹19,000', value: '19000' },
  { label: '₹20,000', value: '20000' },
  { label: '₹21,000', value: '21000' },
  { label: '₹22,000', value: '22000' },
  { label: '₹23,000', value: '23000' },
  { label: '₹24,000', value: '24000' },
  { label: '₹25,000', value: '25000' },
]

// ─── Sky Villas: Overall ───
export const SKY_VILLAS_OVERALL_OPTIONS = [
  { label: '₹1Cr', value: '100' },
  { label: '₹1.5Cr', value: '150' },
  { label: '₹2Cr', value: '200' },
  { label: '₹2.5Cr', value: '250' },
  { label: '₹3Cr', value: '300' },
  { label: '₹3.5Cr', value: '350' },
  { label: '₹4Cr', value: '400' },
  { label: '₹4.5Cr', value: '450' },
  { label: '₹5Cr', value: '500' },
  { label: '₹5.5Cr', value: '550' },
  { label: '₹6Cr', value: '600' },
  { label: '₹6.5Cr', value: '650' },
  { label: '₹7Cr', value: '700' },
  { label: '₹7.5Cr', value: '750' },
  { label: '₹8Cr', value: '800' },
  { label: '₹8.5Cr', value: '850' },
  { label: '₹9Cr', value: '900' },
  { label: '₹9.5Cr', value: '950' },
  { label: '₹10Cr', value: '1000' },
  { label: '₹12Cr', value: '1200' },
  { label: '₹15Cr', value: '1500' },
]

// ─── Villas: Per Sqft (₹3K–₹15K, ₹1K increments) ───
export const VILLAS_PER_SQFT_OPTIONS = [
  { label: '₹3,000', value: '3000' },
  { label: '₹4,000', value: '4000' },
  { label: '₹5,000', value: '5000' },
  { label: '₹6,000', value: '6000' },
  { label: '₹7,000', value: '7000' },
  { label: '₹8,000', value: '8000' },
  { label: '₹9,000', value: '9000' },
  { label: '₹10,000', value: '10000' },
  { label: '₹11,000', value: '11000' },
  { label: '₹12,000', value: '12000' },
  { label: '₹13,000', value: '13000' },
  { label: '₹14,000', value: '14000' },
  { label: '₹15,000', value: '15000' },
]

// ─── Villas: Overall ───
export const VILLAS_OVERALL_OPTIONS = [
  { label: '₹50L', value: '50' },
  { label: '₹60L', value: '60' },
  { label: '₹70L', value: '70' },
  { label: '₹80L', value: '80' },
  { label: '₹90L', value: '90' },
  { label: '₹1Cr', value: '100' },
  { label: '₹1.25Cr', value: '125' },
  { label: '₹1.5Cr', value: '150' },
  { label: '₹1.75Cr', value: '175' },
  { label: '₹2Cr', value: '200' },
  { label: '₹2.25Cr', value: '225' },
  { label: '₹2.5Cr', value: '250' },
  { label: '₹2.75Cr', value: '275' },
  { label: '₹3Cr', value: '300' },
  { label: '₹3.5Cr', value: '350' },
  { label: '₹4Cr', value: '400' },
  { label: '₹4.5Cr', value: '450' },
  { label: '₹5Cr', value: '500' },
]

// ─── Plots: Per Sq Yard (₹5K increments→₹50K, then ₹25K→₹2L) ───
export const PLOTS_PER_SQYD_OPTIONS = [
  { label: '₹5,000', value: '5000' },
  { label: '₹10,000', value: '10000' },
  { label: '₹15,000', value: '15000' },
  { label: '₹20,000', value: '20000' },
  { label: '₹25,000', value: '25000' },
  { label: '₹30,000', value: '30000' },
  { label: '₹35,000', value: '35000' },
  { label: '₹40,000', value: '40000' },
  { label: '₹45,000', value: '45000' },
  { label: '₹50,000', value: '50000' },
  { label: '₹75,000', value: '75000' },
  { label: '₹1,00,000', value: '100000' },
  { label: '₹1,25,000', value: '125000' },
  { label: '₹1,50,000', value: '150000' },
  { label: '₹1,75,000', value: '175000' },
  { label: '₹2,00,000', value: '200000' },
]

// ─── Plots: Overall ───
export const PLOTS_OVERALL_OPTIONS = [
  { label: '₹20L', value: '20' },
  { label: '₹30L', value: '30' },
  { label: '₹40L', value: '40' },
  { label: '₹50L', value: '50' },
  { label: '₹60L', value: '60' },
  { label: '₹70L', value: '70' },
  { label: '₹80L', value: '80' },
  { label: '₹90L', value: '90' },
  { label: '₹1Cr', value: '100' },
  { label: '₹1.25Cr', value: '125' },
  { label: '₹1.5Cr', value: '150' },
  { label: '₹2Cr', value: '200' },
  { label: '₹2.5Cr', value: '250' },
]

// ─── ORR Distance ───
export const ORR_DISTANCE_OPTIONS = ['0-5 Km', '5-10 Km', '10-20 Km', '20-30 Km', '30+ Km']
