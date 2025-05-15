export interface TBR {
  id: number;
  title: string;
  completed: boolean;
  priority: 'Magas' | 'Közepes' | 'Alacsony';
  dueDate: string;
  addedDate: string;
}