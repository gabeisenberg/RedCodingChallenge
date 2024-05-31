using Models.Request;
using Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IUserService
    {
        void CreateUser(CreateUser request);

        UserDetails GetUser(GetUser request);
    }
}
