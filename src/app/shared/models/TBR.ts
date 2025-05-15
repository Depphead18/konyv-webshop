export interface TBR {
  id: string;
  title: string;
  completed: boolean;
  priority: 'Magas' | 'Közepes' | 'Alacsony';
  addedDate: string;
  userId: string;
}