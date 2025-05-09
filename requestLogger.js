export function requestLogger(req, res, next) {
  const start = Date.now();

  // Log the incoming request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);

  // Log body for debugging (omit in production if sensitive)
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    console.log('Request Body:', req.body);
  }

  // Hook into the response finish event
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] Response: ${res.statusCode} (${duration}ms)`);
  });

  next();
}