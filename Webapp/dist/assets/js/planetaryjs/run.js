var planetaryObject = (function() {

  return {
    init: function() {




      var globe = planetaryjs.planet();
      globe.loadPlugin(autorotate(10));
      globe.loadPlugin(planetaryjs.plugins.earth({
        topojson: { file:   'assets/json/planetaryjs/planetaryMap.json' },
        oceans:   { fill:   '#333333' },
        land:     { fill:   '#ce9f00' },
        borders:  { stroke: '#ffffff' }
      }));
      globe.loadPlugin(lakes({
        fill: '#000080'
      }));
      // The `pings` plugin draws animated pings on the globe.
      globe.loadPlugin(planetaryjs.plugins.pings());
      globe.loadPlugin(planetaryjs.plugins.zoom({
        scaleExtent: [100, 300]
      }));
      globe.loadPlugin(planetaryjs.plugins.drag({
        onDragStart: function() {
          this.plugins.autorotate.pause();
        },
        onDragEnd: function() {
          this.plugins.autorotate.resume();
        }
      }));
      globe.projection.scale(175).translate([175, 175]).rotate([0, -10, 0]);

      // Every few hundred milliseconds, we'll draw another random ping.
      var colors = ['red'];
      setInterval(function() {

        // read json file
        xhr = new XMLHttpRequest();
        xhr.open('GET', 'api/rttweet', true);
        xhr.onreadystatechange = function(e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var data = JSON.parse(xhr.responseText);
              window.data = data;
              var lat, lng, color, i;
              for (i = 0; i < data.length; i += 2) {
                lat = data[i];
                lng = data[i + 1];
                color = colors[Math.floor(Math.random() * colors.length)];
                globe.plugins.pings.add(lng, lat, { color: color, ttl: 2000, angle: Math.random() * 10 });
              }
            }
          }
        };
        xhr.send(null);

      }, 200);

      var canvas = document.getElementById('pingGlobeCanvas');
      if (window.devicePixelRatio == 2) {
        canvas.width = 1000;
        canvas.height = 1000;
        context = canvas.getContext('2d');
        context.scale(2, 2);
      }
      globe.draw(canvas);

      function autorotate(degPerSec) {
        return function(planet) {
          var lastTick = null;
          var paused = false;
          planet.plugins.autorotate = {
            pause:  function() { paused = true;  },
            resume: function() { paused = false; }
          };
          // ...and configure hooks into certain pieces of its lifecycle.
          planet.onDraw(function() {
            if (paused || !lastTick) {
              lastTick = new Date();
            } else {
              var now = new Date();
              var delta = now - lastTick;
              // This plugin uses the built-in projection (provided by D3)
              // to rotate the globe each time we draw it.
              var rotation = planet.projection.rotate();
              rotation[0] += degPerSec * delta / 1000;
              if (rotation[0] >= 180) rotation[0] -= 360;
              planet.projection.rotate(rotation);
              lastTick = now;
            }
          });
        };
      };

      function lakes(options) {
        options = options || {};
        var lakes = null;

        return function(planet) {
          planet.onInit(function() {
            var world = planet.plugins.topojson.world;
            lakes = topojson.feature(world, world.objects.ne_110m_lakes);
          });

          planet.onDraw(function() {
            planet.withSavedContext(function(context) {
              context.beginPath();
              planet.path.context(context)(lakes);
              context.fillStyle = options.fill || 'black';
              context.fill();
            });
          });
        };
      };
    }
  }
})(planetaryObject||{})
