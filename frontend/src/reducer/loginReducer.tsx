type Action = {
  type: string;
  payload: boolean;
};

const Types = {
  LOGIN: 'login/LOGIN',
  LOGOFF: 'login/LOGOFF',
};

const INITIAL_STATE = {
  is_logged: false,
};

export const reducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case Types.LOGIN:
      return {
        ...state,
        is_logged: true,
      };
    case Types.LOGOFF:
      return {
        ...state,
        is_logged: false,
      };
    default:
      return state;
  }
};

export const login = () => ({
  type: Types.LOGIN,
  payload: true,
});

export const logoff = () => ({
  type: Types.LOGOFF,
  payload: false,
});
