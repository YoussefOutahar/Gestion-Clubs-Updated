export interface Notification {
  id: number | null;
  timestamp: string;
  heading: string;
  title: string;
  subtitle: string;
  path: string;
  icon: string;
  body: string;
  id_club: number;
}
