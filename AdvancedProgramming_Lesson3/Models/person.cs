﻿using System.ComponentModel.DataAnnotations;

namespace AdvancedProgramming_Lesson3.Models
{
    public class person
    {
              public int Id { get; set; }
              [Required]
                   public string FirstName { get; set; }
                [Required]
                 public string LastName { get; set; }
             [Required]
              [EmailAddress]
             public string Email{ get; set; }
        [Required]
        [Phone]
        public string Phone { get; set; }
        [Required]
        public string Address { get; set; }
    }
}
