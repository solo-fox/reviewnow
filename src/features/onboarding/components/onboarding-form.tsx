import Alert from "@/components/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { parseAsInteger, useQueryState } from "nuqs";

export default function OnboardingForm() {
  const steps = [
    {
      component: <></>,
      action: () => {},
    },
  ];

  const [currentStep, setCurrentStep] = useQueryState(
    "step",
    parseAsInteger.withDefault(0),
  );

  return (
    <form>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Let us finish this.</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center flex-col justify-center gap-6">
          <div>{steps[currentStep].component}</div>
          <Alert />
          <Button type="submit" className="w-full">
            Next
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
