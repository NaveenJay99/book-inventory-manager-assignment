export interface Book {
  id: number;
  title: string;
  author: string;
  isbn?: string;
  publishedYear: number;
  price: number;
  isAvailable: boolean;
  description?: string;
  coverImageUrl?: string;
  pageCount?: number;
  language?: string;
}

export type BookFormValues = Omit<Book, 'id'>;
