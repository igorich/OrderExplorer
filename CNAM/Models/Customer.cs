using System.ComponentModel.DataAnnotations;

namespace CNAM.Models
{
    public class Customer
    {
        [Key]
        public int CustomerId { set; get; }

        [MaxLength(2000)]
        [Required]
        public string Name { set; get; }
    }
}
