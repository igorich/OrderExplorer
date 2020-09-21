using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CNAM.Models
{
    public class OrderDetails
    {
        [Key]
        public int Id { set; get; }

        [Required]
        public Order SalesOrder { set; get; }

        [Required]
        public Product Product { set; get; }

        [Required]
        public int OrderQuantity { set; get; }

        [Required]
        [Column(TypeName = "money")]
        public decimal UnitPrice { set; get; }

        [Required]
        public DateTime ModifyDate { set; get; }
    }
}
