using BookInventory.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BookInventory.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Book> Books => Set<Book>();
    public DbSet<BookDetail> BookDetails => Set<BookDetail>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // One-to-one configuration: Book <-> BookDetail
        modelBuilder.Entity<Book>()
            .HasOne(b => b.BookDetail)
            .WithOne(d => d.Book)
            .HasForeignKey<BookDetail>(d => d.BookId)
            .OnDelete(DeleteBehavior.Cascade);

        // Unique index on BookId — this is what makes it one-to-one
        // at the DATABASE level, not just in C# code.
        //
        // Without this, nothing stops two BookDetail rows from
        // pointing at the same Book.
        modelBuilder.Entity<BookDetail>()
            .HasIndex(d => d.BookId)
            .IsUnique();

        base.OnModelCreating(modelBuilder);
    }
}