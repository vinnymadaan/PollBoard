import { useState } from "react";
import { createPoll } from "../services/poll.service";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreatePoll() {

  const [pollTitle, setPollTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [allowAnonymous,
    setAllowAnonymous] =
    useState(true);

  const [questions,
    setQuestions] =
    useState([
      {
        questionText: "",
        required: false,

        options: [
          { text: "" },
          { text: "" },
        ],
      },
    ]);

    const navigate = useNavigate();



  // ADD QUESTION
  const addQuestion = () => {

    setQuestions([
      ...questions,

      {
        questionText: "",
        required: false,

        options: [
          { text: "" },
          { text: "" },
        ],
      },
    ]);
  };



  // UPDATE QUESTION
  const updateQuestion = (
    index,
    value
  ) => {

    const updated =
      [...questions];

    updated[index]
      .questionText = value;

    setQuestions(updated);
  };



  // ADD OPTION
  const addOption = (
    questionIndex
  ) => {

    const updated =
      [...questions];

    updated[questionIndex]
      .options.push({
        text: "",
      });

    setQuestions(updated);
  };



  // UPDATE OPTION
  const updateOption = (
    questionIndex,
    optionIndex,
    value
  ) => {

    const updated =
      [...questions];

    updated[
      questionIndex
    ].options[
      optionIndex
    ].text = value;

    setQuestions(updated);
  };


  const handlePublish = async () => {

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    const pollData = {

      title: pollTitle,

      description,

      questions,

      allowAnonymous,

      expiresAt:
        new Date(
          Date.now() +
          7 * 24 * 60 * 60 * 1000
        ),

    };

    const response =
      await createPoll(
        pollData,
        token
      );

    console.log(response);

      toast.success(
      "Poll created successfully"
    );
    navigate("/my-polls");

  } catch (error) {

    console.log(error);

    toast.error(
      "Failed to create poll"
    );
  }
};


  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">

      {/* BLUR EFFECTS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />



      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

        {/* TOP */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12">

          <div>
            <h1 className="text-5xl font-black tracking-tight">
              Create Poll
            </h1>

            <p className="text-slate-400 mt-3 text-lg">
              Design beautiful interactive polls for your audience.
            </p>
          </div>



          <button
            onClick={handlePublish}
            className="bg-blue-600 hover:bg-blue-500 transition-all duration-300 px-7 py-4 rounded-2xl font-semibold shadow-2xl shadow-blue-500/20 hover:scale-105"
          >
            Publish Poll
          </button>

        </div>



        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            {/* POLL DETAILS */}
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-7"
            >

              <h2 className="text-2xl font-bold">
                Poll Details
              </h2>



              <div className="mt-6 space-y-5">

                <input
                  type="text"

                  placeholder="Poll title"

                  value={pollTitle}

                  onChange={(e) =>
                    setPollTitle(
                      e.target.value
                    )
                  }

                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 transition-all duration-300"
                />



                <textarea
                  placeholder="Description"

                  value={description}

                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }

                  rows={4}

                  className="w-full resize-none bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 transition-all duration-300"
                />



                {/* TOGGLE */}
                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

                  <div>
                    <h3 className="font-semibold">
                      Anonymous Voting
                    </h3>

                    <p className="text-sm text-slate-400 mt-1">
                      Allow users to vote without authentication.
                    </p>
                  </div>



                  <button
                    onClick={() =>
                      setAllowAnonymous(
                        !allowAnonymous
                      )
                    }

                    className={`w-16 h-9 rounded-full transition-all duration-300 relative ${
                      allowAnonymous
                        ? "bg-blue-600"
                        : "bg-slate-700"
                    }`}
                  >

                    <div
                      className={`absolute top-1 w-7 h-7 bg-white rounded-full transition-all duration-300 ${
                        allowAnonymous
                          ? "left-8"
                          : "left-1"
                      }`}
                    />

                  </button>

                </div>

              </div>

            </motion.div>



            {/* QUESTIONS */}
            <div className="space-y-6">

              {questions.map((
                question,
                questionIndex
              ) => (

                <motion.div

                  key={questionIndex}

                  initial={{
                    opacity: 0,
                    y: 20,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-7"
                >

                  <div className="flex items-center justify-between mb-6">

                    <h2 className="text-2xl font-bold">
                      Question {questionIndex + 1}
                    </h2>



                    <button
                      className="text-red-400 hover:text-red-300 transition-all duration-300"
                    >
                      Remove
                    </button>

                  </div>



                  {/* QUESTION INPUT */}
                  <input
                    type="text"

                    placeholder="Ask your question"

                    value={
                      question.questionText
                    }

                    onChange={(e) =>
                      updateQuestion(
                        questionIndex,
                        e.target.value
                      )
                    }

                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 transition-all duration-300"
                  />



                  {/* OPTIONS */}
                  <div className="mt-6 space-y-4">

                    {question.options.map((
                      option,
                      optionIndex
                    ) => (

                      <motion.div

                        key={optionIndex}

                        initial={{
                          opacity: 0,
                          x: -10,
                        }}

                        animate={{
                          opacity: 1,
                          x: 0,
                        }}

                        className="flex items-center gap-4"
                      >

                        <div className="w-5 h-5 rounded-full border-2 border-blue-400" />



                        <input
                          type="text"

                          placeholder={`Option ${optionIndex + 1}`}

                          value={option.text}

                          onChange={(e) =>
                            updateOption(
                              questionIndex,
                              optionIndex,
                              e.target.value
                            )
                          }

                          className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 transition-all duration-300"
                        />

                      </motion.div>

                    ))}

                  </div>



                  {/* ACTIONS */}
                  <div className="mt-6 flex items-center justify-between">

                    <button
                      onClick={() =>
                        addOption(
                          questionIndex
                        )
                      }

                      className="text-blue-400 hover:text-blue-300 transition-all duration-300 font-medium"
                    >
                      + Add Option
                    </button>



                    <label className="flex items-center gap-3 text-sm text-slate-300">

                      <input
                        type="checkbox"

                        checked={
                          question.required
                        }

                        className="accent-blue-500"
                      />

                      Required Question

                    </label>

                  </div>

                </motion.div>

              ))}

            </div>



            {/* ADD QUESTION */}
            <button
              onClick={addQuestion}

              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl py-5 text-lg font-semibold transition-all duration-300"
            >
              + Add Question
            </button>

          </div>



          {/* RIGHT SIDE PREVIEW */}
          <div className="sticky top-8">

            <motion.div

              initial={{
                opacity: 0,
                scale: 0.95,
              }}

              animate={{
                opacity: 1,
                scale: 1,
              }}

              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[32px] p-8"
            >

              <p className="text-blue-400 font-semibold mb-4">
                LIVE PREVIEW
              </p>



              <h2 className="text-4xl font-black leading-tight">
                {pollTitle ||
                  "Your poll title"}
              </h2>



              <p className="text-slate-400 mt-4 leading-relaxed">
                {description ||
                  "Poll description will appear here."}
              </p>



              <div className="mt-10 space-y-8">

                {questions.map((
                  question,
                  index
                ) => (

                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-3xl p-6"
                  >

                    <h3 className="text-xl font-bold">
                      {question.questionText ||
                        "Your question"}
                    </h3>



                    <div className="mt-5 space-y-4">

                      {question.options.map((
                        option,
                        optionIndex
                      ) => (

                        <div
                          key={optionIndex}

                          className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl px-5 py-4 transition-all duration-300 cursor-pointer"
                        >

                          <div className="w-5 h-5 rounded-full border-2 border-blue-400" />



                          <p className="text-slate-300">
                            {option.text ||
                              `Option ${optionIndex + 1}`}
                          </p>

                        </div>

                      ))}

                    </div>

                  </div>

                ))}

              </div>

            </motion.div>

          </div>

        </div>

      </div>

    </div>

  );
}