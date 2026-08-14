export interface Patient {
  id: string; // e.g. "PT-2023-8942" or "#PT-1042"
  firstName: string;
  lastName: string;
  fullName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  bloodGroup: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalInfo: {
    existingConditions: string;
    knownAllergies: string[];
    currentMedications: string;
    pastMedicalHistory: string;
    insuranceDetails: string;
  };
  photoUrl?: string;
  registeredAt: string;
}

export interface VitalSigns {
  bp: string; // e.g. "120/80"
  hr: number; // e.g. 72 bpm
  temp: number; // e.g. 99.8 °F
  tempStatus?: 'normal' | 'high' | 'low';
  spO2: number; // e.g. 98%
  takenTimeAgo: string; // e.g. "15m ago"
}

export interface PrescriptionItem {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

export interface LabResult {
  id: string;
  testName: string;
  category: 'Blood' | 'Pathology' | 'Biochemistry' | 'Radiology';
  date: string;
  status: 'Normal' | 'Abnormal' | 'Pending';
  values: { param: string; value: string; reference: string; unit: string; flag?: string }[];
  doctor: string;
  notes: string;
}

export interface ImagingRecord {
  id: string;
  title: string;
  modality: 'MRI' | 'CT Scan' | 'X-Ray' | 'Ultrasound';
  date: string;
  bodyPart: string;
  findings: string;
  imageUrl?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientAge?: number;
  patientGender?: string;
  patientPhoto?: string;
  doctorName: string;
  department: string;
  time: string;
  date: string;
  type: string; // e.g. "Severe Migraine Follow-up", "Annual Checkup"
  status: 'Completed' | 'In Progress' | 'Waiting' | 'Cancelled' | 'Upcoming';
  vitals?: VitalSigns;
  chiefComplaint?: string;
  clinicalNotes?: string;
  diagnoses?: string[]; // ICD-10 codes
  prescriptions?: PrescriptionItem[];
}

export interface Department {
  id: string;
  name: string;
  icon: string;
  doctorCount: number;
  occupiedBeds: number;
  bedCapacity: number;
  headDoctor: string;
  status: 'Active' | '24/7 Active' | 'High Load';
  description: string;
}

export interface Doctor {
  id: string;
  name: string;
  department: string;
  specialty: string;
  experience: string;
  availability: string;
  photoUrl: string;
}

export interface Announcement {
  id: string;
  type: 'SYSTEM' | 'STAFF' | 'EVENT';
  time: string;
  title: string;
  description: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface BedInfo {
  id: string;
  number: string;
  type: string;
  status: 'Available' | 'Occupied' | 'Cleaning';
  patientName?: string;
}

export interface WardInfo {
  id: string;
  name: string;
  floor: number;
  totalBeds: number;
  beds: BedInfo[];
}

export interface MedicationItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  minThreshold: number;
  unit: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface HospitalBed {
  id: string;
  bedNumber: string;
  ward: string;
  floor: number;
  status: 'Available' | 'Occupied' | 'Sanitizing' | 'Reserved';
  patientId?: string;
  patientName?: string;
  assignedDoctor?: string;
  admittedDate?: string;
}

export interface Invoice {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  amount: number;
  insuranceCovered: number;
  patientPaid: number;
  status: 'Paid' | 'Pending' | 'Claim Processing';
  items: { description: string; cost: number }[];
}

export type ActiveView = 
  | 'home'
  | 'patient-registration'
  | 'doctor-dashboard'
  | 'appointment-booking'
  | 'patient-records'
  | 'departments'
  | 'pharmacy'
  | 'building'
  | 'admin-dashboard'
  | 'billing'
  | 'contact-us'
  | 'settings';
