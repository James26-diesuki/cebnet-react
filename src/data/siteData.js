// =========================================
// CEBNET — SITE DATA (replaces config.php)
// Edit this file to update all site content
// =========================================

export const SITE = {
  name:         'CebNet Technologies, Inc.',
  tagline:      'Focus-Oriented Systems Integration & Network Security',
  email:        'info@cebnet.com.ph',
  phone1:       '+63 912 342 5566',
  phone2:       '+63 917 123 4567',
  phone1Label:  'SMART',
  phone2Label:  'Globe',
  address:      '2nd Floor, Philippine Veterans Bank Building, Osmeña Boulevard, Cebu City 6000 Philippines',
  businessHours: 'Mon–Fri: 8:00 AM – 6:00 PM',
}

export const STATS = {
  clients:      { value: 200, suffix: '+' },
  years:        { value: 7,   suffix: '+' },
  engineers:    { value: 50,  suffix: '+' },
  incidents:    { value: 200, suffix: '+' },
  satisfaction: { value: 99.9, suffix: '%' },
}

export const NAV_LINKS = [
  { label: 'Home',        to: '/' },
  {
    label: 'Our Company',
    to: '/company',
    children: [
      { label: 'Our Company', to: '/company' },
      { label: 'Our Team',    to: '/team'    },
    ],
  },
  { label: 'Services',    to: '/services' },
  { label: 'Partners',    to: '/partners' },
  { label: 'Careers',     to: '/careers' },
  { label: 'Contact Us',  to: '/contact' },
]

export const SERVICES = [
  {
    icon: 'network',
    title: 'Systems Integration',
    desc: 'Build your network from the ground up the right way, or re-engineer your current system to optimize processes and create better synergies.',
  },
  {
    icon: 'shield',
    title: 'Network Security',
    desc: 'Secure your network from digital vulnerabilities. Our certified consultants protect your business assets and data with enterprise-grade solutions.',
  },
  {
    icon: 'server',
    title: 'IT Infrastructure',
    desc: "Design, deploy, and maintain scalable IT infrastructure that supports your organization's goals and keeps you competitive.",
  },
  {
    icon: 'consulting',
    title: 'IT Consulting',
    desc: 'Highly skilled and certified IT consultants with multidisciplinary experience help you craft a technology vision and path forward.',
  },
  {
    icon: 'cloud',
    title: 'Cloud Solutions',
    desc: 'Migrate, optimize, and manage workloads in the cloud for greater agility, reduced cost, and improved resilience.',
  },
  {
    icon: 'support',
    title: 'Managed Support',
    desc: 'Proactive monitoring and around-the-clock support so your team stays focused on business while we keep the lights on.',
  },
  {
    icon: 'vapt',
    title: 'Vulnerability Assessment & Penetration Testing',
    desc: 'Identify and address security weaknesses before attackers do. Our certified ethical hackers simulate real-world threats to expose vulnerabilities across your network, systems, and applications.',
  },
]

export const TESTIMONIALS = [
  {
    quote: 'CebNet helped us overhaul our entire network infrastructure. Their team was professional, thorough, and genuinely cared about the outcome. We now have a secure and scalable environment that supports our growth.',
    company: 'Aboitiz Group',
    role: 'IT Director',
  },
  {
    quote: "The security audit they performed uncovered vulnerabilities we didn't know existed. Their remediation plan was clear and efficient. We've had zero incidents since.",
    company: 'Cebu Pacific Land',
    role: 'Chief Technology Officer',
  },
  {
    quote: "What sets CebNet apart is their consultative approach. They don't just sell products — they understand your business needs and build the right solution around them.",
    company: 'SM Seaside City Cebu',
    role: 'Operations Manager',
  },
]

