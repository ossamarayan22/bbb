let scroll_btn = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scroll_btn.classList.add('active');
    } else {
        scroll_btn.classList.remove('active');
    }
});

scroll_btn.addEventListener('click', () => {
    document.documentElement.scrollIntoView({
        behavior: 'smooth',
    });
});


    for (let i = 0; i < response.length; i++) {
        let time = new Date(response[i]['DateUtc']);
        let localTime = time.toLocaleTimeString().replace(':00:00', ':00');
        let day_month = time.toString().split(' ');
        let date = day_month[2];
        let home_team = response[i]['HomeTeam'];
        let home_flag = response[i]['flag'][0];
        let away_team = response[i]['AwayTeam'];
        let away_flag = response[i]['flag'][1];
        let stadium = response[i]['Location'];
        let group = response[i]['Group'];
        let matchNumber = response[i]['MatchNumber'];
        let roundNumber = response[i]['RoundNumber'];
        let Match = {
            localTime,
            day: day_month[0],
            month: day_month[1],
            home_team,
            home_flag,
            away_team,
            away_flag,
            stadium,
            group,
            matchNumber,
            roundNumber,
            date,
        };
        all_match.push(Match);
        randerDom(Match, match_by_date);
    }

    function fBg(group) {
        return all_match.filter((g) => {
            return g.group.includes(group);
        });
    }
    let filter_by_group = [
        ...fBg('Group A'),
        ...fBg('Group B'),
        ...fBg('Group C'),
        ...fBg('Group D'),
        ...fBg('Group E'),
        ...fBg('Group F'),
        ...fBg('Group G'),
        ...fBg('Group H'),
    ];
    for (let j = 0; j < filter_by_group.length; j++) {
        randerDom(filter_by_group[j], match_by_group);
    }

fetchMatch();