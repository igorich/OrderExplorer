using CNAM.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace CNAM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesStatusController : ControllerBase
    {
        public SalesStatusController(CnamDbContext context)
        {
        }

        // GET: api/SalesStatus
        [HttpGet]
        public ActionResult<IEnumerable<SalesStatusEnum>> GetSalesStatuses()
        {
            return new[] { SalesStatusEnum.Created, SalesStatusEnum.InProgress, SalesStatusEnum.Canceled};
        }
    }
}
