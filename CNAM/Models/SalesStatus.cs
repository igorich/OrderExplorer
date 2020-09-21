using System.ComponentModel.DataAnnotations;

namespace CNAM.Models
{
    public class SalesStatus
    {
        [Key]
        public int SalesStatusId { set; get; }

        [MaxLength(2000)]
        [Required]
        public string Name { set; get; }
    }
}
