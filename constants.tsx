import { 
  Globe, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Users 
} from 'lucide-react';
import { Service, Project, NavItem, StatItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

export const SERVICES: Service[] = [
  {
    id: 'exploration',
    title: 'Oil Exploration & Production',
    description: 'Advanced onshore and offshore exploration utilizing cutting-edge seismic technology and responsible drilling practices.',
    iconName: 'Droplets',
    image: 'https://picsum.photos/id/1031/800/600',
  },
  {
    id: 'refining',
    title: 'Refining & Processing',
    description: 'State-of-the-art crude refining capabilities delivering high-quality fuels, petrochemicals, and lubricants.',
    iconName: 'Factory',
    image: 'https://picsum.photos/id/142/800/600',
  },
  {
    id: 'logistics',
    title: 'Distribution & Logistics',
    description: 'Integrated pipeline systems, tanker transport fleets, and strategic storage facilities ensuring global supply chain security.',
    iconName: 'Truck',
    image: 'https://picsum.photos/id/192/800/600',
  },
  {
    id: 'trading',
    title: 'Energy Trading',
    description: 'Global trading desks managing crude oil, refined products, and bulk energy supply with sophisticated risk management.',
    iconName: 'TrendingUp',
    image: 'https://picsum.photos/id/204/800/600',
  },
  {
    id: 'support',
    title: 'Industrial Support Services',
    description: 'Comprehensive engineering support, equipment procurement, and maintenance services for energy infrastructure.',
    iconName: 'Wrench',
    image: 'https://picsum.photos/id/250/800/600',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'North Sea Deepwater Platform',
    location: 'Aberdeen, UK',
    description: 'Installation of a semi-submersible production unit capable of processing 150,000 barrels per day.',
    category: 'Upstream',
    image: 'https://picsum.photos/id/180/600/400',
  },
  {
    id: 'p2',
    title: 'Sahara Pipeline Expansion',
    location: 'Algeria',
    description: 'Construction of a 500km high-pressure gas pipeline to increase export capacity to Southern Europe.',
    category: 'Infrastructure',
    image: 'https://picsum.photos/id/234/600/400',
  },
  {
    id: 'p3',
    title: 'Singapore Refinery Upgrade',
    location: 'Jurong Island, Singapore',
    description: 'Modernization of cracking units to produce cleaner, low-sulfur marine fuels compliant with IMO 2020.',
    category: 'Downstream',
    image: 'https://picsum.photos/id/257/600/400',
  },
  {
    id: 'p4',
    title: 'Gulf Coast LNG Terminal',
    location: 'Texas, USA',
    description: 'Development of a major liquefaction plant and export terminal for global LNG distribution.',
    category: 'Infrastructure',
    image: 'https://picsum.photos/id/384/600/400',
  },
  {
    id: 'p5',
    title: 'Offshore Wind Integration',
    location: 'Rotterdam, Netherlands',
    description: 'Hybrid energy project integrating offshore wind power to electrify platform operations.',
    category: 'Upstream',
    image: 'https://picsum.photos/id/412/600/400',
  },
  {
    id: 'p6',
    title: 'Biofuel Processing Plant',
    location: 'São Paulo, Brazil',
    description: 'Sustainable aviation fuel production facility utilizing agricultural feedstock.',
    category: 'Downstream',
    image: 'https://picsum.photos/id/526/600/400',
  },
];

export const WHY_CHOOSE_US = [
  {
    title: '24/7 Operations',
    description: 'Uninterrupted energy production and monitoring systems ensuring constant supply.',
    icon: Clock,
  },
  {
    title: 'Global Partnerships',
    description: 'Strategic alliances with major NOCs and IOCs across 15 countries.',
    icon: Globe,
  },
  {
    title: 'Safety First',
    description: 'Industry-leading HSSE standards protecting our people and the environment.',
    icon: ShieldCheck,
  },
  {
    title: 'Innovation',
    description: 'Investing in digital transformation and renewable integration technologies.',
    icon: Zap,
  },
  {
    title: 'Reliable Delivery',
    description: 'A proven track record of meeting supply commitments on time, every time.',
    icon: Users,
  },
];

export const COMPANY_STATS: StatItem[] = [
  { label: 'Years of Excellence', value: '25+' },
  { label: 'Countries Operated', value: '18' },
  { label: 'Projects Completed', value: '140+' },
  { label: 'Barrels / Day', value: '250k' },
];