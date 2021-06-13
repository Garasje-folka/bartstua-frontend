enum GuardType {
  VERIFICATION_CHECK,
  SIGN_IN_CHECK,
  NONE,
}

interface Routing {
  path: string;
  component: React.ComponentType<any>;
  guardType: GuardType;
  expectedGuardValue?: boolean;
}

export type { Routing };
export { GuardType };