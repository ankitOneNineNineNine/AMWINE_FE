import axios from "axios";

//options
const http = axios.create({
  baseURL: "http://localhost:8000",
  responseType: "json",
});

const reqHeaders = {
  "Content-Type": "application/json",
};
const authReqToke = {
  Authorization: localStorage.getItem("i_hash"),
};

//api call functions

function get(url, { headers = reqHeaders, params = {} } = {}, secured = false) {
  // observable TODO
  return http({
    method: "GET",
    url,
    headers: secured ? authReqToke : reqHeaders,
    params,
  }).then((data) => data.data);
}

function post(
  url,
  { headers = reqHeaders, params = {}, body = {} },
  secured = false
) {
  // observable TODO
  return http({
    method: "POST",
    url,
    headers: secured ? authReqToke : reqHeaders,
    data: body,
    params,
  }).then((data) => data.data);
}

function put(
  url,
  { headers = reqHeaders, params = {}, body = {} },
  secured = false
) {
  return http({
    method: "PUT",
    url,
    headers: secured ? authReqToke : reqHeaders,
    data: body,
    params,
  });
}

function remove(
  url,
  { headers = reqHeaders, params = {}, body = {} },
  secured = false
) {
  // observable TODO
  return http({
    method: "DELETE",
    url,
    headers: secured ? authReqToke : reqHeaders,
    params,
  });
}

export { post, put, remove, get };
