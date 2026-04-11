export interface CV {
  id: number;
  user_id: number;
  name: string;
  version_label: string | null;
  notes: string | null;
  file_url: string | null;
  is_default: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateCVPayload {
  name: string;
  version_label?: string | null;
  notes?: string | null;
  is_default?: boolean;
  file_url?: string | null;
}

export interface UpdateCVPayload {
  name?: string;
  version_label?: string;
  notes?: string;
  is_default?: boolean;
}
