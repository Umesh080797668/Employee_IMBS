using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using StudentApi.Data;
using StudentApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace StudentApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly StudentContext _context;

        public AuthController(IConfiguration configuration, StudentContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("login")]
        public ActionResult<string> Login([FromBody] UserDto request)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == request.Username);

            if (user == null)
            {
                // Use generic message to prevent username enumeration
                return Unauthorized("Invalid credentials.");
            }

            // Verify password using SHA256 
            if (!VerifyPassword(request.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid credentials.");
            }

            return Ok(new { token = CreateToken(user.Username, user.Role) });
        }

        private bool VerifyPassword(string enteredPassword, string storedHash)
        {
            // SHA256 Verification logic
            using (var sha256 = SHA256.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(enteredPassword);
                var hash = sha256.ComputeHash(bytes);
                var hashString = Convert.ToBase64String(hash);
                return hashString == storedHash;
            }
        }

        private string CreateToken(string username, string role)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Role, role)
            };

            var tokenKey = Environment.GetEnvironmentVariable("JWT_SECRET") 
                           ?? _configuration.GetSection("AppSettings:Token").Value;
            
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds,
                issuer: Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "student-api",
                audience: Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "student-app"
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
