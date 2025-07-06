
export interface Supplier {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
    country: string;
    lat: number;
    lng: number;
  };
  riskLevel: 'low' | 'medium' | 'high';
  esgScore: number;
  lastAudit: string;
  certifications: string[];
  categories: {
    carbonEmissions: number;
    renewableEnergy: number;
    wasteManagement: number;
    waterStewardship: number;
    sustainableSourcing: number;
    laborPractices: number;
    environmentalCompliance: number;
    packagingSustainability: number;
    transparency: number;
    certifications: number;
  };
  riskEvents: Array<{
    id: string;
    type: string;
    severity: 'low' | 'medium' | 'high';
    date: string;
    description: string;
  }>;
  documents: Array<{
    id: string;
    name: string;
    category: string;
    uploadDate: string;
    status: 'approved' | 'pending' | 'rejected';
  }>;
}

export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'ABC Manufacturing Ltd.',
    location: {
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      lat: 19.0760,
      lng: 72.8777
    },
    riskLevel: 'low',
    esgScore: 85,
    lastAudit: '2024-01-15',
    certifications: ['ISO 14001', 'SA8000', 'Fair Trade'],
    categories: {
      carbonEmissions: 88,
      renewableEnergy: 82,
      wasteManagement: 90,
      waterStewardship: 85,
      sustainableSourcing: 87,
      laborPractices: 92,
      environmentalCompliance: 89,
      packagingSustainability: 83,
      transparency: 78,
      certifications: 95
    },
    riskEvents: [
      {
        id: '1',
        type: 'Environmental Compliance',
        severity: 'low',
        date: '2024-02-01',
        description: 'Minor wastewater treatment adjustment required'
      }
    ],
    documents: [
      {
        id: '1',
        name: 'Carbon Footprint Report 2024',
        category: 'Carbon Emissions',
        uploadDate: '2024-01-10',
        status: 'approved'
      },
      {
        id: '2',
        name: 'Labor Audit Certificate',
        category: 'Labor Practices',
        uploadDate: '2024-01-08',
        status: 'approved'
      }
    ]
  },
  {
    id: '2',
    name: 'Delhi Textiles Pvt Ltd',
    location: {
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India',
      lat: 28.6139,
      lng: 77.2090
    },
    riskLevel: 'medium',
    esgScore: 68,
    lastAudit: '2023-11-20',
    certifications: ['ISO 14001'],
    categories: {
      carbonEmissions: 65,
      renewableEnergy: 45,
      wasteManagement: 72,
      waterStewardship: 68,
      sustainableSourcing: 70,
      laborPractices: 75,
      environmentalCompliance: 82,
      packagingSustainability: 60,
      transparency: 58,
      certifications: 65
    },
    riskEvents: [
      {
        id: '2',
        type: 'Labor Practices',
        severity: 'medium',
        date: '2024-01-20',
        description: 'Overtime hours exceeded recommended limits'
      }
    ],
    documents: [
      {
        id: '3',
        name: 'Environmental Impact Assessment',
        category: 'Environmental Compliance',
        uploadDate: '2023-12-15',
        status: 'pending'
      }
    ]
  },
  {
    id: '3',
    name: 'Bangalore Electronics Corp',
    location: {
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      lat: 12.9716,
      lng: 77.5946
    },
    riskLevel: 'high',
    esgScore: 45,
    lastAudit: '2023-08-10',
    certifications: [],
    categories: {
      carbonEmissions: 35,
      renewableEnergy: 25,
      wasteManagement: 50,
      waterStewardship: 42,
      sustainableSourcing: 38,
      laborPractices: 55,
      environmentalCompliance: 60,
      packagingSustainability: 45,
      transparency: 30,
      certifications: 20
    },
    riskEvents: [
      {
        id: '3',
        type: 'Environmental Violation',
        severity: 'high',
        date: '2024-01-25',
        description: 'Exceeded permitted emission levels'
      },
      {
        id: '4',
        type: 'Labor Compliance',
        severity: 'high',
        date: '2024-01-18',
        description: 'Audit found workplace safety violations'
      }
    ],
    documents: [
      {
        id: '4',
        name: 'Emission Control Report',
        category: 'Carbon Emissions',
        uploadDate: '2023-10-01',
        status: 'rejected'
      }
    ]
  },
  {
    id: '4',
    name: 'Chennai Auto Parts Ltd',
    location: {
      city: 'Chennai',
      state: 'Tamil Nadu',
      country: 'India',
      lat: 13.0827,
      lng: 80.2707
    },
    riskLevel: 'low',
    esgScore: 78,
    lastAudit: '2024-02-01',
    certifications: ['ISO 14001', 'ISO 50001'],
    categories: {
      carbonEmissions: 80,
      renewableEnergy: 75,
      wasteManagement: 85,
      waterStewardship: 78,
      sustainableSourcing: 82,
      laborPractices: 88,
      environmentalCompliance: 90,
      packagingSustainability: 70,
      transparency: 72,
      certifications: 85
    },
    riskEvents: [],
    documents: [
      {
        id: '5',
        name: 'Renewable Energy Certificate',
        category: 'Renewable Energy',
        uploadDate: '2024-01-20',
        status: 'approved'
      }
    ]
  },
  {
    id: '5',
    name: 'Kolkata Steel Works',
    location: {
      city: 'Kolkata',
      state: 'West Bengal',
      country: 'India',
      lat: 22.5726,
      lng: 88.3639
    },
    riskLevel: 'medium',
    esgScore: 62,
    lastAudit: '2023-12-05',
    certifications: ['ISO 14001'],
    categories: {
      carbonEmissions: 55,
      renewableEnergy: 40,
      wasteManagement: 68,
      waterStewardship: 60,
      sustainableSourcing: 65,
      laborPractices: 70,
      environmentalCompliance: 75,
      packagingSustainability: 58,
      transparency: 65,
      certifications: 60
    },
    riskEvents: [
      {
        id: '5',
        type: 'Water Usage',
        severity: 'medium',
        date: '2024-01-12',
        description: 'Water consumption above sustainable levels'
      }
    ],
    documents: [
      {
        id: '6',
        name: 'Water Usage Report',
        category: 'Water Stewardship',
        uploadDate: '2023-11-30',
        status: 'pending'
      }
    ]
  }
];

