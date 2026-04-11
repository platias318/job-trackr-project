export interface CV {
  id: number;
  user_id: number;
  name: string;
  version_label: string | null;
  notes: string | null;
  file_url: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateCVPayload {
  file: File;
  name: string;
  version_label?: string;
  notes?: string;
  is_default?: boolean;
}

export interface UpdateCVPayload {
  name?: string;
  version_label?: string;
  notes?: string;
  is_default?: boolean;
}

export interface CVFormState {
  name: string;
  version_label: string;
  notes: string;
  is_default: boolean;
  file: File | null;
}
