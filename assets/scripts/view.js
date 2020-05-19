let timeleft = 5;
let rocketsReponse = null;

export const displayRocket = (rocket, container) => {
    const $div = container;
    $div.append(`
        <div class="rocket rocket-${rocket.rocketid}">
            <div class="rocket-body" rocket_id="${rocket.rocketid}">
                <img src="assets/img/rocket_top.png"/>
            </div>
            <div class="rocket-bottom" rocket_id="${rocket.rocketid}" >
                <img src="assets/img/rocket_bottom.png"/>
            </div>
            <div class="rocket-body rocket-fire" rocket_id="${rocket.rocketid}">
                <img src="assets/img/thrust.png"/>
            </div>
        </div>
    `);
};

export const populateRockets = (rockets, container) => {
    rocketsReponse = rockets;

    rockets.forEach((rocket) => {
        displayRocket(rocket, container);
    });
};

export const checkFirstStageFuel = (rocket) => {
    const fuelAmount = rocket.first_stage.fuel_amount_tons;

    setTimeout(() => {
        $(`.rocket .rocket-bottom[rocket_id="${rocket.rocketid}"]`).fadeOut(1000);
        checkSecondStageFuel(rocket);
    }, fuelAmount * 1000);
}

export const checkSecondStageFuel = (rocket) => {
    const fuelAmount = rocket.second_stage.fuel_amount_tons;

    setTimeout(() => {
        $(`.rocket-${rocket.rocketid}`).remove();
        allFuelDepleted();
    }, fuelAmount * 1000);
}

export const animateRocket = (myclass) => {
    const position = makeNewPosition();
    $(myclass).animate({ top: position[0], left: position[1] }, 2500, () => {
        animateRocket(myclass);
    });
};

export const downloadTimer = setInterval(() => {

    if (timeleft <= 0) {
        clearInterval(downloadTimer);
        $('.countdown-container').fadeOut(500);
        $('.rocket-container').css('transform', 'initial');
        $('.rocket').css('position', 'fixed');

        rocketsReponse.forEach((rocket) => {
            checkFirstStageFuel(rocket);
            animateRocket(`.rocket-${rocket.rocketid}`);
        })
    } else {
        $('.countdown').html(timeleft);
    }

    timeleft -= 1;
}, 1000);

export const allFuelDepleted = () => {
    if ($('.rocket-container').children().length === 0 ) {
        $('.rocket-container').append(`
            <p class="success-msg">Success!</p>
            <div>
                <button class="btn btn-replay">Replay</button>
            </div>
        `);

        $('.rocket-container').css({
            'top': '50%',
            'bottom': 'initial',
            'transform': 'translate(-50%, -50%)',
            'text-align': 'center'
        })
    }
};

const makeNewPosition = () => {
    const height = $(window).height() - 208;
    const width = $(window).width() - 68;

    const newHeight = Math.floor(Math.random() * height);
    const newWidth = Math.floor(Math.random() * width);

    return [newHeight, newWidth];
}
