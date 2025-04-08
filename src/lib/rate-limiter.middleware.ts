const RATE_LIMIT = 50; // Max requests allowed
const TIME_WINDOW = 20 * 1000; // Time window in milliseconds (1 minute)

const requestCounts = new Map<string, { count: number; resetTime: number }>();

const rateLimiter = (ip: string): { allowed: boolean; resetTime?: number } => {
  const now = Date.now();

  if (requestCounts.has(ip)) {
    const { count, resetTime } = requestCounts.get(ip)!;

    // If the time window has expired, reset the counter
    if (now > resetTime) {
      requestCounts.set(ip, { count: 1, resetTime: now + TIME_WINDOW });
      return { allowed: true };
    }

    // If the request count exceeds the limit, deny access
    if (count >= RATE_LIMIT) {
      return { allowed: false, resetTime };
    }

    // Increment the request count
    requestCounts.set(ip, { count: count + 1, resetTime });
    return { allowed: true };
  }

  // Initialize the counter for a new IP
  requestCounts.set(ip, { count: 1, resetTime: now + TIME_WINDOW });
  return { allowed: true };
};

export default async function RateLimiter_Middleware(request: Request) {
  if (process.env.NODE_ENV === "production") {
    // Extract the client's IP address
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";

    // Apply rate limiting
    const { allowed, resetTime } = rateLimiter(ip);

    if (!allowed) {
      return Response.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": `${Math.ceil((resetTime! - Date.now()) / 1000)}`,
          },
        },
      );
    }
  }
}
