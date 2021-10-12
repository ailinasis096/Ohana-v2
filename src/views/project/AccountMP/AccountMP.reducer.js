const UPDATE_FORM = 'AccountMP/UPDATE_FORM';

export const updateFormDataAction = (payload) => ({
  type: UPDATE_FORM,
  payload,
});

export const initialState = {
  formData: {
    publicKey: '',
    accessToken: '',
    clientID: '',
    clientSecret: '',
  },
};

const AccountMPFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default AccountMPFormReducer;
