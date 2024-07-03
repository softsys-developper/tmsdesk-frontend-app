import { defineStore } from "pinia";
import { pusher } from "@/pusher";

export const useChatStore = defineStore({
  id: "chat",
  state: () => ({
    messages: <any>[],
  }),
  actions: {
    addMessage(message: any) {
      this.messages.push(message);
    },

    created() {
      const channel = pusher.subscribe("my-channel");
      channel.bind("new-message", (data: any) => {
        this.addMessage(data.message);
      });
    },
  },
});
