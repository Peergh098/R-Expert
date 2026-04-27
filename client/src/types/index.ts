export type ServiceId =
  | 'plagiarism-report'
  | 'ai-detection-report'
  | 'drillbit-report'
  | 'ai-content-reduction'
  | 'writing-assistance'
  | 'data-analysis'
  | 'document-formatting'
  | 'proofreading'
  | 'grammar-enhancement'
  | 'reference-formatting'
  | 'presentation-design'
  | 'reviewer-comments-revision';

export type SubmissionStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

export interface Submission {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  service: ServiceId;
  pages: number;
  language: string;
  message: string;
  fileUrl: string | null;
  fileName: string | null;
  originalFileName: string | null;
  status: SubmissionStatus;
  adminNotes: string;
  estimatedPrice: number | null;
  createdAt: string;
  updatedAt: string;
  fileDeletedAt?: string | null;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  replyMessage: string | null;
  repliedAt: string | null;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface DashboardStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  cancelled: number;
  recentSubmissions: Submission[];
}

export interface ServiceInfo {
  id: ServiceId;
  title: string;
  shortDesc: string;
  description: string;
  icon: string;
  price: string;
  features: string[];
  deliverables: string[];
  turnaround: string;
  color: string;
}

export interface SubmissionFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  service: ServiceId | '';
  pages: string;
  language: string;
  message: string;
  file: File | null;
}
