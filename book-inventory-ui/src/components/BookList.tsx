import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetBooksQuery, useDeleteBookMutation } from '../features/books/booksApiSlice';
import type { Book } from '../types/book';

export function BookList({
  onEdit,
  onAddNew,
}: {
  onEdit: (book: Book) => void;
  onAddNew: () => void;
}) {
  const { data: books, isLoading, isError } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id: number) => {
    await deleteBook(id);
    // No manual re-fetch needed — invalidatesTags on the mutation
    // tells RTK Query to automatically refresh the book list.
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Failed to load books.</Alert>;

  return (
    <>
      <Button variant="contained" onClick={onAddNew} sx={{ mb: 2 }}>
        Add Book
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books?.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.publishedYear}</TableCell>
                <TableCell>${book.price.toFixed(2)}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => onEdit(book)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(book.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
