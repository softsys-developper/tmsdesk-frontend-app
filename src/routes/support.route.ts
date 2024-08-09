import Ticket_supportPage from "@/pages/supports/ticket_support.page.vue";

export const routeSupport = {
  path: "/support",
  children: [
    {
      path: "ticket",
      name: "SUPPORT_TICKET",
      component: Ticket_supportPage,
      children: [],
    },
  ],
};
