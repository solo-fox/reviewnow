import ProfileSection from "@/features/settings/components/profile-section";
import BillingSection from "@/features/settings/components/billing-section";
import DangerZoneSection from "@/features/settings/components/danger-zone-section";

export default function SettingsPage() {
  return (
    <div className="fullscreen-base gap-6 p-6">
      <ProfileSection />
      <BillingSection />
      <DangerZoneSection />
    </div>
  );
}
