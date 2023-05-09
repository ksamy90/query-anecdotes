import { useMutation, useQueryClient } from "react-query";
import { createDote } from "../requests";
import { useDispatchValue } from "../context/ShowContext";

const AnecdoteForm = () => {
  const dispatch = useDispatchValue();
  const queryClient = useQueryClient();
  const newNoteMutation = useMutation(createDote, {
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", notes.concat(newNote));
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    if (event.target.anecdote.value.length < 5) {
      dispatch({
        type: "SHOW_NOTE",
        payload: "too short anecdote, must have length 5 or more",
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_NOTE", payload: "" });
      }, 5000);
      return;
    }
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newNoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
