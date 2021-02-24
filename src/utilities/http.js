import axios from "axios";

//options
const http = axios.create({
  baseURL: "http://localhost:8000",
  responseType: "json",
});

const reqHeaders = {
  "Content-Type": "application/json",
};
const authReqToken = {
  Authorization: JSON.parse(localStorage.getItem("i_hash")),
};

//api call functions

function get(url, { headers = reqHeaders, params = {} } = {}, secured = false, type = "application/json") {

  return http({
    method: "GET",
    url,
    headers: secured ? {...authReqToken, "Content-Type": type} : {...reqHeaders, "Content-Type": type},
    params,
  }).then((data) => data.data);
}

function post(
  url,
  { headers = reqHeaders, params = {}, body = {} },
  secured = false,
  type = "application/json"
) {
  // observable TODO
  return http({
    method: "POST",
    url,
    headers: secured ? {...authReqToken, "Content-Type": type} : {...reqHeaders, "Content-Type": type},
    data: body,
    params,
  }).then((data) => data.data);
}

function put(
  url,
  { headers = reqHeaders, params = {}, body = {} },
  secured = false,
  type = "application/json"
) {
 
  return http({
    method: "PUT",
    url,
    headers: secured ? {...authReqToken, "Content-Type": type} : {...reqHeaders, "Content-Type": type},
    data: body,
    params,
  })
  .then(data=>data.data);
}

function remove(
  url,
  { headers = reqHeaders, params = {}, body = {} },
  secured = false,
  type = "application/json"
) {
 
  return http({
    method: "DELETE",
    url,
    headers: secured ? {...authReqToken, "Content-Type": type} : {...reqHeaders, "Content-Type": type},
    params,
  });
}

export { post, put, remove, get };
