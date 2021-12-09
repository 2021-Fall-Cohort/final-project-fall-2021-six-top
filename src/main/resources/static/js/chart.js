const ctx = document.getElementById("myChart").getContext("2d");
// ctx.canvas.style.width = '451px';
const myChart = new Chart(ctx, {  
  type: "line",
  data: {
    labels: ["Janet", "Justin", "Kara", "Lee", "Armand"],
    datasets: [
      {
        label: 'Monthly Employee Sales',
        data: [5200, 2150, 3050, 1400, 4251],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
      yAxes: [{
        scaleLabel: {
          diplay: true,
          labelString: 'Sales, $USD'
        }
      }]
    },
  },
});
