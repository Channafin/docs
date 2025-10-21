import {
  DollarSign,
  Building,
  FileText,
  Users,
  UserCircle,
  Briefcase,
  User
} from 'lucide-react';

export const roles = [
  {
    id: 'treasurer',
    name: 'Treasurer',
    type: 'Board',
    icon: DollarSign,
    color: 'blue'
  },
  {
    id: 'exec_director',
    name: 'Executive Director',
    type: 'Staff',
    icon: Building,
    color: 'green'
  },
  {
    id: 'outsourced_bookkeeper',
    name: 'Outsourced Bookkeeper',
    type: 'External',
    icon: FileText,
    color: 'teal'
  },
  {
    id: 'board_chair',
    name: 'Board Chair',
    type: 'Board',
    icon: Users,
    color: 'indigo'
  },
  {
    id: 'finance_committee',
    name: 'Finance Committee Member',
    type: 'Board',
    icon: UserCircle,
    color: 'purple'
  },
  {
    id: 'program_staff',
    name: 'Program Staff',
    type: 'Staff',
    icon: Briefcase,
    color: 'emerald'
  },
  {
    id: 'admin_staff',
    name: 'Administrative Staff',
    type: 'Staff',
    icon: User,
    color: 'cyan'
  }
];
