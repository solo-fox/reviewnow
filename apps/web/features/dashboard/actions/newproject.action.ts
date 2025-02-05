"use server";

import { ServerActionError, createServerAction } from "@/lib/action-utils";
import { createClient } from "@/lib/server";

const newProjectAction = createServerAction(async () => {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  if (user.error) throw new ServerActionError(user.error.message);

  
});

export default newProjectAction;
