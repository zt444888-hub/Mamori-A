export type RoleMode = 'senior' | 'caregiver';

export type ScreenId = 
  | 'senior_home' 
  | 'scanner' 
  | 'caregiver_dashboard' 
  | 'onboarding' 
  | 'history' 
  | 'security_alert' 
  | 'subscription' 
  | 'legal'
  | 'medication';

export interface MedicationItem {
  id: string;
  name: string;
  dosage: string;
  scheduledTime: string;
  status: 'pending' | 'taken' | 'skipped';
  instructions: string;
  iconName: string;
}

export interface ActivityLog {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'medication' | 'security' | 'vital' | 'system';
  badgeColor: string;
  icon: string;
}

export interface ScanResultData {
  drugName: string;
  dosageInstructions: string;
  frequency: string;
  timing: string;
  confidence: number;
  warnings?: string;
}