// ─────────────────────────────────────────────
// PARTNERS — edit this array to add/remove/update
// logos go in /public/assets/img/partners/
// ─────────────────────────────────────────────
export const PARTNERS = [
  { name: 'Cisco',            logo: '/assets/img/partners/cisco.png',           desc: 'Networking, collaboration & cybersecurity platforms',     level: 'Gold'   },
  { name: 'Fortinet',         logo: '/assets/img/partners/fortinet.png',        desc: 'Next-generation firewalls & unified threat management',   level: 'Gold'   },
  { name: 'Trend Micro',      logo: '/assets/img/partners/trendmicro.png',      desc: 'Endpoint security & advanced threat protection',          level: 'Gold'   },
  { name: 'Check Point',      logo: '/assets/img/partners/checkpoint.png',      desc: 'Cyber security — network, cloud & mobile security',      level: 'Gold'   },
  { name: 'Panduit',          logo: '/assets/img/partners/panduit.png',         desc: 'Network infrastructure & physical layer solutions',       level: 'Silver' },
  { name: 'ManageEngine',     logo: '/assets/img/partners/manageengine.png',    desc: 'IT management software for enterprise environments',      level: 'Silver' },
  { name: 'Extreme Networks', logo: '/assets/img/partners/extremenetworks.png', desc: 'Enterprise-grade wireless LAN & switching solutions',     level: 'Silver' },
  { name: 'Vertiv',           logo: '/assets/img/partners/vertiv.png',          desc: 'Critical digital infrastructure & continuity solutions', level: 'Silver' },
  { name: 'APC',              logo: '/assets/img/partners/apc.png',             desc: 'Power management & data center infrastructure',          level: 'Bronze' },
]

// ─────────────────────────────────────────────
// CLIENTS — logos go in /public/assets/img/clients/
// ─────────────────────────────────────────────
export const CLIENTS = [
  { name: 'ARC Hospital',                      logo: '/assets/img/clients/arc_hospital.jpg' },
  { name: 'BAI Hotel Cebu',                    logo: '/assets/img/clients/bai.jpg'          },
  { name: 'RD Pawnshop',                       logo: '/assets/img/clients/RD_pawnshop.png'  },
  { name: 'Eastern Communication',             logo: '/assets/img/clients/EC.png'           },
  { name: 'PHCCI',                             logo: '/assets/img/clients/phcci.png'        },
  { name: 'Bluewaters',                        logo: '/assets/img/clients/bluewaters.png'   },
  { name: 'Kyocera',                           logo: '/assets/img/clients/kyocera.png'      },
  { name: 'Mactan Cebu International Airport', logo: '/assets/img/clients/mactan_cebu.png'  },
  { name: 'Cebu Oversea Builders',             logo: '/assets/img/clients/cebu_builders.png'},
]

export const JOBS = [
  { title: 'Network Engineer',            dept: 'Engineering', type: 'Full-time', loc: 'Cebu City' },
  { title: 'Cybersecurity Analyst',       dept: 'Security',    type: 'Full-time', loc: 'Cebu City' },
  { title: 'IT Infrastructure Consultant',dept: 'Consulting',  type: 'Full-time', loc: 'Cebu City' },
  { title: 'Systems Administrator',       dept: 'Operations',  type: 'Full-time', loc: 'Cebu City' },
  { title: 'Pre-Sales Technical Engineer',dept: 'Sales',       type: 'Full-time', loc: 'Cebu City' },
  { title: 'IT Support Specialist',       dept: 'Support',     type: 'Full-time', loc: 'Cebu City' },
]

export const BENEFITS = [
  {
    img:   'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
    title: 'Vendor Certifications',
    desc:  'We sponsor certifications from Fortinet, Cisco, Check Point, and more to advance your career.',
  },
  {
    img:   'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    title: 'Career Growth',
    desc:  'Clear pathways from junior engineer to senior consultant and beyond.',
  },
  {
    img:   'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    title: 'Health Benefits',
    desc:  'Comprehensive HMO coverage for you and your dependents.',
  },
  {
    img:   'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    title: 'Collaborative Culture',
    desc:  'A team of professionals who support each other and celebrate shared wins.',
  },
  {
    img:   'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    title: 'Diverse Projects',
    desc:  'Work across industries — banking, retail, healthcare, government, and more.',
  },
  {
    img:   'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80',
    title: 'Competitive Leave',
    desc:  'Generous vacation and sick leave policy, plus special leave benefits.',
  },
]
