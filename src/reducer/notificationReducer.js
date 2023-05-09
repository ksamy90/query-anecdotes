const initialState = "";

export const showNoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_NOTE":
      return action.payload;
    case "REMOVE_NOTE":
      return action.payload;
    default:
      return state;
  }
};
