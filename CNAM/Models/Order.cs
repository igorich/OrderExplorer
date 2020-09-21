using System;
using System.ComponentModel.DataAnnotations;

namespace CNAM.Models
{
    public class Order
    {
        [Key]
        public int OrderId { set; get; }

        [Required]
        public DateTime OrderDate { set; get; }

        [Required]
        public SalesStatus SalesStatus { set; get; }

        [Required]
        public Customer Customer { set; get; }

        [MaxLength(2000)]
        public string Comment { set; get; }
    }
}
