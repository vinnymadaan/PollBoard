import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { motion } from "framer-motion";

import { getPollById } from "../services/poll.service";

import { submitVote } from "../services/poll.service";


export default function PublicPoll() {

  const { id } = useParams();

  const [poll, setPoll] = useState(null);

  const [loading, setLoading] = useState(true);

  const [answers, setAnswers] = useState({});

    const isExpired = 
    poll &&
    poll.expiresAt &&
    new Date() >
    new Date(
      poll.expiresAt
  );



  useEffect(() => {

    const fetchPoll =
      async () => {

      try {

        const data =
          await getPollById(id);

        setPoll(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchPoll();

  }, [id]);



  const handleSelect =
    (
      questionIndex,
      optionText
    ) => {

    setAnswers({

      ...answers,

      [questionIndex]:
        optionText,

    });

  };



  const handleSubmit = async () => {

  try {

    const formattedAnswers =
      Object.entries(
        answers
      ).map(
        ([questionIndex,
          selectedOption]) => ({

          questionIndex:
            Number(
              questionIndex
            ),

          selectedOption,

        })
      );



    const response =
      await submitVote(

        poll._id,

        formattedAnswers

      );



    console.log(response);

    alert(
      "Vote submitted successfully"
    );

  } catch (error) {

    console.log(error);

    alert(
      "Failed to submit vote"
    );
  }
};



  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        <h1 className="text-2xl font-bold animate-pulse">
          Loading poll...
        </h1>

      </div>

    );
  }



  if (!poll) {

    return (

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        <h1 className="text-3xl font-black">
          Poll not found
        </h1>

      </div>

    );
  }



  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">

      {/* BLURS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />



      <div className="relative z-10 max-w-4xl mx-auto px-6 py-14">

        <motion.div

          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12"
        >

          {/* HEADER */}
          <div>

            <p className="text-blue-400 font-semibold mb-5">
              PUBLIC POLL
            </p>

            <h1 className="text-5xl font-black leading-tight">
              {poll.title}
            </h1>

            <p className="text-slate-400 mt-5 leading-relaxed text-lg">
              {poll.description}
            </p>

          </div>



          {/* QUESTIONS */}
          <div className="mt-14 space-y-10">

            {poll.questions.map((
              question,
              questionIndex
            ) => (

              <motion.div

                key={questionIndex}

                initial={{
                  opacity: 0,
                  y: 10,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay:
                    questionIndex * 0.1,
                }}

                className="bg-white/5 border border-white/10 rounded-[32px] p-7"
              >

                <div className="flex items-center justify-between gap-4">

                  <h2 className="text-2xl font-black leading-tight">
                    {question.questionText}
                  </h2>



                  {question.required && (

                    <span className="text-sm text-red-400">
                      Required
                    </span>

                  )}

                </div>



                {/* OPTIONS */}
                <div className="mt-8 space-y-4">

                  {question.options.map((
                    option,
                    optionIndex
                  ) => {

                    const selected =
                      answers[
                        questionIndex
                      ] === option.text;



                    return (

                      <motion.button

                        whileTap={{
                          scale: 0.98,
                        }}

                        key={optionIndex}

                        disabled={isExpired}

                        onClick={() =>
                          handleSelect(
                            questionIndex,
                            option.text
                          )
                        }

                        className={`w-full flex items-center gap-5 px-6 py-5 rounded-2xl border transition-all duration-300 text-left ${
                          selected
                            ? "bg-blue-600/20 border-blue-500"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                      >

                        <div
                          className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                            selected
                              ? "border-blue-400 bg-blue-400"
                              : "border-slate-500"
                          }`}
                        />



                        <p className="text-lg">
                          {option.text}
                        </p>

                      </motion.button>

                    );
                  })}

                </div>

              </motion.div>

            ))}

          </div>
          
          {isExpired && (

          <div className="mt-10 bg-red-500/10 border border-red-500/20 text-red-300 rounded-2xl p-5 text-center">

            This poll has expired.
            Voting is closed.

          </div>

          )}


          {/* SUBMIT */}
          <button

            disabled={isExpired}

            onClick={handleSubmit}

            className={`w-full mt-14 py-5 rounded-2xl font-bold text-lg transition-all duration-300 ${
            sExpired
            ? "bg-slate-700 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.01] shadow-2xl shadow-cyan-500/20"
            }`}
          >
            Submit Vote
          </button>

        </motion.div>

      </div>

    </div>

  );
}