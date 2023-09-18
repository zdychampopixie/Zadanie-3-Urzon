using System.ComponentModel.DataAnnotations;

namespace AdvancedProgramming_Lesson3.Models
{
    public class Book
    {
                   public int ID { get; set; }
                   [Required]
                    public string Title { get; set; }
                     [Required]
                       public string Author{ get; set; }
                        [Required]
                          public string Genre { get; set; }
                           [Required]
                            public string ISBN { get; set; }
    }
}
