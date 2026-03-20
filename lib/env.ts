/**
 * Check if running in a preview environment (v0 preview or localhost)
 * Used to bypass authentication for development/testing
 */
export function isPreviewEnvironment(hostname: string): boolean {
  return (
    hostname.includes("vusercontent.net") ||
    hostname.includes("localhost") ||
    hostname.includes("127.0.0.1")
  )
}

/**
 * Server-side check for preview environment
 */
export function isServerPreview(): boolean {
  // Check common preview environment indicators
  const vercelEnv = process.env.VERCEL_ENV
  const nodeEnv = process.env.NODE_ENV
  
  // v0 preview environments or local development
  if (vercelEnv === "preview" || vercelEnv === "development") {
    return true
  }
  
  // Local development
  if (nodeEnv === "development") {
    return true
  }
  
  return false
}
