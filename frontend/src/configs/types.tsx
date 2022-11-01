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

export type Team = {
  id: number;
  name: string;
  is_active: boolean;
};
