"use client"

import { useState, useEffect } from "react"
import { useTheme, type CustomTheme } from "./theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Palette, Plus, Trash2, Save, Check, X, Copy } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

interface ColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
  description?: string
}

function ColorPicker({ label, value, onChange, description }: ColorPickerProps) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={label.toLowerCase().replace(/\s+/g, "-")}>{label}</Label>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: value }} />
          <Input
            id={label.toLowerCase().replace(/\s+/g, "-")}
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-8 p-0 border-0"
          />
        </div>
      </div>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
  )
}

interface ThemePreviewProps {
  theme: CustomTheme
}

function ThemePreview({ theme }: ThemePreviewProps) {
  return (
    <div
      className="border rounded-lg p-4 space-y-4"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.foreground,
        borderColor: theme.colors.border,
      }}
    >
      <div className="flex justify-between items-center">
        <h3 style={{ color: theme.colors.foreground }}>{theme.name}</h3>
        <div className="flex gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.colors.primary }}></div>
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.colors.secondary }}></div>
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.colors.accent }}></div>
        </div>
      </div>

      <div className="flex gap-2">
        <div
          className="rounded p-2 text-xs"
          style={{
            backgroundColor: theme.colors.primary,
            color: theme.colors.primaryForeground,
          }}
        >
          Primary
        </div>
        <div
          className="rounded p-2 text-xs"
          style={{
            backgroundColor: theme.colors.secondary,
            color: theme.colors.secondaryForeground,
          }}
        >
          Secondary
        </div>
        <div
          className="rounded p-2 text-xs"
          style={{
            backgroundColor: theme.colors.accent,
            color: theme.colors.accentForeground,
          }}
        >
          Accent
        </div>
      </div>

      <div
        className="rounded p-2 text-xs"
        style={{
          backgroundColor: theme.colors.card,
          color: theme.colors.cardForeground,
          borderColor: theme.colors.border,
          border: "1px solid",
        }}
      >
        Card Example
      </div>

      <div className="flex gap-2">
        <div
          className="rounded p-2 text-xs"
          style={{
            backgroundColor: theme.colors.success,
            color: "#ffffff",
          }}
        >
          Success
        </div>
        <div
          className="rounded p-2 text-xs"
          style={{
            backgroundColor: theme.colors.warning,
            color: "#000000",
          }}
        >
          Warning
        </div>
        <div
          className="rounded p-2 text-xs"
          style={{
            backgroundColor: theme.colors.info,
            color: "#ffffff",
          }}
        >
          Info
        </div>
      </div>
    </div>
  )
}

