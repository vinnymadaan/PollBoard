import Poll from "../models/Poll.models.js";
import Response from "../models/Response.models.js"; 
import { io } from "../server.js";

export const createPoll = async (req, res) => {

  try {

    const {
      title,
      description,
      questions,
      allowAnonymous,
      expiresAt,
    } = req.body;

    const poll =
      await Poll.create({

        title,
        description,
        questions,
        allowAnonymous,
        expiresAt,
        createdBy: req.user.id,

      });

    res.status(201).json({

      message:
        "Poll created successfully",

      poll,

    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message,

    });

  }

};

export const getMyPolls = async (req, res) => {

  try {

    const polls =
      await Poll.find({

        createdBy:
          req.user.id,

      }).sort({
        createdAt: -1,
      });

    res.status(200).json(
      polls
    );

  } catch (error) {

    res.status(500).json({

      message:
        error.message,

    });

  }

};

export const getPollById = async (req, res) => {

  try {

    const poll =
      await Poll.findById(
        req.params.id
      );

    if (!poll) {

      return res.status(404).json({
        message:
          "Poll not found",
      });

    }

    res.status(200).json(
      poll
    );

  } catch (error) {

    res.status(500).json({

      message:
        error.message,

    });

  }

};

export const submitVote = async (req, res) => {

  try {

    const { answers } =
      req.body;

    const poll =
      await Poll.findById(
        req.params.id
      );

    if (!poll) {

      return res.status(404).json({
        message:
          "Poll not found",
      });

    }



    // STORE RESPONSE
    await Response.create({

      pollId:
        poll._id,

      answers,

    });



    // UPDATE VOTE COUNTS
    answers.forEach(
      (answer) => {

      const question =
        poll.questions[
          answer.questionIndex
        ];



      const option =
        question.options.find(
          (opt) =>
            opt.text ===
            answer.selectedOption
        );



      if (option) {
        option.votes += 1;
      }

    });



    await poll.save();
    io.emit( "pollUpdated" );



    res.status(200).json({

      message:
        "Vote submitted successfully",

    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message,

    });

  }

};

export const getPollAnalytics = async (req, res) => {

  try {

    const poll =
      await Poll.findById(
        req.params.id
      );

    if (!poll) {

      return res.status(404).json({
        message:
          "Poll not found",
      });

    }

    const totalResponses =
      await Response.countDocuments({

        pollId:
          poll._id,

      });

    res.status(200).json({

      pollTitle:
        poll.title,

      totalResponses,

      questions:
        poll.questions,

    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message,

    });

  }

};

export const publishResults = async (req, res) => {

  try {

    const poll =
      await Poll.findById(
        req.params.id
      );

    if (!poll) {

      return res.status(404).json({
        message:
          "Poll not found",
      });

    }



    // OWNER CHECK
    if (
      poll.createdBy.toString() !==
      req.user.id
    ) {

      return res.status(403).json({

        message:
          "Unauthorized",

      });

    }



    poll.isPublished =
      true;

    await poll.save();



    res.status(200).json({

      message:
        "Results published",

    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message,

    });

  }

};

export const getDashboardData = async (req, res) => {

  try {

    const polls =
      await Poll.find({

        createdBy:
          req.user.id,

      });



    const totalPolls =
      polls.length;



    const publishedResults =
      polls.filter(
        (poll) =>
          poll.isPublished
      ).length;



    const activePolls =
      polls.filter(
        (poll) =>

          !poll.expiresAt ||

          new Date(
            poll.expiresAt
          ) > new Date()

      ).length;



    let totalResponses = 0;



    polls.forEach((poll) => {

      poll.questions.forEach(
        (question) => {

          question.options.forEach(
            (option) => {

              totalResponses +=
                option.votes;

            }
          );

        }
      );

    });



    res.status(200).json({

      totalPolls,

      totalResponses,

      activePolls,

      publishedResults,

      recentPolls:
        polls.slice(-3).reverse(),

    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message,

    });

  }

};
