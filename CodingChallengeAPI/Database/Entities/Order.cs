﻿using Globals.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace Database.Entities
{
    public class Order
    {
        public Guid Id { get; set; }
        public OrderType OrderType { get; set; }
        public string? OrderedBy { get; set; }
        public string? CustomerName { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
