"use server";

import { State } from "../schemas/base";
import {
  studentCreateImageSchema,
  studentDeleteImageSchema,
} from "../schemas/student-images";
import { studentImageApiResource } from "../services/students";

// Helper function to construct revalidation paths based on role
const getRevalidationPaths = (basePath: string, id?: string): string[] => {
  const paths = [`${basePath}/subjects`];
  if (id) {
    paths.push(`${basePath}/subjects/${id}`);
  }
  return paths;
};

/**
 * Add a new student image
 */
export const addStudentImage = async (
  prevState: State,
  newImage: FormData,
  role: "admin" | "student" = "admin" // Default to admin
) => {
  const basePath = role === "admin" ? "/admin" : "/student";
  console.log(
    "Adding student image FormData",
    Object.fromEntries(newImage.entries())
  );

  // Debug: Check what the formData contains
  for (const [key, value] of newImage.entries()) {
    console.log(`FormData ${key}:`, value);
  }
  return studentImageApiResource.createAction(
    prevState,
    newImage,
    studentCreateImageSchema, // Assuming no specific schema for image upload
    true, // Apply transform to convert FormData to object
    getRevalidationPaths(basePath) // Dynamic revalidation paths
  );
};

/**
 * Delete a student image
 */
export const deleteStudentImage = async (
  prevState: State,
  imageId: FormData,
  role: "admin" | "student" = "admin" // Default to admin
) => {
  const basePath = role === "admin" ? "/admin" : "/student";
  return studentImageApiResource.deleteAction(
    prevState,
    imageId,
    studentDeleteImageSchema, // Assuming no specific schema for image deletion
    getRevalidationPaths(basePath) // Dynamic revalidation paths
  );
};
