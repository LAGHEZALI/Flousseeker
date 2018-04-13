var webGlObject = (function() {

  return {
    init: function() {

      if(!Detector.webgl){
        Detector.addGetWebGLMessage();
      } else {

        var globe = new DAT.Globe(document.getElementById('container'));

        var createGlobe = function(globe) {
          return function() {
            new TWEEN.Tween(globe).to({time: 0},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
          };
        };

        var xhr;
        TWEEN.start();

        xhr = new XMLHttpRequest();
        xhr.open('GET', 'api/importance', true);
        xhr.onreadystatechange = function(e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var data = JSON.parse(xhr.responseText);
              window.data = data;
              console.log(data)
              globe.addData(data[1], {format: 'magnitude', name: data[0], animated: true});
              globe.createPoints();
              createGlobe(globe,0)();
              globe.animate();
              document.body.style.backgroundImage = 'none';
            }
          }
        };
        xhr.send(null);
      }
    }
  }
})(webGlObject||{})
