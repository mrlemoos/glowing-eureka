import { type JSX } from "react";

import { ChatModule } from "@root/modules/chat/chat.module";

function ChatByChatIdPage(): JSX.Element {
  return (
    <main className="container h-screen">
      <ChatModule />
    </main>
  );
}

export default ChatByChatIdPage;
