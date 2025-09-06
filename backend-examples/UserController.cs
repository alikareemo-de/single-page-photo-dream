using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace PropertyBooking.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Check if user has completed all required information
        /// Returns true if user can add properties, false otherwise
        /// </summary>
        /// <param name="userId">User ID to check</param>
        /// <returns>Boolean indicating if user info is complete</returns>
        [HttpGet("check-info/{userId}")]
        public async Task<IActionResult> CheckUserInfo(string userId)
        {
            try
            {
                if (string.IsNullOrEmpty(userId))
                {
                    return BadRequest(new { message = "User ID is required" });
                }

                // Check if user exists
                var user = await _userService.GetUserByIdAsync(userId);
                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                // Check if user has completed required information
                // This includes payment method, profile completion, etc.
                bool hasPaymentMethod = await _userService.HasPaymentMethodAsync(userId);
                bool hasCompleteProfile = await _userService.HasCompleteProfileAsync(userId);
                
                // Additional checks can be added here
                bool isComplete = hasPaymentMethod && hasCompleteProfile;

                return Ok(new { 
                    isComplete = isComplete,
                    hasPaymentMethod = hasPaymentMethod,
                    hasCompleteProfile = hasCompleteProfile 
                });
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }
    }

    // Example service interface
    public interface IUserService
    {
        Task<User> GetUserByIdAsync(string userId);
        Task<bool> HasPaymentMethodAsync(string userId);
        Task<bool> HasCompleteProfileAsync(string userId);
    }

    // Example User model
    public class User
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CellPhoneNumber { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}