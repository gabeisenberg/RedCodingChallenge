using Database;
using Database.Entities;
using Microsoft.Extensions.Configuration;
using Models.Request;
using Models.Response;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Logic
{
    public class UserService : IUserService
    {
        private readonly RedDBContext _context;

        public UserService(RedDBContext context)
        {
            _context = context;
        }

        public void CreateUser(CreateUser request)
        {
            var checkUser = _context.User.FirstOrDefault(x => x.UserName == request.UserName);
            if (checkUser != null)
            {
                throw new Exception("Username already exists");
            }
            var newUser = new User
            {
                UserName = request.UserName,
                FirstName = request.FirstName,
                LastName = request.LastName,
                PassWord = request.PassWord
            };
            _context.Add(newUser);
            _context.SaveChanges();
        }

        public UserDetails GetUser(GetUser request)
        {
            String? username = request.UserName;
            String? password = request.PassWord;

            var tempUser = _context.User.FirstOrDefault(x => x.UserName == username);
            if (tempUser == null)
            {
                throw new Exception("No user found!");
            }
            if (tempUser.PassWord == password)
            {
                return new UserDetails
                {
                    UserName = tempUser.UserName,
                    FirstName = tempUser.FirstName,
                    LastName = tempUser.LastName,
                    PassWord = tempUser.PassWord
                };
            }
            throw new Exception("Wrong password");
        }
    }
}
