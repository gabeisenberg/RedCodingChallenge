﻿using Globals.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Request
{
    public class CreateOrder
    {
        public OrderType OrderType { get; set; }
        public string OrderedBy { get; set; }
        public string CustomerName { get; set; }
    }
}
