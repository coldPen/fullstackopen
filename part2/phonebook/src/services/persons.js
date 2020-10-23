import axios from "axios";

const baseUrl = `http://localhost:3001/persons`;

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const create = (newObject) =>
  axios.post(baseUrl, newObject).then((response) => response.data);

const remove = (removed) =>
  axios.delete(`${baseUrl}/${removed.id}`).then(() => removed);

const update = (updated) =>
  axios
    .put(`${baseUrl}/${updated.id}`, updated)
    .then((response) => response.data);

export default { getAll, create, remove, update };
