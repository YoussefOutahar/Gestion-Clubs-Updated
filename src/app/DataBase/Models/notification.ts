export interface Notification {
  id?: number | null;
  date: string;
  title: string;
  icon: string;
  body: string;
  to: string;
  id_club?: number;
}
