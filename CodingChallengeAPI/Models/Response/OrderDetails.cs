using Globals.Enums;

namespace Models.Response
{
    public class OrderDetails
    {
        public Guid Id { get; set; }
        public OrderType OrderType { get; set; }
        public string? OrderedBy { get; set; }
        public string? CustomerName { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}