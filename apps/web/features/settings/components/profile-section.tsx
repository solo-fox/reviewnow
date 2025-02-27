"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import profileSchema from "../schema/profile.schema";

export default function ProfileSection() {
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      orgName: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    // Handle save logic here
    console.log("Profile saved", values);
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <CardTitle className="text-2xl">Account information</CardTitle>
        </div>
        <CardDescription>Manage your profile settings</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="orgName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Organization Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your organization's display name.
                  </FormDescription>
                  <FormMessage />
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
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormDescription>Enter a strong password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input value="user@example.com" disabled />
                <FormDescription>Email cannot be changed.</FormDescription>
              </FormItem>
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
