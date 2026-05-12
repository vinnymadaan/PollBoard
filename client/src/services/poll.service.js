import axios from "axios";

const API =
  "http://localhost:8000/api/polls";



export const createPoll = async (pollData, token) => {

  const response =
    await axios.post(

      `${API}/create`,

      pollData,

      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};

export const getMyPolls = async (token) => {

  const response =
    await axios.get(

      `${API}/my-polls`,

      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};

export const getPollById = async (pollId) => {

  const response =
    await axios.get(

      `${API}/${pollId}`

    );

  return response.data;
};

export const submitVote = async (
  pollId,
  answers
) => {

  const response =
    await axios.post(

      `${API}/${pollId}/vote`,

      {
        answers,
      }

    );

  return response.data;
};

export const getPollAnalytics = async (
  pollId,
  token
) => {

  const response =
    await axios.get(

      `${API}/${pollId}/analytics`,

      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }

    );

  return response.data;
};

export const publishResults = async (
  pollId,
  token
) => {

  const response =
    await axios.patch(

      `${API}/${pollId}/publish`,

      {},

      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }

    );

  return response.data;
};

export const getDashboardData = async (token) => {

  const response =
    await axios.get(

      `${API}/dashboard-data`,

      {
        headers: {

          Authorization:
            `Bearer ${token}`,

        },
      }

    );

  return response.data;
};

export const deletePoll = async (pollId, token) => {

  const response =
    await axios.delete(

      `${API}/${pollId}`,

      {
        headers: {

          Authorization:
            `Bearer ${token}`,

        },
      }

    );

  return response.data;

};