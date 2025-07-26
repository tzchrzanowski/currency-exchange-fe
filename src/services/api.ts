import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9123',
    headers: {
        'Content-Type': 'application/json',
        "x-currency-token": "dasdiubasiob1=231231238913y4-n432r2nby83rt29"
    }
});

export default api;