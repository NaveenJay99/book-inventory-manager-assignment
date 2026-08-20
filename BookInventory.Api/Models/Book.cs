using System.ComponentModel.DataAnnotations;

namespace BookInventory.Api.Models;

public class Book
{
    public int Id { get; set; }

    [Required, MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required, MaxLength(100)]
    public string Author { get; set; } = string.Empty;

    public string? Isbn { get; set; }

    [Range(1000, 9999)]
    public int PublishedYear { get; set; }

    [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0.")]
    public decimal Price { get; set; }

    public bool IsAvailable { get; set; } = true;

    // Navigation property for the one-to-one relationship
    public BookDetail? BookDetail { get; set; }
}