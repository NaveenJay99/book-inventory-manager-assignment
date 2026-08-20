using BookInventory.Api.Data;
using BookInventory.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookInventory.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly AppDbContext _context;

    public BooksController(AppDbContext context)
    {
        _context = context;
    }

    // GET /api/books — list view doesn't need BookDetail, so skip the extra join
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Book>>> GetAll()
    {
        var books = await _context.Books
            .AsNoTracking()
            .ToListAsync();

        return Ok(books);
    }

    // GET /api/books/{id} — detail view needs the full picture, so include BookDetail
    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> GetById(int id)
    {
        var book = await _context.Books
            .Include(b => b.BookDetail)
            .FirstOrDefaultAsync(b => b.Id == id);

        if (book is null)
            return NotFound();

        return Ok(book);
    }

    // POST /api/books
    [HttpPost]
    public async Task<ActionResult<Book>> Create(Book book)
    {
        _context.Books.Add(book);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetById),
            new { id = book.Id },
            book
        );
    }

    // PUT /api/books/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Book book)
    {
        if (id != book.Id)
            return BadRequest("Route id and body id must match.");

        _context.Entry(book).State = EntityState.Modified;

        if (book.BookDetail is not null)
        {
            _context.Entry(book.BookDetail).State = EntityState.Modified;
        }

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE /api/books/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var book = await _context.Books.FindAsync(id);

        if (book is null)
            return NotFound();

        _context.Books.Remove(book);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}