export function ThemeEditor() {
  const { theme, setTheme, customThemes, addCustomTheme, updateCustomTheme, deleteCustomTheme, activeCustomTheme } =
    useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"create" | "manage">("manage")
  const [editingTheme, setEditingTheme] = useState<CustomTheme | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // Default theme template
  const defaultTheme: CustomTheme = {
    id: "",
    name: "",
    colors: {
      background: "#ffffff",
      foreground: "#0f172a",
      card: "#ffffff",
      cardForeground: "#0f172a",
      primary: "#3b82f6",
      primaryForeground: "#ffffff",
      secondary: "#f1f5f9",
      secondaryForeground: "#0f172a",
      muted: "#f1f5f9",
      mutedForeground: "#64748b",
      accent: "#f1f5f9",
      accentForeground: "#0f172a",
      border: "#e2e8f0",
      success: "#10b981",
      warning: "#f59e0b",
      info: "#3b82f6",
    },
  }

  // New theme state
  const [newTheme, setNewTheme] = useState<CustomTheme>({ ...defaultTheme, id: uuidv4() })

  // Reset new theme when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setNewTheme({ ...defaultTheme, id: uuidv4(), name: "" })
      setActiveTab("manage")
    }
  }, [isOpen])

  // Create a new theme
  const handleCreateTheme = () => {
    if (!newTheme.name.trim()) {
      alert("Please enter a theme name")
      return
    }

    addCustomTheme(newTheme)
    setIsOpen(false)
  }

  // Update theme
  const handleUpdateTheme = () => {
    if (editingTheme) {
      updateCustomTheme(editingTheme)
      setIsEditDialogOpen(false)
    }
  }

  // Delete theme
  const handleDeleteTheme = (themeId: string) => {
    if (confirm("Are you sure you want to delete this theme?")) {
      deleteCustomTheme(themeId)
    }
  }

  // Duplicate theme
  const handleDuplicateTheme = (themeToClone: CustomTheme) => {
    const clonedTheme = {
      ...themeToClone,
      id: uuidv4(),
      name: `${themeToClone.name} (Copy)`,
    }
    addCustomTheme(clonedTheme)
  }

  // Apply theme
  const handleApplyTheme = (themeId: string) => {
    setTheme(themeId)
  }

  // Edit theme
  const handleEditTheme = (themeToEdit: CustomTheme) => {
    setEditingTheme({ ...themeToEdit })
    setIsEditDialogOpen(true)
  }

  // Theme templates
  const themeTemplates = [
    {
      name: "Blue Ocean",
      colors: {
        background: "#f8fafc",
        foreground: "#0f172a",
        card: "#ffffff",
        cardForeground: "#0f172a",
        primary: "#0ea5e9",
        primaryForeground: "#ffffff",
        secondary: "#e0f2fe",
        secondaryForeground: "#0c4a6e",
        muted: "#f1f5f9",
        mutedForeground: "#64748b",
        accent: "#bae6fd",
        accentForeground: "#0c4a6e",
        border: "#e2e8f0",
        success: "#10b981",
        warning: "#f59e0b",
        info: "#3b82f6",
      },
    },
    {
      name: "Forest Green",
      colors: {
        background: "#f8fafc",
        foreground: "#0f172a",
        card: "#ffffff",
        cardForeground: "#0f172a",
        primary: "#16a34a",
        primaryForeground: "#ffffff",
        secondary: "#dcfce7",
        secondaryForeground: "#14532d",
        muted: "#f1f5f9",
        mutedForeground: "#64748b",
        accent: "#bbf7d0",
        accentForeground: "#14532d",
        border: "#e2e8f0",
        success: "#10b981",
        warning: "#f59e0b",
        info: "#3b82f6",
      },
    },
    {
      name: "Purple Haze",
      colors: {
        background: "#f8fafc",
        foreground: "#0f172a",
        card: "#ffffff",
        cardForeground: "#0f172a",
        primary: "#8b5cf6",
        primaryForeground: "#ffffff",
        secondary: "#ede9fe",
        secondaryForeground: "#5b21b6",
        muted: "#f1f5f9",
        mutedForeground: "#64748b",
        accent: "#ddd6fe",
        accentForeground: "#5b21b6",
        border: "#e2e8f0",
        success: "#10b981",
        warning: "#f59e0b",
        info: "#3b82f6",
      },
    },
    {
      name: "Sunset Orange",
      colors: {
        background: "#f8fafc",
        foreground: "#0f172a",
        card: "#ffffff",
        cardForeground: "#0f172a",
        primary: "#f97316",
        primaryForeground: "#ffffff",
        secondary: "#ffedd5",
        secondaryForeground: "#9a3412",
        muted: "#f1f5f9",
        mutedForeground: "#64748b",
        accent: "#fed7aa",
        accentForeground: "#9a3412",
        border: "#e2e8f0",
        success: "#10b981",
        warning: "#f59e0b",
        info: "#3b82f6",
      },
    },
  ]

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">
            <Palette className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Customize Theme</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Theme Customization</DialogTitle>
            <DialogDescription>Create and manage custom themes for your roadmap tracker.</DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "create" | "manage")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manage">Manage Themes</TabsTrigger>
              <TabsTrigger value="create">Create New Theme</TabsTrigger>
            </TabsList>

            <TabsContent value="manage" className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Built-in themes */}
                <Card>
                  <CardHeader>
                    <CardTitle>System Theme</CardTitle>
                    <CardDescription>Uses your device's theme preference</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-primary"></div>
                        <span>System</span>
                      </div>
                      <Button
                        variant={theme === "system" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTheme("system")}
                      >
                        {theme === "system" && <Check className="mr-2 h-4 w-4" />}
                        {theme === "system" ? "Applied" : "Apply"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Light Theme</CardTitle>
                    <CardDescription>Default light color scheme</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-primary"></div>
                        <span>Light</span>
                      </div>
                      <Button
                        variant={theme === "light" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTheme("light")}
                      >
                        {theme === "light" && <Check className="mr-2 h-4 w-4" />}
                        {theme === "light" ? "Applied" : "Apply"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Dark Theme</CardTitle>
                    <CardDescription>Default dark color scheme</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-primary"></div>
                        <span>Dark</span>
                      </div>
                      <Button
                        variant={theme === "dark" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTheme("dark")}
                      >
                        {theme === "dark" && <Check className="mr-2 h-4 w-4" />}
                        {theme === "dark" ? "Applied" : "Apply"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Custom themes */}
                {customThemes.map((customTheme) => (
                  <Card key={customTheme.id}>
                    <CardHeader>
                      <CardTitle>{customTheme.name}</CardTitle>
                      <CardDescription>Custom theme</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ThemePreview theme={customTheme} />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditTheme(customTheme)}>
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDuplicateTheme(customTheme)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteTheme(customTheme.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                      <Button
                        variant={theme === customTheme.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleApplyTheme(customTheme.id)}
                      >
                        {theme === customTheme.id && <Check className="mr-2 h-4 w-4" />}
                        {theme === customTheme.id ? "Applied" : "Apply"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {customThemes.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You haven't created any custom themes yet.</p>
                  <Button onClick={() => setActiveTab("create")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Theme
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="create" className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme-name">Theme Name</Label>
                    <Input
                      id="theme-name"
                      placeholder="My Custom Theme"
                      value={newTheme.name}
                      onChange={(e) => setNewTheme({ ...newTheme, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Base Colors</h3>
                    <div className="space-y-3">
                      <ColorPicker
                        label="Background"
                        value={newTheme.colors.background}
                        onChange={(value) =>
                          setNewTheme({
                            ...newTheme,
                            colors: { ...newTheme.colors, background: value },
                          })
                        }
                        description="Main background color of the application"
                      />
                      <ColorPicker
                        label="Foreground"
                        value={newTheme.colors.foreground}
                        onChange={(value) =>
                          setNewTheme({
                            ...newTheme,
                            colors: { ...newTheme.colors, foreground: value },
                          })
                        }
                        description="Main text color"
                      />
                      <ColorPicker
                        label="Card"
                        value={newTheme.colors.card}
                        onChange={(value) =>
                          setNewTheme({
                            ...newTheme,
                            colors: { ...newTheme.colors, card: value },
                          })
                        }
                        description="Background color for cards"
                      />
                      <ColorPicker
                        label="Card Foreground"
                        value={newTheme.colors.cardForeground}
                        onChange={(value) =>
                          setNewTheme({
                            ...newTheme,
                            colors: { ...newTheme.colors, cardForeground: value },
                          })
                        }
                        description="Text color for cards"
                      />
                      <ColorPicker
                        label="Border"
                        value={newTheme.colors.border}
                        onChange={(value) =>
                          setNewTheme({
                            ...newTheme,
                            colors: { ...newTheme.colors, border: value },
                          })
                        }
                        description="Border color for elements"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">UI Colors</h3>
                    <div className="space-y-3">
                      <ColorPicker
                        label="Primary"
                        value={newTheme.colors.primary}
                        onChange={(value) =>
                          setNewTheme({
                            ...newTheme,
                            colors: { ...newTheme.colors, primary: value },
                          })
                        }
                        description="Main accent color for buttons and interactive elements"
                      />
                      <ColorPicker
                        label="Primary Foreground"
                        value={newTheme.colors.primaryForeground}
                        onChange={(value) =>
                          setNewTheme({
                            ...newTheme,
                            colors: { ...newTheme.colors, primaryForeground: value },
                          })
                        }
                        description="Text color on primary elements"
                      />
                      <ColorPicker
                        label="Secondary"
                        value={newTheme.colors.secondary}
                        onChange={(value) =>
                          setNewTheme({
                            ...newTheme,
                            colors: { ...newTheme.colors, secondary: value },
                          })
                        }
                        description="Secondary color for less prominent elements"
                      />
                      <ColorPicker
                        label="Secondary Foreground"
                        value={newTheme.colors.secondaryForeground}
                        onChange={(value) =>
                          setNewTheme({
                            ...newTheme,
                            colors: { ...newTheme.colors, secondaryForeground: value },
                          })
                        }
                        description="Text color on secondary elements"
                      />
                      <ColorPicker
                        label="Accent"
                        value={newTheme.colors.accent}
                        onChange={(value) =>
                          setNewTheme({
                            ...newTheme,
                            colors: { ...newTheme.colors, accent: value },
                          })
                        }
                        description="Accent color for highlights and focus states"
                      />
                      <ColorPicker
                        label="Accent Foreground"
                        value={newTheme.colors.accentForeground}
                        onChange={(value) =>
                          setNewTheme({
                            ...newTheme,
                            colors: { ...newTheme.colors, accentForeground: value },
                          })
                        }
                        description="Text color on accent elements"
                      />
                      <ColorPicker
                        label="Muted"
                        value={newTheme.colors.muted}
                        onChange={(value) =>
                          setNewTheme({
                            ...newTheme,
                            colors: { ...newTheme.colors, muted: value },
                          })
                        }
                        description="Background color for muted elements"
                      />
                      <ColorPicker
                        label="Muted Foreground"
                        value={newTheme.colors.mutedForeground}
                        onChange={(value) =>
                          setNewTheme({
                            ...newTheme,
                            colors: { ...newTheme.colors, mutedForeground: value },
                          })
                        }
                        description="Text color for muted elements"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Semantic Colors</h3>
                    <div className="space-y-3">
                      <ColorPicker
                        label="Success"
                        value={newTheme.colors.success}
                        onChange={(value) =>
                          setNewTheme({
                            ...newTheme,
                            colors: { ...newTheme.colors, success: value },
                          })
                        }
                        description="Color for success states and completed items"
                      />
                      <ColorPicker
                        label="Warning"
                        value={newTheme.colors.warning}
                        onChange={(value) =>
                          setNewTheme({
                            ...newTheme,
                            colors: { ...newTheme.colors, warning: value },
                          })
                        }
                        description="Color for warning states and in-progress items"
                      />
                      <ColorPicker
                        label="Info"
                        value={newTheme.colors.info}
                        onChange={(value) =>
                          setNewTheme({
                            ...newTheme,
                            colors: { ...newTheme.colors, info: value },
                          })
                        }
                        description="Color for informational elements"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme Preview</h3>
                  <ThemePreview theme={newTheme} />

                  <div className="space-y-4 mt-6">
                    <h3 className="text-lg font-medium">Theme Templates</h3>
                    <p className="text-sm text-muted-foreground">
                      Start with a template and customize it to your liking.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {themeTemplates.map((template, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-start h-auto py-2"
                          onClick={() =>
                            setNewTheme({
                              ...newTheme,
                              name: template.name,
                              colors: template.colors,
                            })
                          }
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: template.colors.primary }}
                            ></div>
                            <span>{template.name}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button onClick={handleCreateTheme}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Theme
                </Button>
              </DialogFooter>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Edit Theme Dialog */}
      {editingTheme && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Theme: {editingTheme.name}</DialogTitle>
              <DialogDescription>Modify your custom theme colors and settings.</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-theme-name">Theme Name</Label>
                  <Input
                    id="edit-theme-name"
                    value={editingTheme.name}
                    onChange={(e) => setEditingTheme({ ...editingTheme, name: e.target.value })}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Base Colors</h3>
                  <div className="space-y-3">
                    <ColorPicker
                      label="Background"
                      value={editingTheme.colors.background}
                      onChange={(value) =>
                        setEditingTheme({
                          ...editingTheme,
                          colors: { ...editingTheme.colors, background: value },
                        })
                      }
                    />
                    <ColorPicker
                      label="Foreground"
                      value={editingTheme.colors.foreground}
                      onChange={(value) =>
                        setEditingTheme({
                          ...editingTheme,
                          colors: { ...editingTheme.colors, foreground: value },
                        })
                      }
                    />
                    <ColorPicker
                      label="Card"
                      value={editingTheme.colors.card}
                      onChange={(value) =>
                        setEditingTheme({
                          ...editingTheme,
                          colors: { ...editingTheme.colors, card: value },
                        })
                      }
                    />
                    <ColorPicker
                      label="Card Foreground"
                      value={editingTheme.colors.cardForeground}
                      onChange={(value) =>
                        setEditingTheme({
                          ...editingTheme,
                          colors: { ...editingTheme.colors, cardForeground: value },
                        })
                      }
                    />
                    <ColorPicker
                      label="Border"
                      value={editingTheme.colors.border}
                      onChange={(value) =>
                        setEditingTheme({
                          ...editingTheme,
                          colors: { ...editingTheme.colors, border: value },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">UI Colors</h3>
                  <div className="space-y-3">
                    <ColorPicker
                      label="Primary"
                      value={editingTheme.colors.primary}
                      onChange={(value) =>
                        setEditingTheme({
                          ...editingTheme,
                          colors: { ...editingTheme.colors, primary: value },
                        })
                      }
                    />
                    <ColorPicker
                      label="Primary Foreground"
                      value={editingTheme.colors.primaryForeground}
                      onChange={(value) =>
                        setEditingTheme({
                          ...editingTheme,
                          colors: { ...editingTheme.colors, primaryForeground: value },
                        })
                      }
                    />
                    <ColorPicker
                      label="Secondary"
                      value={editingTheme.colors.secondary}
                      onChange={(value) =>
                        setEditingTheme({
                          ...editingTheme,
                          colors: { ...editingTheme.colors, secondary: value },
                        })
                      }
                    />
                    <ColorPicker
                      label="Secondary Foreground"
                      value={editingTheme.colors.secondaryForeground}
                      onChange={(value) =>
                        setEditingTheme({
                          ...editingTheme,
                          colors: { ...editingTheme.colors, secondaryForeground: value },
                        })
                      }
                    />
                    <ColorPicker
                      label="Accent"
                      value={editingTheme.colors.accent}
                      onChange={(value) =>
                        setEditingTheme({
                          ...editingTheme,
                          colors: { ...editingTheme.colors, accent: value },
                        })
                      }
                    />
                    <ColorPicker
                      label="Accent Foreground"
                      value={editingTheme.colors.accentForeground}
                      onChange={(value) =>
                        setEditingTheme({
                          ...editingTheme,
                          colors: { ...editingTheme.colors, accentForeground: value },
                        })
                      }
                    />
                    <ColorPicker
                      label="Muted"
                      value={editingTheme.colors.muted}
                      onChange={(value) =>
                        setEditingTheme({
                          ...editingTheme,
                          colors: { ...editingTheme.colors, muted: value },
                        })
                      }
                    />
                    <ColorPicker
                      label="Muted Foreground"
                      value={editingTheme.colors.mutedForeground}
                      onChange={(value) =>
                        setEditingTheme({
                          ...editingTheme,
                          colors: { ...editingTheme.colors, mutedForeground: value },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Semantic Colors</h3>
                  <div className="space-y-3">
                    <ColorPicker
                      label="Success"
                      value={editingTheme.colors.success}
                      onChange={(value) =>
                        setEditingTheme({
                          ...editingTheme,
                          colors: { ...editingTheme.colors, success: value },
                        })
                      }
                    />
                    <ColorPicker
                      label="Warning"
                      value={editingTheme.colors.warning}
                      onChange={(value) =>
                        setEditingTheme({
                          ...editingTheme,
                          colors: { ...editingTheme.colors, warning: value },
                        })
                      }
                    />
                    <ColorPicker
                      label="Info"
                      value={editingTheme.colors.info}
                      onChange={(value) =>
                        setEditingTheme({
                          ...editingTheme,
                          colors: { ...editingTheme.colors, info: value },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme Preview</h3>
                <ThemePreview theme={editingTheme} />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleUpdateTheme}>
                <Save className="mr-2 h-4 w-4" />
                Update Theme
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
