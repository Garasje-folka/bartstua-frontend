import { HOME, SIGNIN } from "../routeConstants";
import { User } from "../../services/userManagement/interfaces";
import { GuardFunction } from "../types/guardFunction";

const signInCheck: (
  currentUser: User | null,
  expectedValue?: boolean
) => GuardFunction = (currentUser, expectedValue) => () => ({
  accepted:
    (expectedValue && !!currentUser) || (!expectedValue && !currentUser),
  redirectPath: expectedValue ? SIGNIN : HOME,
});

export { signInCheck };