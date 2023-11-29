// export const getRateLimitConfig = (): Options => ({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     legacyHeaders: false ,// Disable the `X-RateLimit-*` headers
//     message:"Limit exceeded",
//     statusCode:429,
//     requestPropertyName: 'ip',
//     skipFailedRequests: false,
//     skipSuccessfulRequests: false,
//     keyGenerator: (req) => req.ip,
//     skip: (req) => {
//         // Optional skip function
//         // Return true to skip rate limiting for certain requests
//         return false;
//       },
//       requestWasSuccessful: (req:any) => {
//         // Optional function to determine if a request was successful
//         // Return true for successful requests (default is status < 400)
//         return true;
//       },
//       store: /* Your custom store here, or use the default memory store */,
//       validate: (req, res) => {
//         // Optional function to validate the request before applying rate limiting
//         return undefined; // or an error message string if validation fails
//       },
// })
