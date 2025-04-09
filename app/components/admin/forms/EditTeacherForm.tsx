"use client"

import {

  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { editTeacherFormSchema } from "@/lib/schemas/teachers";
import { Department } from "@/lib/types/api";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function EditTeacherForm({
  form,
  departments
}: {
  form: ReturnType<typeof useForm<z.infer<typeof editTeacherFormSchema>>>,
  departments: Department[]
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <div className="min-h-[1.25rem]">
                  <FormMessage className="text-sm" />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <div className="min-h-[1.25rem]">
                  <FormMessage className="text-sm" />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {departments.map((department) => (
                      <SelectItem key={department.id} value={department.id.toString()}>
                        {department.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="min-h-[1.25rem]">
                  <FormMessage className="text-sm" />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@school-domain.com" {...field} />
                </FormControl>
                <div className="min-h-[1.25rem]">
                  <FormMessage className="text-sm" />
                </div>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
