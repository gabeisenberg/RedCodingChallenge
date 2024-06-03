using CodingChallengeAPI.Services;
using Database;
using Database.Entities;
using Microsoft.EntityFrameworkCore;
using Models.Request;
using Models.Response;
using Services.Interfaces;
using System.Linq;

namespace Services.Logic
{
    public class OrderService : IOrderService
    {
        private readonly RedDBContext _context;

        public OrderService(RedDBContext context)
        {
            _context = context;
        }
        public IEnumerable<OrderDetails> GetOrders(GetOrders request)
        {
            var query = _context.Set<Order>()
                .AsNoTracking();
            if (request.OrderTypes.Any())
            {
                query = query.Where(order => request.OrderTypes.Contains(order.OrderType));
            }
            return query.Select(order => new OrderDetails
            {
                Id = order.Id,
                OrderType = order.OrderType,
                OrderedBy = order.OrderedBy,
                CustomerName = order.CustomerName,
                CreatedDate = order.CreatedDate
            }).ToList();
        }

        public void CreateOrder(CreateOrder request)
        {
            var newOrder = new Order
            {
                OrderType = request.OrderType,
                OrderedBy = request.OrderedBy,
                CustomerName = request.CustomerName
            };
            _context.Add(newOrder);
        
            _context.SaveChanges();
        }

        public void DeleteOrder(Guid id)
        {
            var temp = _context.Set<Order>().FirstOrDefault(order => order.Id == id);
            if (temp == null)
            {
                throw new Exception("No ID found!");
            }
            _context.Remove(temp);
            _context.SaveChanges();
        }

        public OrderDetails UpdateOrder(Guid id, CreateOrder request)
        {
            var temp = _context.Set<Order>().FirstOrDefault(order => order.Id == id);
            if (temp == null)
            {
                throw new Exception("No ID found!");
            }
            temp.OrderType = request.OrderType;
            temp.CustomerName = request.CustomerName;
            temp.OrderedBy = request.OrderedBy;
            _context.SaveChanges();
            return new OrderDetails
            {
                Id = temp.Id,
                OrderType = temp.OrderType,
                OrderedBy = temp.OrderedBy,
                CustomerName = temp.CustomerName,
                CreatedDate = temp.CreatedDate
            };
        }
    }
}
