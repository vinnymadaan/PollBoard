import mongoose
from "mongoose";



const answerSchema =
  new mongoose.Schema({

    questionIndex: {
      type: Number,
      required: true,
    },

    selectedOption: {
      type: String,
      required: true,
    },

  });



const responseSchema =
  new mongoose.Schema({

    pollId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "Poll",

      required: true,

    },



    answers: [
      answerSchema
    ],



    submittedAt: {

      type: Date,

      default: Date.now,

    },

  });



const Response =
  mongoose.model(
    "Response",
    responseSchema
  );



export default Response;