data = [
                {
                    "date": "01",
                    "distance": 227,
                    "latitude": 280,
                    "duration": 408
                },
                {
                    "date": "02",
                    "distance": 300,
                    "latitude": 230,
                    "duration": 482
                },
                {
                    "date": "03",
                    "distance": 400,
                    "latitude": 300,
                    "duration": 250
                },
                {
                    "date": "04",
                    "distance": 390,
                    "latitude": 300,
                    "duration": 379
                },
                {
                    "date": "05",
                    "distance": 480,
                    "latitude": 290,
                    "duration": 450
                },
                {
                    "date": "06",
                    "distance": 386,
                    "latitude": 250,
                    "duration": 400
                },
                {
                    "date": "07",
                    "distance": 348,
                    "latitude": 250,
                    "duration": 405
                },
                {
                    "date": "08",
                    "distance": 238,
                    "latitude": 240,
                    "duration": 309
                },
                {
                    "date": "09",
                    "distance": 218,
                    "latitude": 235,
                    "duration": 287
                }
];
var dt = Date.now();
var serial = new Serial();

serial.container('#chart')
		.data(data)
        .style({offsetRight: 140})

		.addAxis({field:"date", type:"horizontal"})
        .addAxis({field:"distance", type:"vertical", position: "right", titleColor: "#f00", offsetTitle: 10})
        .addAxis({field:"latitude", type:"vertical", position:'right', display:false, stepsNumber: 11, offset: 70})
        .addAxis({field:"duration", type:"vertical"})

        .addColumn({field: "distance", position: '5 30', offset: 5})
        .addColumn({field: "latitude", position: '35 30'})
        .addColumn({field: "duration", position: '65 30'})
        .addLine({field: "duration", animate: "dash-line", class: "animate"})
        .addLine({field: "distance", joint: "circle", animate: "draw-line", class: "animate dis"})
        .addLine({field: "latitude", joint: "circle"})
		.build();

$( window ).resize(function() {
    serial.delete();
    serial.build();
});

console.log(serial);
console.log('Time : ', Date.now() - dt, ' ms');
