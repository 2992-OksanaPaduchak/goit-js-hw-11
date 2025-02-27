import "izitoast/dist/css/iziToast.min.css";

import iconError from "./img/iconError.svg";
import iziToast from "izitoast";
import { getAllPhoto } from './js/pixabay-api'
import { renderGallery } from './js/render-functions'


const form = document.querySelector('form');
const loader = document.querySelector('.loader__container');
const galleryImage = document.querySelector('ul.gallery');

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const queryInput = evt.target.query.value.trim();
    if (queryInput === "") {
        const message = `'Fill please field'`;
        iziToast.show({
            message,
            iconUrl: iconError,
            title: 'Erorr',
            titleColor: '#fff',
            titleSize: '16px',
            titleLineHeight: '24px',
            messageSize: '16px',
            messageLineHeight: '24px',
            messageColor: '#fff',
            backgroundColor: ' #ef4040',
            position: 'topRight',
        });
        return;
    }

    galleryImage.innerHTML = '';
    loader.style.display = 'flex'

    getAllPhoto(queryInput)
        .then((res) => {
            const hits = res.data.hits;
            loader.style.display = 'none';

            if (!hits.length) {
                const message = `'Sorry, there are no images matching your search query. Please try again!'`;
                iziToast.show({
                    message,
                    iconUrl: iconError,
                    title: 'Erorr',
                    titleColor: '#fff',
                    titleSize: '16px',
                    titleLineHeight: '24px',
                    messageSize: '16px',
                    messageLineHeight: '24px',
                    messageColor: '#fff',
                    backgroundColor: ' #ef4040',
                    position: 'topRight',
                })
                return;
            }
            
            renderGallery(hits);
        })
    .catch(() => {
            iziToast.show({
                message: 'An error occurred while fetching images. Please try again later!',
                iconUrl: iconError,
                title: 'Error',
                titleColor: '#fff',
                titleSize: '16px',
                titleLineHeight: '24px',
                messageSize: '16px',
                messageLineHeight: '24px',
                messageColor: '#fff',
                backgroundColor: '#ef4040',
                position: 'topRight',
            });
        })
        .finally( () => {
            loader.style.display = 'none';
        });

    form.reset();
});

