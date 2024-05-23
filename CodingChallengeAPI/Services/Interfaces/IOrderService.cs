using CodingChallengeAPI.Services;
using Models.Request;
using Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IOrderService
    {
        IEnumerable<OrderDetails> GetOrders(GetOrders request);
        void CreateOrder(CreateOrder request);

        void DeleteOrder(Guid id);

        OrderDetails UpdateOrder(Guid id, CreateOrder request);
    }
}
