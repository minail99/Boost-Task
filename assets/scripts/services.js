export const getRocketsInfo = () => {
    return fetch('https://api.spacexdata.com/v2/rockets')
        .then((res) => res.json());
}