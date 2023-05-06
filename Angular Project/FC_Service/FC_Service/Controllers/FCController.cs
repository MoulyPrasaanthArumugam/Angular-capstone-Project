using FC_Service.Models;
using FC_Service.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Linq;
using Org.BouncyCastle.Crypto.Generators;

namespace FC_Service.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class FCController : Controller
    {
        private readonly FCDbContext fCDbContext;

        public FCController(FCDbContext fCDbContext)
        {
            this.fCDbContext = fCDbContext;
        }

        //Get all Menu
        [HttpGet]
        public async Task<IActionResult> GetAllMenu()
        {
            var menus = await fCDbContext.Menu_Master.ToListAsync();
            return Ok(menus);
        }
         
        [HttpGet]
        [Route("{id:alpha}")]
        [ActionName("GetMenu")]
        public async Task<IActionResult> GetMenu([FromRoute] string id)
        {          
            var menuList = await fCDbContext.Menu_Master.Where(x => x.Category == id).ToListAsync();

            if (menuList != null) {
                return Ok(menuList);
            }
            return NotFound("Nothing on the Menu matches the category");
        }

        [HttpPost]
        [Route("api/users")]
        public async Task<IActionResult> AddUser([FromBody] UserDTO userDto)
        {
            if (userDto == null)
            {
                return BadRequest("User data is null.");
            }        


            // validate userDto properties as required

            if (fCDbContext.USER_MASTER.Any(u => u.Email == userDto.Email))
            {
                return BadRequest($"User with email ID '{userDto.Email}' already exists.");
            }


            var user = new User()
            {
                Id = Guid.NewGuid(),
                FullName = userDto.FullName,
                Alias = userDto.Alias,
                Email = userDto.Email,
                Password = userDto.Password
            };

            // add user to the data store
            fCDbContext.USER_MASTER.Add(user);
            await fCDbContext.SaveChangesAsync();

            return Ok("User added successfully.");
        }


        [HttpGet]
        [Route("api/users/{email}/{password}")]
        public IActionResult GetUserByEmailAndPassword(string email, string password)
        {
            var user = fCDbContext.USER_MASTER.FirstOrDefault(u => u.Email == email);

            if (user == null)
            {
                return NotFound($"User with email ID '{email}' not found.");
            }

            if (user.Password != password)
            {
                return BadRequest("Incorrect password.");
            }

            var userDto = new UserDTO()
            {
                FullName = user.FullName,
                Alias = user.Alias,
                Email = user.Email
            };

            return Ok(userDto);
        }


    }
}
  