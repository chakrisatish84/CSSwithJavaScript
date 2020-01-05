const degree = 6;
const hr = document.querySelector('#hr');
const min = document.querySelector('#min');
const sec = document.querySelector('#sec');

setInterval(() => {
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * degree;
    let sc = day.getSeconds() * degree;    
    
    hr.style.transform= `rotateZ(${hh+(mm/12)}deg)`;
    min.style.transform= `rotateZ(${mm}deg)`;
    sec.style.transform= `rotateZ(${sc}deg)`;
});