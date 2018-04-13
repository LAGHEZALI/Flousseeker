var runSentimentChartObject = (function() {

  return {
    init: function(period) {
      //  Start INIT (code after here)

      //  data array
      var xAxis, pos, neg;
      var textchart,timechart;

      if (period === 'day') {
        textchart = 'Sentiment Analysis last 24 Hours (Day)';
        timechart = 'Time (Hours)';
      } else if (period === 'week') {
        textchart = 'Sentiment Analysis last 7 days (Week)';
        timechart = 'Time (Days)';
      } else if (period === 'month') {
        textchart = 'Sentiment Analysis last 30 Days (Month)';
        timechart = 'Time (Days)';
      }

      function loadJSON(path, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function()
        {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              if (success)
                success(JSON.parse(xhr.responseText));
            } else {
              if (error)
                error(xhr);
            }
          }
        };
        xhr.open("GET", path, true);
        xhr.send();
      }

      loadJSON('/api/charts/sentiment/'+period, function(data) {
          //  START LOAD JSON

          xAxis = data.xAxis;
          pos = data.pos;
          neg = data.neg;

          var config = {
            type: 'line',
            data: {

              labels: xAxis,
              datasets: [{
                label: 'Positive Tweets',
                backgroundColor: window.chartColors.green,
                borderColor: window.chartColors.green,
                data: pos,
                fill: false
              }, {
                label: 'Negative Tweets',
                fill: false,
                backgroundColor: window.chartColors.red,
                borderColor: window.chartColors.red,
                data: neg
              }]
            },
            options: {
              responsive: true,
              title: {
                display: true,
                text: textchart
              },
              tooltips: {
                mode: 'index',
                intersect: false
              },
              hover: {
                mode: 'nearest',
                intersect: true
              },
              scales: {
                xAxes: [{
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: timechart
                  }
                }],
                yAxes: [{
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Percentage ( % )'
                  },
                  ticks: {
                    min: 0,
                    max: 100
                  }
                }]
              }
            }
          };

          var ctx = document.getElementById('canvas-sentiment-chart-'+period).getContext('2d');
          window.myLine = new Chart(ctx, config);

          //  END LOAD JSON
        },
        function(xhr) { console.error(xhr); }
      );

      // END INIT (code before here)
    }
  }
})(runSentimentChartObject||{});