export const esgCategories = [
  {
    id: 'carbonEmissions',
    name: 'Carbon Emissions & Energy Use',
    description: 'Measure and reduce Scope 1, 2, and 3 emissions',
    requiredDocuments: [
      'GHG Inventory Reports',
      'Third-party certifications (Carbon Trust)',
      'Utility bills or energy management data',
      'IoT-connected meter data'
    ]
  },
  {
    id: 'renewableEnergy',
    name: 'Renewable Energy Use',
    description: 'Percentage of energy from renewable sources',
    requiredDocuments: [
      'Renewable Energy Certificates (RECs)',
      'Utility contracts showing green tariffs',
      'On-site generation data'
    ]
  },
  {
    id: 'wasteManagement',
    name: 'Waste Management',
    description: 'Practices for reducing, reusing, recycling waste',
    requiredDocuments: [
      'Waste diversion rate reports',
      'Third-party waste management receipts',
      'TRUE Zero Waste certifications'
    ]
  },
  {
    id: 'waterStewardship',
    name: 'Water Use and Stewardship',
    description: 'Managing water consumption and wastewater responsibly',
    requiredDocuments: [
      'Water meter readings',
      'Audited water usage reports',
      'Alliance for Water Stewardship certifications'
    ]
  },
  {
    id: 'sustainableSourcing',
    name: 'Sustainable Sourcing of Inputs',
    description: 'Using certified raw materials (FSC, organic)',
    requiredDocuments: [
      'Certificates from standards organizations',
      'Chain-of-custody documentation'
    ]
  },
  {
    id: 'laborPractices',
    name: 'Ethical Labor Practices',
    description: 'No forced labor, child labor, fair wages',
    requiredDocuments: [
      'Social audits (SMETA)',
      'Supplier Code of Conduct signatures',
      'Audit reports from SGS or Intertek'
    ]
  },
  {
    id: 'environmentalCompliance',
    name: 'Environmental Regulations Compliance',
    description: 'Meeting local environmental laws',
    requiredDocuments: [
      'Government permits',
      'Inspection reports',
      'Legal compliance certificates'
    ]
  },
  {
    id: 'packagingSustainability',
    name: 'Packaging Sustainability',
    description: 'Recyclable, minimal, responsibly sourced packaging',
    requiredDocuments: [
      'Packaging specifications',
      'FSC certifications for paper',
      'Packaging sustainability audits'
    ]
  },
  {
    id: 'transparency',
    name: 'Reporting and Transparency',
    description: 'Willingness to share sustainability data',
    requiredDocuments: [
      'Participation in Walmart Sustainability Index',
      'Annual sustainability reports',
      'Project Gigaton reporting data'
    ]
  },
  {
    id: 'certifications',
    name: 'Third-Party Certifications',
    description: 'Industry-recognized certifications',
    requiredDocuments: [
      'ISO 14001 (Environmental Management)',
      'ISO 50001 (Energy Management)',
      'SA8000 (Social Accountability)',
      'Rainforest Alliance, Fair Trade, Organic',
      'GHG Protocol compliance'
    ]
  }
];
