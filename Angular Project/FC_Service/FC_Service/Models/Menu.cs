﻿using System.ComponentModel.DataAnnotations;

namespace FC_Service.Models
{
    public class Menu
    {
        public int Id { get; set; } 
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; } 
        public string Type { get; set; }
        public string Cuisines { get; set; }

        public string ImgUrl { get; set; }


        public decimal Price { get; set; }
    }
}
