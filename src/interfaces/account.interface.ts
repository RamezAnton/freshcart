import type { AddressValues } from "@/schema/account.schema";

export interface AccountUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
}

export interface Address extends AddressValues {
  _id: string;
}
