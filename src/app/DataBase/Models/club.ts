import { Time } from '@angular/common';
import { Timestamp } from 'rxjs';

export interface Club {
  id?: number | null;
  name: string;
  date_creation: string;
  nb_member: number;
  id_category: number;
  mission: string;
  logo: string;
  state: string;
  kpo: string;
  type: string;
}

export interface Category {
  id?: number | null;
  category_name: string;
}

export interface Event {
  id?: number | null;
  name: string;
  date: string;
  cost: number;
  img: string;
  earnings: number;
  supp_budget: number;
  url: string;
  id_club: number;
  description: string;
  location: string;
  file_name: string;
  aimed_target: string;
  time: string;
  funding_method: string;
  article_for_newsletter: string;
  state: string;
}

export interface NewEvent {
  name: string;
  location: string;
  date: string;
  description: string;
  aimed_target: string;
  funding_method: string;
  img: string;
  id_club: number;
  state: string;
}

export interface Meeting {
  id?: number | null;
  topic: string;
  id_club: number;
  location: string;
  date: Date;
}

export interface Forum {
  id?: number | null;
  club_id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface ForumMessage {
  id?: number | null;
  created_at: string;
  forum_id: number;
  user_id: string;
  content: string;
  userName?: string;
}

// export interface Event {
//   id?: number | null;
//   name: string;
//   date: string;
//   cost: number;
//   img: string;
//   earnings: number;
//   supp_budget: number;
//   url: string;
//   id_club: number;
//   description: string;
//   location: string;
//   file_name: string;
//   aimed_target: string;
//   time: string;
//   funding_method: string;
//   article_for_newsletter: string;
//   state: string;
// }

export interface UpdatedEvent {
  cost: number | null;
  earnings: number;
  url: string;
  file_name: string;
}

export interface Budget {
  id_club: number | null;
  source: string;
  budget: number;
  rest: number;
  year: number;
}

export interface Document {
  id?: number | null;
  name: string;
  id_event: number;
  state: string;
  description: string;
  received_date: string;
  path: string | null;
}

export interface NewDocument {
  name: string | null;
  id_event: number;
  state: string;
  description: string;
  received_date: string;
  path: string | null;
}
