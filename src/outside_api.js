import axios from "axios";

export default axios.create({
    baseURL: "https://api.api-ninjas.com/v1",
    headers: {
      "Content-type": "application/json",
      "x-api-key": "PUI2Sve2t/gNVh4cC5rqCQ==er0RJFpuBeULkomS",
    },
  });