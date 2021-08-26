var opts = {
    angle: 0.35, // The span of the gauge arc
    lineWidth: 0.1, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
        length: 0.6, // // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: '#000000' // Fill color
    },
    limitMax: false,     // If false, max value increases automatically if value > maxValue
    limitMin: false,     // If true, the min value of the gauge will be fixed
    colorStart: '#3498db',   // Colors
    colorStop: '#3498db',    // just experiment with them
    strokeColor: '#EEEEEE',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true,     // High resolution support
};

var target = document.getElementById('gauge'); // your canvas element
var gauge = new Donut(target).setOptions(opts); // create sexy gauge!
gauge.maxValue = 3000; // set max gauge value
gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
gauge.animationSpeed = 83; // set animation speed (32 is default value)
gauge.set(925); // set actual value
let i = 10;
setInterval(function(){
    gauge.set(i); // set actual value
    i = i * 10;    
}, 1000);