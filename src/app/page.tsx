import Link from "next/link";

import { Button } from "@root/components/ui/button.module";
import { generateRandomId } from "@root/util/uuid.module";

import "@root/styles/globals.css";

/**
 * The home page.
 */
async function Home(): Promise<JSX.Element> {
  const chatId = await generateRandomId();

  const href = `/chats/${chatId}`;

  return (
    <main className="flex items-center justify-center max-h-screen">
      <Button asChild={true} variant="link">
        <Link href={href} target="_self">
          Go to chat
        </Link>
      </Button>
    </main>
  );
}

export default Home;
