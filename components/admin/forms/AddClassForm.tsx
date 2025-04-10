"use client"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { classFormSchema } from "@/lib/schemas/classes";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";

export default function AddClassForm({
  form,
}: {
  form: ReturnType<typeof useForm<z.infer<typeof classFormSchema>>>;
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Name</FormLabel>
              <FormControl>
                <Input placeholder="Class Name" {...field} />
              </FormControl>
              <div className="min-h-[1.25rem]">
                <FormMessage className="text-sm" />
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
