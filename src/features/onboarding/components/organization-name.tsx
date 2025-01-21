import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function OrganizationName() {
  return (
    <div className="w-full">
     
     <Input className="w-full" type="text" placeholder="Organization name" suppressHydrationWarning />
      
    </div>
  )
}