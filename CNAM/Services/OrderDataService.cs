using CNAM.DTO;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CNAM.Services
{
    public class OrderDataService
    {
        private readonly CnamDbContext _context;

        public OrderDataService(CnamDbContext context)
        {
            _context = context;
        }

        public Task<List<OrderDTO>> GetAllOrders()
        {
            return _context.Orders
                .Include(o => o.Customer)
                .Select(o => new OrderDTO()
                {
                    Comment = o.Comment,
                    OrderDate = o.OrderDate,
                    CustomerName = "",
                    OrderId = o.OrderId,
                    SalesStatus = o.SalesStatus,
                })
                .ToListAsync();
        }

    }
}
