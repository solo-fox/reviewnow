import ProfileSection from "./profile-section";
import BillingSection from "./billing-section";
import DangerZoneSection from "./danger-zone-section";

export default function SettingsPage() {
  return (
    <div className="min-h-dvh flex flex-col gap-6 p-6 w-full">
      <ProfileSection />
      <BillingSection />
      <DangerZoneSection />
    </div>
  );
}
