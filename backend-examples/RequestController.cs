using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PropertyBooking.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RequestController : ControllerBase
    {
        private readonly IRequestService _requestService;
        private readonly IPropertyService _propertyService;
        
        public RequestController(IRequestService requestService, IPropertyService propertyService)
        {
            _requestService = requestService;
            _propertyService = propertyService;
        }

        /// <summary>
        /// Create a new booking request
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateRequest([FromBody] CreateRequestDto requestDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Validate property exists and is available
                var property = await _propertyService.GetPropertyByIdAsync(requestDto.PropertyId);
                if (property == null)
                {
                    return NotFound(new { message = "Property not found" });
                }

                if (property.Status != "available")
                {
                    return BadRequest(new { message = "Property is not available for booking" });
                }

                // Validate capacity
                if (requestDto.NumberOfGuests > property.Capacity)
                {
                    return BadRequest(new { message = $"Number of guests exceeds property capacity ({property.Capacity})" });
                }

                // Validate expiration date
                if (property.ExpireDate.HasValue)
                {
                    if (requestDto.CheckInDate.HasValue && requestDto.CheckInDate > property.ExpireDate)
                    {
                        return BadRequest(new { message = "Check-in date cannot be after property expiration date" });
                    }
                    if (requestDto.CheckOutDate.HasValue && requestDto.CheckOutDate > property.ExpireDate)
                    {
                        return BadRequest(new { message = "Check-out date cannot be after property expiration date" });
                    }
                }

                var request = await _requestService.CreateRequestAsync(requestDto);
                
                return Ok(request);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        /// <summary>
        /// Get all requests made by a user
        /// </summary>
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserRequests(string userId)
        {
            try
            {
                var requests = await _requestService.GetRequestsByUserAsync(userId);
                return Ok(requests);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        /// <summary>
        /// Get all requests for properties owned by a host
        /// </summary>
        [HttpGet("host/{hostId}")]
        public async Task<IActionResult> GetRequestsToHost(string hostId)
        {
            try
            {
                var requests = await _requestService.GetRequestsToHostAsync(hostId);
                return Ok(requests);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        /// <summary>
        /// Approve a booking request
        /// </summary>
        [HttpPut("{requestId}/approve")]
        public async Task<IActionResult> ApproveRequest(string requestId)
        {
            try
            {
                var request = await _requestService.GetRequestByIdAsync(requestId);
                if (request == null)
                {
                    return NotFound(new { message = "Request not found" });
                }

                if (request.Status != RequestStatus.Pending)
                {
                    return BadRequest(new { message = "Only pending requests can be approved" });
                }

                await _requestService.ApproveRequestAsync(requestId);
                
                return Ok(new { message = "Request approved successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        /// <summary>
        /// Reject a booking request
        /// </summary>
        [HttpPut("{requestId}/reject")]
        public async Task<IActionResult> RejectRequest(string requestId)
        {
            try
            {
                var request = await _requestService.GetRequestByIdAsync(requestId);
                if (request == null)
                {
                    return NotFound(new { message = "Request not found" });
                }

                if (request.Status != RequestStatus.Pending)
                {
                    return BadRequest(new { message = "Only pending requests can be rejected" });
                }

                await _requestService.RejectRequestAsync(requestId);
                
                return Ok(new { message = "Request rejected successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        /// <summary>
        /// Cancel a booking request (by the requester)
        /// </summary>
        [HttpPut("{requestId}/cancel")]
        public async Task<IActionResult> CancelRequest(string requestId)
        {
            try
            {
                var request = await _requestService.GetRequestByIdAsync(requestId);
                if (request == null)
                {
                    return NotFound(new { message = "Request not found" });
                }

                if (request.Status != RequestStatus.Pending)
                {
                    return BadRequest(new { message = "Only pending requests can be cancelled" });
                }

                await _requestService.CancelRequestAsync(requestId);
                
                return Ok(new { message = "Request cancelled successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }
    }

    // DTOs
    public class CreateRequestDto
    {
        public string PropertyId { get; set; }
        public string UserId { get; set; }
        public DateTime? CheckInDate { get; set; }
        public DateTime? CheckOutDate { get; set; }
        public string ExpectedArrivalTime { get; set; }
        public int NumberOfGuests { get; set; }
        public string AdditionalNotes { get; set; }
    }

    // Enums
    public enum RequestStatus
    {
        Pending = 1,
        Approved = 2,
        Rejected = 3,
        Cancelled = 4
    }

    // Models
    public class BookingRequest
    {
        public string Id { get; set; }
        public string PropertyId { get; set; }
        public string PropertyName { get; set; }
        public string UserId { get; set; }
        public string HostId { get; set; }
        public DateTime? CheckInDate { get; set; }
        public DateTime? CheckOutDate { get; set; }
        public string ExpectedArrivalTime { get; set; }
        public int NumberOfGuests { get; set; }
        public string AdditionalNotes { get; set; }
        public RequestStatus Status { get; set; }
        public DateTime CreatedDate { get; set; }
    }

    // Service interfaces
    public interface IRequestService
    {
        Task<BookingRequest> CreateRequestAsync(CreateRequestDto requestDto);
        Task<List<BookingRequest>> GetRequestsByUserAsync(string userId);
        Task<List<BookingRequest>> GetRequestsToHostAsync(string hostId);
        Task<BookingRequest> GetRequestByIdAsync(string requestId);
        Task ApproveRequestAsync(string requestId);
        Task RejectRequestAsync(string requestId);
        Task CancelRequestAsync(string requestId);
    }

    public interface IPropertyService
    {
        Task<Property> GetPropertyByIdAsync(string propertyId);
    }

    public class Property
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string PropertyName { get; set; }
        public string Status { get; set; }
        public int Capacity { get; set; }
        public DateTime? ExpireDate { get; set; }
    }
}