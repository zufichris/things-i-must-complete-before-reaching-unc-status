"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export type Theme = "dark" | "light" | "system" | string

export interface CustomTheme {
  id: string
  name: string
  colors: {
    background: string
    foreground: string
    card: string
    cardForeground: string
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    muted: string
    mutedForeground: string
    accent: string
    accentForeground: string
    border: string
    success: string
    warning: string
    info: string
  }
}

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  customThemes: CustomTheme[]
  addCustomTheme: (theme: CustomTheme) => void
  updateCustomTheme: (theme: CustomTheme) => void
  deleteCustomTheme: (themeId: string) => void
  activeCustomTheme: CustomTheme | null
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  customThemes: [],
  addCustomTheme: () => null,
  updateCustomTheme: () => null,
  deleteCustomTheme: () => null,
  activeCustomTheme: null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "roadmap-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme)
  const [customThemes, setCustomThemes] = useState<CustomTheme[]>(() => {
    const saved = localStorage.getItem("roadmap-custom-themes")
    return saved ? JSON.parse(saved) : []
  })
  const [activeCustomTheme, setActiveCustomTheme] = useState<CustomTheme | null>(null)

  // Apply theme
  useEffect(() => {
    const root = window.document.documentElement

    // Remove all theme classes
    root.classList.remove("light", "dark")

    // Remove custom theme CSS variables
    if (theme === "light" || theme === "dark" || theme === "system") {
      // Reset to default theme
      document.documentElement.style.removeProperty("--background")
      document.documentElement.style.removeProperty("--foreground")
      document.documentElement.style.removeProperty("--card")
      document.documentElement.style.removeProperty("--card-foreground")
      document.documentElement.style.removeProperty("--primary")
      document.documentElement.style.removeProperty("--primary-foreground")
      document.documentElement.style.removeProperty("--secondary")
      document.documentElement.style.removeProperty("--secondary-foreground")
      document.documentElement.style.removeProperty("--muted")
      document.documentElement.style.removeProperty("--muted-foreground")
      document.documentElement.style.removeProperty("--accent")
      document.documentElement.style.removeProperty("--accent-foreground")
      document.documentElement.style.removeProperty("--border")
      document.documentElement.style.removeProperty("--success")
      document.documentElement.style.removeProperty("--warning")
      document.documentElement.style.removeProperty("--info")

      // Apply system or specific theme
      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        root.classList.add(systemTheme)
        setActiveCustomTheme(null)
        return
      }

      root.classList.add(theme)
      setActiveCustomTheme(null)
      return
    }

    // Apply custom theme
    const customTheme = customThemes.find((t) => t.id === theme)
    if (customTheme) {
      // Apply base theme (light or dark)
      root.classList.add("light") // Custom themes are based on light mode

      // Apply custom colors as CSS variables
      const { colors } = customTheme

      // Convert hex to hsl for CSS variables
      const hexToHSL = (hex: string) => {
        // Remove the # if present
        hex = hex.replace(/^#/, "")

        // Parse the hex values
        let r = 0,
          g = 0,
          b = 0
        if (hex.length === 3) {
          r = Number.parseInt(hex[0] + hex[0], 16)
          g = Number.parseInt(hex[1] + hex[1], 16)
          b = Number.parseInt(hex[2] + hex[2], 16)
        } else if (hex.length === 6) {
          r = Number.parseInt(hex.substring(0, 2), 16)
          g = Number.parseInt(hex.substring(2, 4), 16)
          b = Number.parseInt(hex.substring(4, 6), 16)
        }

        // Convert RGB to HSL
        r /= 255
        g /= 255
        b /= 255

        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        let h = 0,
          s = 0,
          l = (max + min) / 2

        if (max !== min) {
          const d = max - min
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0)
              break
            case g:
              h = (b - r) / d + 2
              break
            case b:
              h = (r - g) / d + 4
              break
          }

          h /= 6
        }

        // Format HSL values for CSS
        h = Math.round(h * 360)
        s = Math.round(s * 100)
        l = Math.round(l * 100)

        return `${h} ${s}% ${l}%`
      }

      // Apply CSS variables
      document.documentElement.style.setProperty("--background", hexToHSL(colors.background))
      document.documentElement.style.setProperty("--foreground", hexToHSL(colors.foreground))
      document.documentElement.style.setProperty("--card", hexToHSL(colors.card))
      document.documentElement.style.setProperty("--card-foreground", hexToHSL(colors.cardForeground))
      document.documentElement.style.setProperty("--primary", hexToHSL(colors.primary))
      document.documentElement.style.setProperty("--primary-foreground", hexToHSL(colors.primaryForeground))
      document.documentElement.style.setProperty("--secondary", hexToHSL(colors.secondary))
      document.documentElement.style.setProperty("--secondary-foreground", hexToHSL(colors.secondaryForeground))
      document.documentElement.style.setProperty("--muted", hexToHSL(colors.muted))
      document.documentElement.style.setProperty("--muted-foreground", hexToHSL(colors.mutedForeground))
      document.documentElement.style.setProperty("--accent", hexToHSL(colors.accent))
      document.documentElement.style.setProperty("--accent-foreground", hexToHSL(colors.accentForeground))
      document.documentElement.style.setProperty("--border", hexToHSL(colors.border))
      document.documentElement.style.setProperty("--success", hexToHSL(colors.success))
      document.documentElement.style.setProperty("--warning", hexToHSL(colors.warning))
      document.documentElement.style.setProperty("--info", hexToHSL(colors.info))

      setActiveCustomTheme(customTheme)
    }
  }, [theme, customThemes])

  // Save custom themes to localStorage
  useEffect(() => {
    localStorage.setItem("roadmap-custom-themes", JSON.stringify(customThemes))
  }, [customThemes])

  // Add a new custom theme
  const addCustomTheme = (theme: CustomTheme) => {
    setCustomThemes((prev) => [...prev, theme])
  }

  // Update an existing custom theme
  const updateCustomTheme = (theme: CustomTheme) => {
    setCustomThemes((prev) => prev.map((t) => (t.id === theme.id ? theme : t)))
  }

  // Delete a custom theme
  const deleteCustomTheme = (themeId: string) => {
    setCustomThemes((prev) => prev.filter((t) => t.id !== themeId))
    // If the deleted theme is active, switch to light theme
    if (theme === themeId) {
      setTheme("light")
    }
  }

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    customThemes,
    addCustomTheme,
    updateCustomTheme,
    deleteCustomTheme,
    activeCustomTheme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
