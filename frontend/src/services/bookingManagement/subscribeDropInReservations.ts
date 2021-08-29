import { auth, firestore } from "../fireConfig";
import { createError } from "utils/dist/helpers";
import { userManagementErrorCodes } from "../userManagement/constants";
import { DropInReservationData } from "utils/dist/bookingManagement/types";
import { Doc } from "utils/dist/types";
import { DROP_IN_RESERVATIONS } from "utils/dist/bookingManagement/constants";

export const onDropInReservationsChanged = (
  callback: (reservations: Doc<DropInReservationData>[]) => void
): (() => void) => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw createError(userManagementErrorCodes.ERROR_NO_USER);
  }
  const reservationsRef = firestore
    .collection(DROP_IN_RESERVATIONS)
    .where("uid", "==", currentUser.uid);

  const unsubscribe = reservationsRef.onSnapshot((querySnapshot) => {
    const reservations = querySnapshot.docs.map((doc) => {
      const data = doc.data() as DropInReservationData;
      return {
        data: data,
        id: doc.id,
      } as Doc<DropInReservationData>;
    });
    callback(reservations);
  });
  return () => {
    unsubscribe();
  };
};
