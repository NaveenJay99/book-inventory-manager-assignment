import { useState } from 'react';
import { BookList } from './components/BookList';
import { BookForm } from './components/BookForm';
import { useCreateBookMutation, useUpdateBookMutation } from './features/books/booksApiSlice';
import type { Book, BookFormValues } from './types/book';

function App() {
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [createBook] = useCreateBookMutation();
  const [updateBook] = useUpdateBookMutation();

  const handleSubmit = async (data: BookFormValues) => {
    if (editingBook) {
      await updateBook({ id: editingBook.id, body: data }).unwrap();
    } else {
      await createBook(data).unwrap();
    }
    setShowForm(false);
    setEditingBook(null);
  };

  if (showForm) {
    return <BookForm defaultValues={editingBook ?? undefined} onSubmit={handleSubmit} />;
  }

  return (
    <BookList
      onEdit={(book) => {
        setEditingBook(book);
        setShowForm(true);
      }}
      onAddNew={() => {
        setEditingBook(null);
        setShowForm(true);
      }}
    />
  );
}

export default App;