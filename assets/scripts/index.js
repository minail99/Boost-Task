import { getRocketsInfo } from './services.js';
import { populateRockets, downloadTimer } from './view.js';
import  { replay } from './events.js';

$(async() => {
    try {
        const res = await getRocketsInfo();
        populateRockets(res, $('.rocket-container'));
        downloadTimer();
        replay();
    } catch (err) {}
});