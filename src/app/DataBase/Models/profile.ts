export interface Profile {
  id?: string | null;
  role: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  field: string;
  year: string;
  id_club: number;
  role_club: string;
}

export interface PendingProfile {
  id?: string | null;
  name: string;
  phone: string;
  email: string;
  field: string;
  year: string;
  id_club: number;
  role_club: string;
  state: string;
}
