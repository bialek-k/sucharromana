import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    allJokes: [],
    showAnswer: false,
    randomJokeIndexes: [],
    currentJokeIndex: 0,
    seenJokesCount: 0,
  },
  reducers: {
    gotAllJokes(state, action) {
      state.allJokes = action.payload.allJokes;
      state.randomJokeIndexes = getRandomIndexes(
        action.payload.allJokes.length
      );
      state.currentJokeIndex = state.randomJokeIndexes[state.seenJokesCount];
    },

    toggleShowAnswer(state) {
      state.showAnswer = !state.showAnswer;
    },
    nextJoke(state) {
      state.seenJokesCount++;
      state.currentJokeIndex = state.randomJokeIndexes[state.seenJokesCount];
    },
    reload() {
      return questionSlice.initialState;
    },
  },
});

export const getInitialData = () => {
  return async (dispatch) => {
    try {
      const allJokes = await getJokes();
      dispatch(
        questionSlice.actions.gotAllJokes({
          allJokes,
        })
      );
      console.log(
        "%cŁatiwej będzie zajrzeć do kodu ⌄ :)  ",
        "color: black; font-size: 15px; background-color: yellow; padding:10px;"
      );
      console.log("https://github.com/bialek-k/Sucharromana-app");
    } catch (error) {
      console.log(error);
    }
  };
};

const getJokes = async () => {
  const response = await fetch(
    "https://sucharromana-default-rtdb.firebaseio.com/jokes.json"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  const responseData = await response.json();
  return responseData.filter((joke) => joke !== null);
};

const getRandomIndexes = (allJokesLength) => {
  const allIndexes = Array.from({ length: allJokesLength }, (_, idx) => idx);
  return randomizeArray(allIndexes);
};

const randomizeArray = (arr) => arr.slice().sort(() => Math.random() - 0.5);

export const questionActions = questionSlice.actions;
export default questionSlice.reducer;
