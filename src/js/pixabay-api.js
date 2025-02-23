import axios from 'axios';

// const instance = axios.create({
//     baseURL: 'https://pixabay.com',
//     params: {
//         key: '48977888-b03943cb340f5b9503aa6f8a3',
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: 'true',
//     }
// });

// export function getAllPhoto(query) {
//     return instance.get('/api', {params: {q: query}});    
// };


const baseUrl = "https://pixabay.com";
const endPoint = "/api";



export function getAllPhoto(query) {
    const params = new URLSearchParams({
        key: '48977888-b03943cb340f5b9503aa6f8a3',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
    });
  
    const url = baseUrl + endPoint + `?${params}`;
    return axios.get(url, {params: {q: query}})

};


 