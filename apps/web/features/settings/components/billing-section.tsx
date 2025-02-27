import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

export default function BillingSection() {
  // This is a server component, so futur me can fetch data here
  // const billingData = await fetchBillingData()

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <CardTitle className="text-2xl">Billing and Plans</CardTitle>
        </div>
        <CardDescription>
          Manage your subscription and billing information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Billing and plan information coming soon.
        </p>
      </CardContent>
    </Card>
  );
}
