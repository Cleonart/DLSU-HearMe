const HOST = "wss://dlsu-hearme.herokuapp.com";

let app = new Vue({
    el : "#app",
    data : {
        soundGauge : null,
        soundValue : 0,
        connection : null,
        iotDeviceStatus : 0
    },
    methods : {

        initalizeSoundGauge : function(){
            let opts = {
                angle: 0.35,                // The span of the gauge arc
                lineWidth: 0.1,             // The line thickness
                radiusScale: 1,             // Relative radius
                pointer: {
                    length: 0.6,            // Relative to gauge radius
                    strokeWidth: 0.035,     // The thickness
                    color: '#000000'        // Fill color
                },
                limitMax: false,            // If false, max value increases automatically if value > maxValue
                limitMin: false,            // If true, the min value of the gauge will be fixed
                colorStart: '#3498db',      // Colors
                colorStop: '#3498db',       // just experiment with them
                strokeColor: '#EEEEEE',     // to see which ones work best for you
                generateGradient: true,
                highDpiSupport: true,       // High resolution support
            };
            var target = document.getElementById('gauge');          // your canvas element
            this.soundGauge = new Donut(target).setOptions(opts);   // create sexy gauge!
            this.soundGauge.maxValue = 1024;                        // set max gauge value
            this.soundGauge.setMinValue(0);                         // Prefer setter over gauge.minValue = 0
            this.soundGauge.animationSpeed = 83;                    // set animation speed (32 is default value)
            this.soundGauge.set(925);                               // set actual value
        },

        initializeWebSocket : function(){
            let app = this;
            this.connection = new WebSocket(HOST);

            // Set Status to Connecting
            app.iotDeviceStatus = 100;
            
            // If Successfully Connected to WSS
            this.connection.onopen = function(event) {
                app.iotDeviceStatus = 200;
                app.connection.send("tess");
            }

            // On Message 
            this.connection.onmessage = function(event){
                console.log(event);
                app.soundValue = parseInt(event.data);
                app.soundGauge.set(parseInt(event.data));
            }
            
            // If Connection to WSS Closed
            this.connection.onclose = function(event){
                app.iotDeviceStatus = 500;
            }
            
            this.connection.onerror = function(event){
                app.iotDeviceStatus = 500;
            }

        }
    },
    mounted(){
        this.initalizeSoundGauge();  
        this.initializeWebSocket();
    }
})



