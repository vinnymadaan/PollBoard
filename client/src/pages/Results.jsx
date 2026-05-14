import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import axios from "axios";

const api_url = import.meta.env.VITE_API_URL


function Results() {

  const { id } =
    useParams();



  const [poll,
    setPoll] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  const [error,
    setError] =
    useState("");



  useEffect(() => {

    const fetchPoll =
      async () => {

      try {

        const response =
          await axios.get(

            `${api_url}/polls/${id}`

          );



        const pollData =
          response.data;



        // results not published

        if (
          !pollData.isPublished
        ) {

          setError(
            "Results are not published yet."
          );

          return;

        }



        setPoll(
          pollData
        );

      } catch (error) {

        setError(
          "Failed to load results"
        );

      } finally {

        setLoading(false);

      }

    };



    fetchPoll();

  }, [id]);



  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">

        Loading results...

      </div>

    );

  }



  if (error) {

    return (

      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center text-white max-w-xl w-full">

          <h1 className="text-3xl font-bold">
            {error}
          </h1>

        </div>

      </div>

    );

  }



  return (

    <div className="min-h-screen bg-slate-950 text-white px-6 py-16">

      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-16">

          <h1 className="text-5xl font-black">

            Poll Results
          </h1>

          <p className="text-slate-400 mt-4 text-xl">

            {poll.title}

          </p>

        </div>



        <div className="space-y-10">

          {poll.questions.map(

            (question, questionIndex) => {

              const totalVotes =

                question.options.reduce(

                  (sum, option) =>

                    sum + option.votes,

                  0

                );



              return (

                <div

                  key={questionIndex}

                  className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
                >

                  <h2 className="text-2xl font-bold mb-8">

                    {question.questionText}

                  </h2>



                  <div className="space-y-6">

                    {question.options.map(

                      (option, optionIndex) => {

                        const percentage =

                          totalVotes === 0

                            ? 0

                            : Math.round(

                                (option.votes /

                                  totalVotes) *

                                  100

                              );



                        return (

                          <div
                            key={optionIndex}
                          >

                            <div className="flex items-center justify-between mb-3">

                              <p className="font-medium text-lg">

                                {option.text}

                              </p>

                              <p className="text-blue-400 font-bold">

                                {percentage}%

                              </p>

                            </div>



                            <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden">

                              <div

                                style={{
                                  width: `${percentage}%`,
                                }}

                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                              />

                            </div>



                            <p className="text-slate-500 mt-2 text-sm">

                              {option.votes} votes

                            </p>

                          </div>

                        );

                      }

                    )}

                  </div>



                  <p className="mt-8 text-slate-400">

                    Total Votes: {totalVotes}

                  </p>

                </div>

              );

            }

          )}

        </div>

      </div>

    </div>

  );

}



export default Results;