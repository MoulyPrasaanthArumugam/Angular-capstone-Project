﻿namespace FC_Service.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Alias { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
