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
import { editTeacherFormSchema } from "@/lib/schemas/teachers";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function EditTeacherForm({
  form,
}: {
  form: ReturnType<typeof useForm<z.infer<typeof editTeacherFormSchema>>>;
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
                <FormControl>
                  <Input placeholder="Department" {...field} />
                </FormControl>
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
