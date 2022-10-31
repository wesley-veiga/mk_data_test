type Action = {
  type: string;
  payload?: Customer;
};

export type Customer = {
  id: number;
  name: string;
  type: string;
  cpf_cnpj: string;
  rg_ie: string;
  registered_at: string;
  is_active: boolean;
  team_name: number;
};

const Types = {
  ADD_CUSTOMER: 'customer/ADD_CUSTOMER',
  LIST_CUSTOMERS: 'customer/LIST_CUSTOMER',
  UPDATE_CUSTOMER: 'customer/UPDATE_CUSTOMER',
  REMOVE_CUSTOMER: 'customer/REMOVE_CUSTOMER',
};

const INITIAL_STATE = {
  customers: [],
};

export const reducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};
