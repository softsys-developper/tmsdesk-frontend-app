import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/Ticket.type';
import moment from "moment";
import { setService } from "@/services/set.services";

export const useTicketHook = () => {
  const { readData } = useApiServices();
  const setTicket = reactive({ loading: false, loadingCreate: false });
  const stateTickets = ref<any[]>([]);
  stateTickets.value = useDataStore().Tickets;

  const formatTicketData = (Tickets: any) => {
    return Tickets.map((Ticket: any) => ({
      id: Ticket.id,
      object: Ticket.object,
      message: Ticket.message,
      status: Ticket.status,
      date_creation: moment(Ticket.created_at).format("DD/MM/YYYY"),
    }));
  };

  const storeTickets = computed(() => {
    return useDataStore().Tickets;
  });

  //
  const FindTicketAll = () => {
    setTicket.loading = true;
    readData(API_URL.TICKET_LIST)
      .then((data: any) => {
        useDataStore().Tickets = formatTicketData(data.datas);
        setTicket.loading = false;
      })
      .catch(() => {
        setTicket.loading = false;
      });
  };

  //
  const FindTicketOne = () => {};

  //
  const CreateTicket = async (values: any) => {
    setService(
      setTicket,
      useDataStore(),
      'Tickets',
      formatTicketData
    ).SetCreate(API_URL.TICKET_CREATE, values);
  };

  //
  const TicketUpdate = (id: any, values: any) => {
    setService(
      setTicket,
      useDataStore(),
      'Tickets',
      formatTicketData
    ).SetUpdate(API_URL.TICKET_UPDATE, id, values);
  };

  //
  const TicketDelete = (id: any) => {
    setService(
      setTicket,
      useDataStore(),
      'Tickets',
      formatTicketData
    ).SetDelete(API_URL.TICKET_REMOVE, id);
  };

  return {
    FindTicketAll,
    FindTicketOne,
    CreateTicket,
    TicketUpdate,
    TicketDelete,
    stateTickets,
    setTicket,
    storeTickets,
  };
};
