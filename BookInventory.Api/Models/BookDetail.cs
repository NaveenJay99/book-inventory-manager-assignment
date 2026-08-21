namespace BookInventory.Api.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

public class BookDetail
{
    public int Id { get; set; }
    public int BookId { get; set; } public string? Description { get; set; }
    public string? CoverImageUrl { get; set; }
    public int? PageCount { get; set; }
    public string? Language { get; set; }
    
    // Foreign key
    [ValidateNever]
    public Book Book { get; set; } = null!; // Navigation property back to Book
}