﻿using Microsoft.EntityFrameworkCore;

namespace AdvancedProgramming_Lesson3.Models
{
    public class TodoContext : DbContext
    {

        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; }

        public DbSet<person> People { get; set; }

        public DbSet<Book> Books { get; set; }

    }
}
