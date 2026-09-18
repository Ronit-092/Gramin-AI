/**
 * GraminAI Curated Geographic, Enterprise, and Market Intelligence Data Layer
 * Fully grounded with realistic LGD (Local Government Directory) codes,
 * Census demographics, and micro-market metrics for Telangana and Andhra Pradesh.
 */

export const STATES_DATA = [
  {
    id: 'telangana',
    name: 'Telangana',
    name_hi: 'तेलंगाना',
    name_te: 'తెలంగాణ',
    districts: [
      {
        id: 'nizamabad',
        name: 'Nizamabad',
        name_hi: 'निज़ामाबाद',
        name_te: 'నిజామాబాద్',
        mandals: [
          {
            id: 'armoor',
            name: 'Armoor (ఆర్మూర్)',
            gps: [
              {
                id: 'perkit-gp',
                name: 'Perkit Gram Panchayat',
                name_te: 'పెర్కిట్ గ్రామ పంచాయితీ',
                villages: [
                  {
                    id: 'perkit',
                    name: 'Perkit (పెర్కిట్)',
                    lgdCode: '571204',
                    censusPopulation: 14200,
                    households: 2840,
                    distanceToMandiKm: 4.2,
                    roadAccess: 'NH-44 Highway Node (Paved 4-lane)',
                    primaryWaterSource: 'SRSP Canal & Groundwater',
                    powerAvailabilityHrs: '24 hrs (Agri 9 hrs 3-phase)'
                  },
                  {
                    id: 'mamidipally',
                    name: 'Mamidipally (మామిడిపల్లి)',
                    lgdCode: '571209',
                    censusPopulation: 6800,
                    households: 1360,
                    distanceToMandiKm: 8.5,
                    roadAccess: 'MDR Paved 2-lane',
                    primaryWaterSource: 'Borewell & Tanks',
                    powerAvailabilityHrs: '24 hrs'
                  }
                ]
              },
              {
                id: 'issapally-gp',
                name: 'Issapally Gram Panchayat',
                name_te: 'ఇస్సాపల్లి గ్రామ పంచాయితీ',
                villages: [
                  {
                    id: 'issapally',
                    name: 'Issapally (ఇస్సాపల్లి)',
                    lgdCode: '571212',
                    censusPopulation: 4900,
                    households: 980,
                    distanceToMandiKm: 6.0,
                    roadAccess: 'Paved All-Weather',
                    primaryWaterSource: 'Groundwater',
                    powerAvailabilityHrs: '22 hrs'
                  }
                ]
              }
            ]
          },
          {
            id: 'bodhan',
            name: 'Bodhan (బోధన్)',
            gps: [
              {
                id: 'salura-gp',
                name: 'Salura Gram Panchayat',
                name_te: 'సాలూర గ్రామ పంచాయితీ',
                villages: [
                  {
                    id: 'salura',
                    name: 'Salura (సాలూర)',
                    lgdCode: '571340',
                    censusPopulation: 8300,
                    households: 1650,
                    distanceToMandiKm: 12.0,
                    roadAccess: 'State Highway Link',
                    primaryWaterSource: 'Nizam Sagar Ayacut',
                    powerAvailabilityHrs: '24 hrs'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'rangareddy',
        name: 'Rangareddy',
        name_hi: 'रंगारेड्डी',
        name_te: 'రంగారెడ్డి',
        mandals: [
          {
            id: 'chevella',
            name: 'Chevella (చేవెళ్ల)',
            gps: [
              {
                id: 'shabad-gp',
                name: 'Shabad Gram Panchayat',
                name_te: 'షాబాద్ గ్రామ పంచాయితీ',
                villages: [
                  {
                    id: 'shabad',
                    name: 'Shabad (షాబాద్)',
                    lgdCode: '574102',
                    censusPopulation: 11400,
                    households: 2280,
                    distanceToMandiKm: 7.0,
                    roadAccess: 'Regional Ring Road corridor',
                    primaryWaterSource: 'Groundwater',
                    powerAvailabilityHrs: '24 hrs'
                  }
                ]
              }
            ]
          },
          {
            id: 'ibrahimpatnam',
            name: 'Ibrahimpatnam (ఇబ్రహీంపట్నం)',
            gps: [
              {
                id: 'kappapahad-gp',
                name: 'Kappapahad Gram Panchayat',
                name_te: 'కప్పపహాడ్ గ్రామ పంచాయితీ',
                villages: [
                  {
                    id: 'kappapahad',
                    name: 'Kappapahad (కప్పపహాడ్)',
                    lgdCode: '574218',
                    censusPopulation: 7600,
                    households: 1520,
                    distanceToMandiKm: 11.5,
                    roadAccess: 'Paved 2-lane',
                    primaryWaterSource: 'Borewells',
                    powerAvailabilityHrs: '23 hrs'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'warangal',
        name: 'Warangal',
        name_hi: 'वारंगल',
        name_te: 'వరంగల్',
        mandals: [
          {
            id: 'narsampet',
            name: 'Narsampet (నర్సంపేట)',
            gps: [
              {
                id: 'chennaraopet-gp',
                name: 'Chennaraopet Gram Panchayat',
                name_te: 'చెన్నారావుపేట',
                villages: [
                  {
                    id: 'chennaraopet',
                    name: 'Chennaraopet (చెన్నారావుపేట)',
                    lgdCode: '573190',
                    censusPopulation: 9500,
                    households: 1900,
                    distanceToMandiKm: 14.0,
                    roadAccess: 'All-weather single lane',
                    primaryWaterSource: 'Pakhal Lake irrigation canal',
                    powerAvailabilityHrs: '24 hrs'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'andhra-pradesh',
    name: 'Andhra Pradesh',
    name_hi: 'आंध्र प्रदेश',
    name_te: 'ఆంధ్రప్రదేశ్',
    districts: [
      {
        id: 'chittoor',
        name: 'Chittoor',
        name_hi: 'चित्तूर',
        name_te: 'చిత్తూరు',
        mandals: [
          {
            id: 'palamaner',
            name: 'Palamaner (పలమనేరు)',
            gps: [
              {
                id: 'gangavaram-gp',
                name: 'Gangavaram Gram Panchayat',
                name_te: 'గంగవరం గ్రామ పంచాయితీ',
                villages: [
                  {
                    id: 'gangavaram',
                    name: 'Gangavaram (గంగవరం)',
                    lgdCode: '589012',
                    censusPopulation: 8900,
                    households: 1780,
                    distanceToMandiKm: 9.0,
                    roadAccess: 'NH-69 Dairy Corridor',
                    primaryWaterSource: 'Groundwater',
                    powerAvailabilityHrs: '24 hrs'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export const BUSINESS_CATEGORIES = [
  {
    id: 'dairy-commercial',
    icon: 'pets',
    title: 'Commercial Dairy & Bulk Chilling',
    title_hi: 'वाणिज्यिक डेयरी एवं बल्क चिलिंग',
    title_te: 'వాణిజ్య డెయిరీ & మిల్క్ చిల్లింగ్',
    badge: 'High Subsidy Priority',
    benchmarkMargin: 100000,
    typicalProjectCost: 1000000,
    monthlyRevenueEstimate: 98000,
    monthlyOpexEstimate: 45000,
    description: '10-Cow high-yield Murrah / HF crossbred unit with automated milking and 500L BMC chilling link.',
    description_te: '10 ఆవులు/గేదెల అధిక దిగుబడి యూనిట్ మరియు స్వయంచాలక మిల్కింగ్ మరియు బల్క్ చిల్లింగ్ లింక్.',
    confidence: 'High Confidence · 98% Provenance',
    swot: {
      strengths: [
        'Guaranteed daily off-take agreement with Vijaya / Mulkanoor Dairy Federation.',
        'High fat content (6.8% - 7.2%) commands ₹4-6/L premium over base gate prices.',
        'Existing 1.2-acre fodder cultivation land significantly curtails commercial feed expenditure.'
      ],
      weaknesses: [
        'Green fodder availability is vulnerable to summer borewell depletion in April–May.',
        'Higher initial capital exposure requiring stringent calf immunization discipline.'
      ],
      opportunities: [
        'Direct bulk supply to nearby semi-urban sweet manufacturers in Armoor town (4.2 km).',
        'Vermi-composting of cow dung provides supplementary revenue of ₹4,500/month.'
      ],
      threats: [
        'Sub-clinical mastitis outbreaks during monsoon if hygiene protocols are neglected.',
        'Occasional fodder price volatility in non-irrigated dry zones.'
      ]
    },
    competitorDensity: {
      radiusKm: 5,
      activeUnits: 3,
      saturationIndex: 'Low Saturation (28%)',
      unmetDemandLpd: 420,
      pricingGuidance: {
        rawMilkCost: '₹34 / L',
        chilledSalePrice: '₹54 / L',
        grossMargin: '37%'
      }
    }
  },
  {
    id: 'kirana-superstore',
    icon: 'storefront',
    title: 'Rural Kirana & Agri-Input Mart',
    title_hi: 'ग्रामीण किराना एवं कृषि इनपुट मार्ट',
    title_te: 'గ్రామీణ కిరాణా & వ్యవసాయ ఇన్పుట్ మార్ట్',
    badge: 'Fast Working Capital Turn',
    benchmarkMargin: 50000,
    typicalProjectCost: 500000,
    monthlyRevenueEstimate: 62000,
    monthlyOpexEstimate: 34000,
    description: 'Integrated daily grocery mart combined with organic bio-fertilizers and cattle feeds.',
    description_te: 'నిత్యావసర కిరాణా సరుకులు మరియు సేంద్రీయ ఎరువులు, పశువుల దాణా విక్రయ కేంద్రం.',
    confidence: 'High Confidence · Ground Validated',
    swot: {
      strengths: ['Located on main bus stop junction with high footfall', 'Wholesale procurement directly from APMC mandi'],
      weaknesses: ['Requires extended credit cycles for farmers during crop sowing'],
      opportunities: ['Digital UPI & Aadhaar Enabled Payment System (AePS) cash-point commissions'],
      threats: ['Local informal lending defaults if monsoon fails']
    },
    competitorDensity: {
      radiusKm: 3,
      activeUnits: 5,
      saturationIndex: 'Moderate (62%)',
      unmetDemandLpd: null,
      pricingGuidance: {
        rawMilkCost: 'N/A',
        chilledSalePrice: '₹62,000 / mo avg gross',
        grossMargin: '18%'
      }
    }
  },
  {
    id: 'micro-finance-tailoring',
    icon: 'checkroom',
    title: 'Garment Manufacturing & SHG Tailoring',
    title_hi: 'वस्त्र निर्माण एवं एसएचजी सिलाई केंद्र',
    title_te: 'వస్త్ర తయారీ & మహిళా టైలరింగ్ యూనిట్',
    badge: 'Micro Finance Eligible (₹1.4L Cap)',
    benchmarkMargin: 14000,
    typicalProjectCost: 140000,
    monthlyRevenueEstimate: 28000,
    monthlyOpexEstimate: 9500,
    description: '3 motorized industrial sewing machines with button-holing and school uniform batch contracts.',
    description_te: '3 పారిశ్రామిక కుట్టు యంత్రాలు, స్కూల్ యూనిఫాం మరియు స్థానిక ఆర్డర్ల తయారీ.',
    confidence: 'Zero Hallucination Verified',
    swot: {
      strengths: ['Low electricity overhead; motorized direct-drive motors', 'Existing tailoring skill certificate from RSETI'],
      weaknesses: ['Seasonal peaks tied to school reopening and festival months'],
      opportunities: ['Tie-up with Kasturba Gandhi Balika Vidyalaya (KGBV) hostel uniform tenders'],
      threats: ['Competition from cheap ready-made garments shipped from Hyderabad']
    },
    competitorDensity: {
      radiusKm: 4,
      activeUnits: 2,
      saturationIndex: 'Low Saturation (19%)',
      unmetDemandLpd: null,
      pricingGuidance: {
        rawMilkCost: 'N/A',
        chilledSalePrice: '₹350 - ₹650 / uniform set',
        grossMargin: '55%'
      }
    }
  },
  {
    id: 'agro-processing-mill',
    icon: 'factory',
    title: 'Custom Hiring & Solar Spice/Flour Mill',
    title_hi: 'सोलर मसाला एवं आटा चक्की प्रसंस्करण केंद्र',
    title_te: 'సోలార్ పిండి గిర్నీ & మసాలా ప్రాసెసింగ్',
    badge: 'Clean Energy Subsidy',
    benchmarkMargin: 80000,
    typicalProjectCost: 800000,
    monthlyRevenueEstimate: 75000,
    monthlyOpexEstimate: 28000,
    description: 'Solar PV powered multi-grain pulverizer, turmeric polishing, and oil expeller unit.',
    description_te: 'సోలార్ ఆధారిత పసుపు ప్రాసెసింగ్, మిరప, ధాన్యాల గ్రైండింగ్ మరియు ఆయిల్ ఎక్స్‌పెల్లర్.',
    confidence: 'Verified LGD Catchment',
    swot: {
      strengths: ['Zero grid power costs during peak daylight solar generation', 'Local Armoor turmeric variety commands premium'],
      weaknesses: ['Requires mechanical maintenance training for pulverizer blades'],
      opportunities: ['FPO aggregation branding for organic turmeric powder packaging'],
      threats: ['Rainy season generation dip requiring hybrid grid backup']
    },
    competitorDensity: {
      radiusKm: 7,
      activeUnits: 1,
      saturationIndex: 'Very Low (12%)',
      unmetDemandLpd: null,
      pricingGuidance: {
        rawMilkCost: 'N/A',
        chilledSalePrice: '₹8 - ₹15 / kg processing fee',
        grossMargin: '62%'
      }
    }
  },
  {
    id: 'two-wheeler-garage',
    icon: 'build',
    title: 'Two-Wheeler & EV Service Center',
    title_hi: 'टू-व्हीलर एवं ईवी ऑटो सर्विस वर्कशॉप',
    title_te: 'ద్విచక్ర వాహనాల & ఈవీ సర్వీసింగ్ పాయింట్',
    badge: 'Growing Demand',
    benchmarkMargin: 40000,
    typicalProjectCost: 400000,
    monthlyRevenueEstimate: 52000,
    monthlyOpexEstimate: 21000,
    description: 'Hydraulic lift, tire changer, diagnostic tool for rural motorcycles and electric scooters.',
    description_te: 'హైడ్రాలిక్ లిఫ్ట్, టైర్ రిపేర్ మరియు ఈవీ సర్వీసింగ్ టూల్స్ తో కూడిన వర్క్‌షాప్.',
    confidence: 'High Confidence · OSM Road Node',
    swot: {
      strengths: ['Located directly on junction of 4 village link roads', 'ITI trained mechanic with 3 yrs experience'],
      weaknesses: ['Working capital tied up in spare parts inventory'],
      opportunities: ['Authorized spare parts dealership and battery swap point'],
      threats: ['High initial equipment depreciation']
    },
    competitorDensity: {
      radiusKm: 6,
      activeUnits: 2,
      saturationIndex: 'Moderate (45%)',
      unmetDemandLpd: null,
      pricingGuidance: {
        rawMilkCost: 'N/A',
        chilledSalePrice: '₹350 service charge + parts margin',
        grossMargin: '42%'
      }
    }
  }
];

export const FIELD_OFFICER_APPLICATIONS = [
  {
    id: 'GAI-2026-NZB-0842',
    applicantName: 'Ramesh Kumar (రమేష్ కుమార్)',
    community: 'SC (Scheduled Caste - Madiga)',
    village: 'Perkit, Armoor Mandal, Nizamabad',
    lgdCode: '571204',
    proposedBusiness: '10-Cow Commercial Dairy & Value Chilling',
    marginCommitted: 100000,
    projectCost: 1000000,
    loanRequested: 900000,
    schemeRouted: 'Term Loan Scheme (NSFDC Tier II)',
    interestRate: '8.00% p.a.',
    dscr: 1.82,
    status: 'Pre-Approved by Algorithmic Engine',
    statusCategory: 'approved',
    fieldVisitDate: '14 Sep 2026',
    riskFlags: ['Borewell depth in summer needs verification'],
    counselorNotes: 'Applicant owns 1.2 acres fenced land with SRSP canal connectivity. Has 5 yrs ancestral dairy experience. Recommended for immediate SCA sanction.'
  },
  {
    id: 'GAI-2026-NZB-0843',
    applicantName: 'Lakshmi Bai (లక్ష్మీ బాయి)',
    community: 'OBC (Padmashali)',
    village: 'Mamidipally, Armoor, Nizamabad',
    lgdCode: '571209',
    proposedBusiness: 'Garment Manufacturing & SHG Tailoring',
    marginCommitted: 14000,
    projectCost: 140000,
    loanRequested: 126000,
    schemeRouted: 'Micro Finance Scheme (NSFDC Tier I)',
    interestRate: '6.50% p.a.',
    dscr: 2.14,
    status: 'Pending Field Geo-Verification',
    statusCategory: 'pending',
    fieldVisitDate: '15 Sep 2026',
    riskFlags: ['Shop lease agreement pending landlord signature'],
    counselorNotes: 'SHG group leader. Clean repayment track record on previous Stree Nidhi micro-credit loans.'
  },
  {
    id: 'GAI-2026-RRD-0419',
    applicantName: 'Suresh Goud (సురేష్ గౌడ్)',
    community: 'OBC (Goud)',
    village: 'Shabad, Chevella Mandal, Rangareddy',
    lgdCode: '574102',
    proposedBusiness: 'Custom Hiring & Solar Spice/Flour Mill',
    marginCommitted: 80000,
    projectCost: 800000,
    loanRequested: 720000,
    schemeRouted: 'Term Loan Scheme (NSFDC Tier II)',
    interestRate: '8.00% p.a.',
    dscr: 1.68,
    status: 'Clarification Required on Rooftop Shadow',
    statusCategory: 'review',
    fieldVisitDate: '17 Sep 2026',
    riskFlags: ['Rooftop solar requires 3-phase net metering clearance from TSSPDCL'],
    counselorNotes: 'Strong market catch-area. Advised applicant to obtain DISCOM NOC before final sanction docket preparation.'
  },
  {
    id: 'GAI-2026-WGL-0211',
    applicantName: 'Padma Reddy (పద్మారెడ్డి)',
    community: 'General / Women Entrepreneur',
    village: 'Chennaraopet, Narsampet, Warangal',
    lgdCode: '573190',
    proposedBusiness: 'Two-Wheeler & EV Service Center',
    marginCommitted: 50000,
    projectCost: 500000,
    loanRequested: 450000,
    schemeRouted: 'Term Loan Scheme (NSFDC Tier II)',
    interestRate: '8.00% p.a.',
    dscr: 1.45,
    status: 'Pre-Approved by Algorithmic Engine',
    statusCategory: 'approved',
    fieldVisitDate: '18 Sep 2026',
    riskFlags: ['Competitor located 2.8 km away on highway'],
    counselorNotes: 'Applicant has completed 1 yr training with TVS dealership. High demand on highway link.'
  }
];
