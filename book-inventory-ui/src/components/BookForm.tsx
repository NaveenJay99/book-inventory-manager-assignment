import { useForm } from 'react-hook-form';
import { TextField, Checkbox, FormControlLabel, Button, Stack } from '@mui/material';
import type { BookFormValues } from '../types/book';

interface Props {
  defaultValues?: BookFormValues;
  onSubmit: (data: BookFormValues) => void;
}

export function BookForm({ defaultValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormValues>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          label="Title"
          {...register('title', { required: 'Title is required', maxLength: 200 })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          label="Author"
          {...register('author', { required: 'Author is required', maxLength: 100 })}
          error={!!errors.author}
          helperText={errors.author?.message}
        />
        <TextField
          label="Published Year"
          type="number"
          {...register('publishedYear', {
            required: 'Published year is required',
            min: { value: 1000, message: 'Enter a valid year' },
            max: { value: new Date().getFullYear(), message: 'Year cannot be in the future' },
          })}
          error={!!errors.publishedYear}
          helperText={errors.publishedYear?.message}
        />
        <TextField
          label="Price"
          type="number"
          {...register('price', {
            required: 'Price is required',
            min: { value: 0.01, message: 'Price must be greater than 0' },
          })}
          error={!!errors.price}
          helperText={errors.price?.message}
        />
        <TextField label="Description" multiline rows={3} {...register('description')} />
        <TextField label="Cover Image URL" {...register('coverImageUrl')} />
        <TextField label="Page Count" type="number" {...register('pageCount')} />
        <TextField label="Language" {...register('language')} />
        <FormControlLabel
          control={<Checkbox {...register('isAvailable')} defaultChecked />}
          label="Available"
        />
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Stack>
    </form>
  );
}