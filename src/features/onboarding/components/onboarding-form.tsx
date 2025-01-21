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
import LoadingIcon from "@/components/loading-icon";
import onboardAction from "../actions/onboard.action"

export default function OnboardingForm() {
  const [pending, setPending] = useState<boolean>(false);

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
    await onboardAction({
      org_name: values.org_name,
    });
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

      <CardContent>
        <Form {...onboardingForm}>
          <form
            onSubmit={onboardingForm.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 justify-center"
          >
            <FormField
              control={onboardingForm.control}
              name="org_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of your organization</FormLabel>
                  <FormControl>
                    <Input id="org_name" placeholder="ACME GmbH" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={pending} className="w-full" type="submit">
              {pending ? <LoadingIcon /> : ""} <p>Create an organization</p>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
