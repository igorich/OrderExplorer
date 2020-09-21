using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CNAM.Models
{
    public class Product
    {
        [Key]
        public int ProductId { set; get; }

        [MaxLength(2000)]
        public string Name { set; get; }

        [Required]
        [Column(TypeName="money")]
        public decimal Price { set; get; }

        [MaxLength(2000)]
        public string Comment { set; get; }
    }
}
