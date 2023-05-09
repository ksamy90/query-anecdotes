import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAnecdotes, updateDote } from "./requests";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
// import { useReducer } from "react";
// import { showNoteReducer } from "./reducer/notificationReducer";
import { useDispatchValue } from "./context/ShowContext";

const App = () => {
  // const [notification, dispatch] = useReducer(showNoteReducer, "");
  const dispatch = useDispatchValue();
  const queryClient = useQueryClient();

  const updatedNoteMutation = useMutation(updateDote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const handleVote = (anecdote) => {
    updatedNoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({ type: "SHOW_NOTE", payload: anecdote.content });
    setTimeout(() => {
      dispatch({ type: "REMOVE_NOTE", payload: "" });
    }, 5000);
  };

  const result = useQuery("anecdotes", getAnecdotes, {
    refetchOnWindowFocus: false,
  });
  console.log(result);

  if (result.isLoading) {
    return <div>loading data...</div>;
  } else if (result.isError) {
    return <h3>anecdote service not available due to problems in server</h3>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => {
        return (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
