"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useTeacherContext } from "@/lib/contexts/TeacherContext";
import { useDepartmentContext } from "@/lib/contexts/DepartmentContext";

interface EditPageProps {
  id: string;
}

export default function EditPage({ id }: EditPageProps) {
  const router = useRouter();
  const { items: teachers, editItem: editTeacher } = useTeacherContext();
  const { items: departments } = useDepartmentContext();
  const teacher = teachers.find((t) => +t.id === +id);

  // Find the department ID based on the teacher's department name
  const departmentId =
    departments.find((dept) => +dept.id === +(teacher?.department || 0))?.id ||
    "";

  const [formData, setFormData] = useState({
    firstName: teacher?.user.firstName || "",
    lastName: teacher?.user.lastName || "",
    email: teacher?.user.email || "",
    department: departmentId, // Store the ID instead of the name
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepartmentChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      department: value, // Just store the ID directly
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await editTeacher({
        id: id,
        user: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          role: "teacher",
        },
        department: formData.department, // Ensure this is a number
      });
      toast.success("Teacher updated successfully");
      router.push(`/admin/teachers/${id}`);
    } catch (error) {
      toast.error("Failed to update teacher" + error);
      setIsSubmitting(false);
    }
  };
  console.log("Form Data", formData);
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/admin/teachers/${id}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight dark:text-white">
            Edit Teacher
          </h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Update teacher information
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Teacher Information</CardTitle>
            <CardDescription>
              Update the teacher&apos;s personal and contact details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={String(
                    formData.department
                  )} /* Ensure this is a string */
                  onValueChange={handleDepartmentChange}
                >
                  <SelectTrigger id="department" className="w-full">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={String(dept.id)}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" asChild>
                <Link href={`/admin/teachers/${id}`}>Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
