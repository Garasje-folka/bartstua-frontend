import { ReservationData } from "utils/dist/bookingManagement/types";
import { Doc } from "utils/dist/types";
import { State } from "../types/state";

// Interfaces
interface Action {
  type: string;
  data?: {
    reservations: Doc<ReservationData>[];
  };
}

export type ReservationsState = {
  data: Doc<ReservationData>[];
  status: {
    loaded: boolean;
    lastUpdated?: string;
  };
};

// Constants
const file = "ducks/reservationsState/";

// Actions
const RESERVATIONS_UPDATE = file + "RESERVATIONS_UPDATE";

// Initial state
const initialState: ReservationsState = {
  data: [],
  status: {
    loaded: false,
  },
};

// Reducer
export default function reducer(
  state: ReservationsState = initialState,
  action: Action
): ReservationsState {
  switch (action.type) {
    case RESERVATIONS_UPDATE:
      const bookings = action.data?.reservations;
      return {
        data: bookings ? [...bookings] : [],
        status: {
          ...state?.status,
          loaded: true,
          lastUpdated: new Date().toJSON(),
        },
      };
    default:
      return state;
  }
}

// Action Creator
export const reservationsUpdated = (
  reservations: Doc<ReservationData>[]
): Action => {
  return { type: RESERVATIONS_UPDATE, data: { reservations } };
};

// Selectors
export const reservationsSelector = (state: State) => state.reservations.data;

export const reservationsLoadedSelector = (state: State) => {
  return state.reservations.status.loaded;
};