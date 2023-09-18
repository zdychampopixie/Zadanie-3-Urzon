using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdvancedProgramming_Lesson3.Models;

namespace AdvancedProgramming_Lesson3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class peopleController : ControllerBase
    {
        private readonly TodoContext _context;

        public peopleController(TodoContext context)
        {
            _context = context;
        }




        // GET: api/people
        [HttpGet]
        public async Task<ActionResult<IEnumerable<person>>> GetPeople()
        {
            return await _context.People.ToListAsync();
        }




        // GET: api/people/5
        [HttpGet("{id}")]
        public async Task<ActionResult<person>> Getperson(int id)
        {
            var person = await _context.People.FindAsync(id);

            if (person == null)
            {
                return NotFound();
            }

            return person;
        }





        // PUT: api/people/5

        // To protect from overposting attacks, enable the specific properties you want to bind to, for

        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putperson(int id, person person)
        {
            if (id != person.Id)
            {
                return BadRequest();
            }

            _context.Entry(person).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!personExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/people

        // To protect from overposting attacks, enable the specific properties you want to bind to, for

        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.

        [HttpPost]
        public async Task<ActionResult<person>> Postperson(person person)
        {
            _context.People.Add(person);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getperson", new { id = person.Id }, person);
        }

        // DELETE: api/people/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<person>> Deleteperson(int id)
        {
            var person = await _context.People.FindAsync(id);
            if (person == null)
            {
                return NotFound();
            }

            _context.People.Remove(person);
            await _context.SaveChangesAsync();

            return person;
        }

        private bool personExists(int id)
        {
            return _context.People.Any(e => e.Id == id);
        }
    }
}
