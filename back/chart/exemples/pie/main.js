var data = {
    //getValue: function(obj){return obj.litres},
    getValue: 'litres',
    //getKey: function(obj){return obj.country},
    getKey: 'country',
    data : [
        {
            country: "Czech Republic",
            litres: 25
        },
        {
            country: "Ireland",
            litres: 5
        },
        {
            country: "Germany",
            litres: 9
        },
        {
            country: "Australia",
            litres: 1
        },
        {
            country: "Austria",
            litres: 15
        },
        {
            country: "UK",
            litres: 12
        }
    ]
}

var dt = Date.now();
var pie = new Pie();

pie.container('#chart').data(data).style({radius: 200, offsetTop: 20}).build();

console.log(pie);

console.log('Time : ', Date.now() - dt, ' ms');