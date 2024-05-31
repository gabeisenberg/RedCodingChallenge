using CodingChallengeAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Models.Request;
using Models.Response;
using Services.Interfaces;

namespace CodingChallengeAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;

        private readonly IUserService _order;

        public UserController(ILogger<UserController> logger, IUserService order)
        {
            _logger = logger;
            _order = order;
        }

        [HttpPost("Signin")]
        public ActionResult Post([FromBody] CreateUser request)
        {
            _order.CreateUser(request);
            return Ok();
        }

        [HttpPost("Login")]
        public UserDetails Post([FromBody] GetUser request)
        {
            return _order.GetUser(request);
        }
    }
}
