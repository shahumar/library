export interface Book {
  id: number;
  title: string;
  year: number;
  author: string;
}

export interface BookList {
  id: number;
  name: string;
  books: Book[];
  created_at: string;
}