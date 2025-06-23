"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, ImageIcon, Trash2, Plus, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { StudentImage } from "@/lib/types/user"
import type { Student } from "@/lib/types/student"
import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import CreateStudentImageForm from "@/components/student/images/create"
import DeleteStudentImage from "@/components/student/images/delete"

interface StudentImagesDisplayProps {
  student: Student
  studentImages: StudentImage[]
  students?: Student[] // ✅ Optionnel pour le formulaire de création
}

export default function StudentImagesDisplay({
  student,
  studentImages: initialImages,
  students = [],
}: StudentImagesDisplayProps) {
  const [images, setImages] = useState<StudentImage[]>(initialImages)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [deleteImageId, setDeleteImageId] = useState<string | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  // ✅ Fonction pour gérer la suppression
  const handleDeleteClick = (imageId: string) => {
    setDeleteImageId(imageId)
    setIsDeleteOpen(true)
  }

  // ✅ Fonction pour gérer le succès de suppression
  const handleDeleteSuccess = () => {
    if (deleteImageId) {
      setImages((prev) => prev.filter((img) => img.id !== deleteImageId))
      setSuccess("Image deleted successfully!")
      setDeleteImageId(null)
      setIsDeleteOpen(false)

      // Masquer le message après 3 secondes
      setTimeout(() => setSuccess(null), 3000)
    }
  }

  // ✅ Fonction pour gérer le succès d'upload
  const handleUploadSuccess = () => {
    setSuccess("Image uploaded successfully!")
    // Recharger la page pour voir les nouvelles images
    setTimeout(() => window.location.reload(), 1000)

    // Masquer le message après 3 secondes
    setTimeout(() => setSuccess(null), 3000)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Success/Error Messages */}
      {success && (
        <Alert className="border-green-200 bg-green-50 text-green-800">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Images</h1>
          <p className="text-muted-foreground">Manage your personal images for classes</p>
        </div>

        {/* ✅ Utilise ton composant CreateStudentImageForm */}
        <CreateStudentImageForm students={students} student={student}>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Image
          </Button>
        </CreateStudentImageForm>
      </div>

      {/* Student Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Student Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="text-lg font-semibold">
                {student.user.firstName} {student.user.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Class</p>
              <p className="text-lg font-semibold">{student.section_promo}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Images</p>
              <p className="text-lg font-semibold">{images.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Images Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Your Images
            <Badge variant="outline" className="ml-2">
              {images.length} image{images.length !== 1 ? "s" : ""}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {images.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {images.map((image) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="overflow-hidden">
                      <div className="aspect-square relative bg-muted">
                        <Image
                          src={
                            image.image?.startsWith("http")
                              ? image.image
                              : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${image.image}` ||
                                "/placeholder.svg"
                          }
                          alt={`Student image ${image.id}`}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            console.log("Image failed to load:", image.image)
                            e.currentTarget.src = "/placeholder.svg?height=300&width=300"
                          }}
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                              Uploaded{" "}
                              {new Date(image.uploaded_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                            {image.is_encoded && (
                              <Badge variant="secondary" className="text-xs">
                                Processed
                              </Badge>
                            )}
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteClick(image.id)}
                            className="w-full"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-12">
              <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No images uploaded yet</h3>
              <p className="text-muted-foreground mb-4">Start by uploading your first image for your classes</p>

              {/* ✅ Utilise ton composant CreateStudentImageForm */}
              <CreateStudentImageForm students={students} student={student}>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload First Image
                </Button>
              </CreateStudentImageForm>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ✅ Utilise ton composant DeleteStudentImage */}
      {deleteImageId && <DeleteStudentImage id={deleteImageId} open={isDeleteOpen} setIsOpen={setIsDeleteOpen} />}
    </div>
  )
}
