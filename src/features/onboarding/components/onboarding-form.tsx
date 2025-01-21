import Alert from "@/components/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import onboardingSchema from "../schemas/onboarding.schema";
import OrganizationName from "./organization-name";

export default function OnboardingForm() {
  const [pending, setPending] = useState<boolean>(false);

  const steps = [
    {
      component: OrganizationName,
      action: () => {},
    },
  ];

  const onboardingForm = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      org_name: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof onboardingSchema>,
    event?: React.BaseSyntheticEvent,
  ) {
    event?.preventDefault();
    setPending(true);

    setPending(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Let us finish this.
        </CardTitle>
      </CardHeader>

      <Alert />

      <CardContent className="flex flex-col gap-6 justify-center">
        <Form {...onboardingForm}>
          <form onSubmit={onboardingForm.handleSubmit(onSubmit)}>
            <FormField
              control={onboardingForm.control}
              name="org_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="org_name"
                      placeholder="Organization name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <Button disabled={false} className="w-full" type="submit">
          <p>Next</p>
        </Button>
      </CardContent>
    </Card>
  );
}
