import axios from "axios";

//options
const http = axios.create({
  // baseURL: "https://amwine.herokuapp.com",
  baseURL: "http://localhost:8000",
  responseType: "json",
});


//api call functions

function get(url, { headers = {}, params = {} } = {}, secured = false, type = "application/json") {
  let head =secured ? {"Authorization": JSON.parse(localStorage.getItem("i_hash")), "Content-Type": type} : { "Content-Type": type};
 
  return http({
    method: "GET",
    url,
    headers: head,
    params,
  }).then((data) => data.data);
}

function post(
  url,
  { headers ={}, params = {}, body = {} },
  secured = false,
  type = "application/json"
) {
  
  let head =secured ? {"Authorization": JSON.parse(localStorage.getItem("i_hash")), "Content-Type": type} : { "Content-Type": type};
 
  return http({
    method: "POST",
    url,
    headers: head,
    data: body,
    params,
  }).then((data) => data.data);
}

function put(
  url,
  { headers ={}, params = {}, body = {} },
  secured = false,
  type = "application/json"
) {
  let head =secured ? {"Authorization": JSON.parse(localStorage.getItem("i_hash")), "Content-Type": type} : { "Content-Type": type};
 
  return http({
    method: "PUT",
    url,
    headers: head,
    data: body,
    params,
  })
  .then(data=>data.data);
}

function remove(
  url,
  { headers ={}, params = {}, body = {} },
  secured = false,
  type = "application/json"
) {
  let head =secured ? {"Authorization": JSON.parse(localStorage.getItem("i_hash")), "Content-Type": type} : { "Content-Type": type};
 
  return http({
    method: "DELETE",
    url,
    headers: head,
    params,
  });
}

export { post, put, remove, get };
