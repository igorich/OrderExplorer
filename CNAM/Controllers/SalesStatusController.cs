using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CNAM;
using CNAM.Models;

namespace CNAM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesStatusController : ControllerBase
    {
        private readonly CnamDbContext _context;

        public SalesStatusController(CnamDbContext context)
        {
            _context = context;
        }

        // GET: api/SalesStatus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SalesStatus>>> GetSalesStatuses()
        {
            return await _context.SalesStatuses.ToListAsync();
        }

        // GET: api/SalesStatus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SalesStatus>> GetSalesStatus(int id)
        {
            var salesStatus = await _context.SalesStatuses.FindAsync(id);

            if (salesStatus == null)
            {
                return NotFound();
            }

            return salesStatus;
        }

        // PUT: api/SalesStatus/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSalesStatus(int id, SalesStatus salesStatus)
        {
            if (id != salesStatus.SalesStatusId)
            {
                return BadRequest();
            }

            _context.Entry(salesStatus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalesStatusExists(id))
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

        // POST: api/SalesStatus
        [HttpPost]
        public async Task<ActionResult<SalesStatus>> PostSalesStatus(SalesStatus salesStatus)
        {
            _context.SalesStatuses.Add(salesStatus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSalesStatus", new { id = salesStatus.SalesStatusId }, salesStatus);
        }

        // DELETE: api/SalesStatus/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SalesStatus>> DeleteSalesStatus(int id)
        {
            var salesStatus = await _context.SalesStatuses.FindAsync(id);
            if (salesStatus == null)
            {
                return NotFound();
            }

            _context.SalesStatuses.Remove(salesStatus);
            await _context.SaveChangesAsync();

            return salesStatus;
        }

        private bool SalesStatusExists(int id)
        {
            return _context.SalesStatuses.Any(e => e.SalesStatusId == id);
        }
    }
}
