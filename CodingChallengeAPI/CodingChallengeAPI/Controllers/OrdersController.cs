using CodingChallengeAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Models.Request;
using Models.Response;
using Services.Interfaces;

namespace CodingChallengeAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly ILogger<OrderController> _logger;

        private readonly IOrderService _order;

        public OrderController(ILogger<OrderController> logger, IOrderService order)
        {
            _logger = logger;
            _order = order;
        }

        [HttpGet]
        public IEnumerable<OrderDetails> Get([FromQuery] GetOrders request)
        {
            return _order.GetOrders(request);
        }

        [HttpPost]
        public void Post([FromBody] CreateOrder request) 
        {
            _order.CreateOrder(request);
        }

        [HttpDelete]
        [Route("{id}")]
        public void Delete([FromRoute] Guid id)
        {
            _order.DeleteOrder(id);
        }

        [HttpPut]
        [Route("{id}")]
        public OrderDetails Update([FromRoute] Guid id, [FromBody] CreateOrder request)
        {
            return _order.UpdateOrder(id, request);
        }


    }

    /*public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("getsomething")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet]
        [Route("getnumberg")]
        public int Hello()
        {
            return 0;
        }
    }*/
}
