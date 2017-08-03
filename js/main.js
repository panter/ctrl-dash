var chart = c3.generate({
    data: {
        type: 'line',
        x: 'x',
        columns: [
            ['x', '2017-01-01', '2017-02-01', '2017-03-01', '2017-04-01', '2017-05-01', '2017-06-01', '2017-07-01', '2017-08-01', '2017-09-01', '2017-10-01', '2017-11-01', '2017-12-01'],
            ['2017', null],
            ['2016', null],
            ['o 2016', null],
            ['o 2017', null],
        ],
        colors: {
            '2017': 'hsl(205, 100%, 40%)',
            '2016': 'hsl(205, 100%, 60%)',
            'o 2016': 'hsl(28, 100%, 60%)'
        },
        classes: {
            '2016': 'line-silent',
            'o 2016': 'line-silent',
        },
        labels: {
            format: {
                '2017': v => v
            }
        }
    },
    point: {
        r: 5,
        'o 2016': false
    },
    grid: {
        y: {
            show: true
        }
    },
    legend: {
        position: 'right'
    },
    axis: {
        y: {
            tick: {
                format: v => v.toFixed(2),
                outer: false
            }
        },
        x: {
            type: 'timeseries',
            tick: {
                format: '%B',
                rotate: 90
            },
        }
    }
});

apiPerformanceUrl = 'http://10.2.254.235:3000/performance';
lastYear = new URL(apiPerformanceUrl);
lastYear.searchParams.set('start_date', '2016-01-01')
lastYear.searchParams.set('end_date', '2016-12-31')

fetch(lastYear)
.then(data => data.json())
.then(json => {
    const performance = json.performance.map(month => month.performance)
    const average = _.mean(performance);
    const averages = _.times(12, _.constant(average));

    chart.load({
        columns: [
            ['2016', ...performance],
            ['o 2016', ...averages]
        ]
    });
})

currentYear = new URL(apiPerformanceUrl);
currentYear.searchParams.set('start_date', '2017-01-01')
currentYear.searchParams.set('end_date', '2017-12-31')

fetch(currentYear)
.then(data => data.json())
.then(json => {
    const performance = json.performance.map(month => month.performance)

    chart.load({
        columns: [
            ['2017', ...performance],
        ]
    });
})
