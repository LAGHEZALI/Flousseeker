var runBitcoinChartObject = (function() {

  return {
    init: function(period) {
      //  Start INIT (code after here)

      //  data array
      var xAxis, values;
      var textchart,timechart;

      if (period === 'day') {
        textchart = 'Bitcoin Evolution last 24 Hours (Day)';
        timechart = 'Time (Hours)';
      } else if (period === 'week') {
        textchart = 'Bitcoin Evolution last 7 days (Week)';
        timechart = 'Time (Days)';
      } else if (period === 'month') {
        textchart = 'Bitcoin Evolution last 30 Days (Month)';
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

      loadJSON('/api/charts/bitcoin/'+period, function(data) {
          //  START LOAD JSON

          xAxis = data.xAxis;
          values = data.values;

          var config = {
            type: 'line',
            data: {

              labels: xAxis,
              datasets: [{
                label: 'Bitcoin Value',
                backgroundColor: window.chartColors.blue,
                borderColor: window.chartColors.blue,
                data: values,
                fill: false
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
                    labelString: 'Value ( USD )'
                  }
                }]
              }
            }
          };

          var ctx = document.getElementById('canvas-bitcoin-chart-'+period).getContext('2d');
          window.myLine = new Chart(ctx, config);

          //  END LOAD JSON
        },
        function(xhr) { console.error(xhr); }
      );

      // END INIT (code before here)
    }
  }
})(runBitcoinChartObject||{});
