// Production domain - only this domain requires authentication
const PRODUCTION_DOMAIN = "v0-organizational-chart-software.vercel.app"

/**
 * Check if running in a preview environment (v0 preview or localhost)
 * Used to bypass authentication for development/testing
 * 
 * Logic: If NOT on production domain, it's a preview environment
 */
export function isPreviewEnvironment(hostname: string): boolean {
  // If it's the production domain, NOT a preview
  if (hostname === PRODUCTION_DOMAIN) {
    return false
  }
  
  // Everything else is considered preview (v0 sandbox, localhost, etc.)
  return true
}

/**
 * Server-side check for preview environment
 */
export function isServerPreview(): boolean {
  // Check common preview environment indicators
  const vercelEnv = process.env.VERCEL_ENV
  const nodeEnv = process.env.NODE_ENV
  
  // Production deployment
  if (vercelEnv === "production") {
    return false
  }
  
  // v0 preview environments or local development
  if (vercelEnv === "preview" || vercelEnv === "development") {
    return true
  }
  
  // Local development
  if (nodeEnv === "development") {
    return true
  }
  
  // Default to preview (safer for development)
  return true
}
