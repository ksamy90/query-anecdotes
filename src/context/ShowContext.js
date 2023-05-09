import { createContext, useContext, useReducer } from "react";
import { showNoteReducer } from "../reducer/notificationReducer";

const ShowContext = createContext();

export const ShowContextProvider = (props) => {
  const [showNote, noteDispatch] = useReducer(showNoteReducer, "");
  return (
    <ShowContext.Provider value={[showNote, noteDispatch]}>
      {props.children}
    </ShowContext.Provider>
  );
};

export const useNotifyValue = () => {
  const showDispatch = useContext(ShowContext);
  return showDispatch[0];
};

export const useDispatchValue = () => {
  const showDispatch = useContext(ShowContext);
  return showDispatch[1];
};

export default ShowContext;
