// Client-Side JavaScript

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1   = document.querySelector('#msg1');
const msg2   = document.querySelector('#msg2');
const msg3   = document.querySelector('#msg3');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    
    msg1.textContent = 'Loading...';
    msg2.textContent = '';
    msg3.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            return msg1.textContent = data.error;
        }
        msg1.textContent = data.location;
        msg2.textContent = data.forecast;
        msg3.textContent = data.daily_summary;
    });
    });

});