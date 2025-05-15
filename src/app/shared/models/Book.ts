export interface Book {
  id?: string;      // opcionális, Firestore doc ID
  title: string;
  author: string;
  price: number;
  image: string;
  description?: string;  // opcionális, rövid leírás
}
