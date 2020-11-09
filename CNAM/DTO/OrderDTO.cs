using CNAM.Models;
using System;

namespace CNAM.DTO
{
    public class OrderDTO
    {
        public int OrderId { set; get; }

        public DateTime OrderDate { set; get; }

        public SalesStatusEnum SalesStatus { set; get; }

        public string CustomerName { set; get; }

        public string Comment { set; get; }
    }
}
