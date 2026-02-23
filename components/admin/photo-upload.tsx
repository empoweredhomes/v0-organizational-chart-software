"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Camera, X, Loader2 } from "lucide-react"

interface PhotoUploadProps {
  currentPhotoUrl?: string | null
  initials: string
  onPhotoChange: (url: string | null) => void
}

export function PhotoUpload({ currentPhotoUrl, initials, onPhotoChange }: PhotoUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentPhotoUrl || null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Upload failed")
        return
      }

      setPreviewUrl(data.url)
      onPhotoChange(data.url)
    } catch {
      setError("Failed to upload photo. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    setPreviewUrl(null)
    onPhotoChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Avatar className="h-20 w-20 border-2 border-border">
          {previewUrl ? (
            <AvatarImage src={previewUrl} alt="Employee photo" />
          ) : null}
          <AvatarFallback className="bg-muted text-muted-foreground text-lg font-sans">
            {initials}
          </AvatarFallback>
        </Avatar>
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-background/70">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="font-sans"
          >
            <Camera className="mr-1.5 h-3.5 w-3.5" />
            {previewUrl ? "Change Photo" : "Upload Photo"}
          </Button>
          {previewUrl && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              disabled={isUploading}
              className="text-destructive font-sans"
            >
              <X className="mr-1.5 h-3.5 w-3.5" />
              Remove
            </Button>
          )}
        </div>
        <p className="text-xs text-muted-foreground font-sans">
          JPG, PNG, WebP, or GIF. Max 5MB.
        </p>
        {error && (
          <p className="text-xs text-destructive font-sans">{error}</p>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Upload employee photo"
      />
    </div>
  )
}
