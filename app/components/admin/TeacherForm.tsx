"use client";

import { teacherFormSchema } from "@/lib/schemas/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function TeacherForm({form} : {form: ReturnType<typeof useForm<z.infer<typeof teacherFormSchema>>>}) {

  // const pending = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        <div className="space-y-2 grid grid-cols-2 gap-4">
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <div className="min-h-[1.25rem]">
                  <FormMessage className="text-sm" />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
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
