import { NextRequest } from "next/server";
import { redirect } from "next/navigation";

import { generateRandomId } from "@root/util/uuid.module";

export async function GET(_: NextRequest) {
  const chatId = await generateRandomId();

  return redirect(`/chats/${chatId}`);
}
