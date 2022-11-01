import axios from 'axios';

type Action = {
  type: string;
  payload?: Team;
};

export type Team = {
  id: number;
  name: string;
  is_active: boolean;
};

const Types = {
  ADD_TEAM: 'team/ADD_TEAM',
  LIST_TEAMS: 'team/LIST_TEAMS',
  UPDATE_TEAM: 'team/UPDATE_TEAM',
  REMOVE_TEAM: 'team/REMOVE_TEAM',
};

const INITIAL_STATE = {
  teams: [],
};

export const reducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const listTeams = (list_teams: Array<Team>) => ({
  type: Types.LIST_TEAMS,
  payload: list_teams,
});
