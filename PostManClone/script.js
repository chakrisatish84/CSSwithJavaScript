import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import prettyBytes from 'pretty-bytes';
import setupEditors from './setupEditor'
 
const queryParamsContainer = document.querySelector("[data-query-params]");
const requestheadersContainer = document.querySelector(
  "[data-request-headers]"
);
const keyValueTemplate = document.querySelector("[data-key-value-template]");
const repsonseHeaderContainer = document.querySelector(
  "[data-response-headers]"
);

const {requestEditor, updateResponseEditor} = setupEditors()

queryParamsContainer.append(createKeyValuePair());
requestheadersContainer.append(createKeyValuePair());

axios.interceptors.request.use(request =>{
  request.customData = request.customData || {}
  request.customData.startTime = new Date().getTime();
  return request;
})

const updateEndTime =(response)=>{
 response.customData = response.customData || {} 
 response.customData.time = new Date().getTime() - response.config.customData.startTime;
 return response;
}

axios.interceptors.response.use(updateEndTime, (e)=>{
  return Promise.reject(updateEndTime(e.response))
})

document
  .querySelector("[data-add-query-params-btn]")
  .addEventListener("click", () => {
    queryParamsContainer.append(createKeyValuePair());
  });

document
  .querySelector("[data-add-request-headers-btn]")
  .addEventListener("click", () => {
    requestheadersContainer.append(createKeyValuePair());
  });

function createKeyValuePair() {
  const element = keyValueTemplate.content.cloneNode(true);
  element
    .querySelector("[data-remove-button]")
    .addEventListener("click", (e) => {
      e.target.closest("[data-key-value-pair]").remove();
    });
  return element;
}

document.querySelector("[data-form]").addEventListener("submit", (e) => {
  e.preventDefault();

  let data
  try{
    data= JSON.parse(requestEditor.state.doc.toString() || null)
  }catch(e){
    alert('Json data malformed')
    return
  }

  axios({
    url: document.querySelector("[data-url]").value,
    method: document.querySelector("[data-method]").value,
    params: keyValuePairstoObject(queryParamsContainer),
    headers: keyValuePairstoObject(requestheadersContainer),
    data,
  }).catch(e=>e)
    .then((response) => {
    document
      .querySelector("[data-response-section]")
      .classList.remove("d-none");
      updateResponseDetails(response)
      updateResponseEditor(response.data)
    updateResponseHeaders(response.headers);
  });
});

const keyValuePairstoObject = (container) => {
  const pairs = container.querySelectorAll("[data-key-value-pair]");
  return [...pairs].reduce((data, pair) => {
    const key = pair.querySelector("[data-key]").value;
    const value = pair.querySelector("[data-value]").value;

    if (key === "") return data;
    return { ...data, [key]: value };
  }, {});
};

const updateResponseDetails =(response) =>{
 document.querySelector('[data-status]').textContent = response.status;
 document.querySelector('[data-time]').textContent = response.customData.time;
 document.querySelector('[data-size]').textContent = prettyBytes(JSON.stringify(response.data).length + JSON.stringify(response.headers).length)
}

const updateResponseHeaders = (headers) => {
  repsonseHeaderContainer.innerHTML = "";
  if(headers !== null && headers !== undefined){ 
  Object.entries(headers).forEach(([key,value]) =>{
  const keyElement = document.createElement('div');
  keyElement.textContent = key;
  repsonseHeaderContainer.append(keyElement)
  const valueElement = document.createElement('div');
  valueElement.textContent = value;
  repsonseHeaderContainer.append(valueElement)
  });
 };
};
