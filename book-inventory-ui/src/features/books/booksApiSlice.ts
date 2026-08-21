import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book, BookFormValues } from '../../types/book';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5264/api/' }), // match your backend's port
  tagTypes: ['Book'],
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => 'books',
      providesTags: ['Book'],
    }),
    getBookById: builder.query<Book, number>({
      query: (id) => `books/${id}`,
      providesTags: (result, error, id) => [{ type: 'Book', id }],
    }),
    createBook: builder.mutation<Book, BookFormValues>({
      query: (body) => ({ url: 'books', method: 'POST', body }),
      invalidatesTags: ['Book'],
    }),
    updateBook: builder.mutation<void, { id: number; body: BookFormValues }>({
      query: ({ id, body }) => ({ url: `books/${id}`, method: 'PUT', body: { id, ...body } }),
      invalidatesTags: ['Book'],
    }),
    deleteBook: builder.mutation<void, number>({
      query: (id) => ({ url: `books/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Book'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;