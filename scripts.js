// JavaScript to toggle dashboard dropdown visibility
 document.addEventListener('DOMContentLoaded', function() {
    const quickActionsBtn = document.getElementById('quick-actions-btn');
    const quickActionsDropdown = document.querySelector('.quick-actions-dropdown');

    quickActionsBtn.addEventListener('click', function() {
        quickActionsDropdown.classList.toggle('hidden');
    });

    // Close the dropdown if user clicks outside of it
    document.addEventListener('click', function(event) {
        if (!quickActionsBtn.contains(event.target) && !quickActionsDropdown.contains(event.target)) {
            quickActionsDropdown.classList.add('hidden');
        }
    });
});
/* ===================================================================================================== */
  // Function to update date and time
  function updateDateTime() {
    const dateTimeElement = document.getElementById('date-time');
    const now = new Date();
    const formattedDateTime = now.toLocaleString();
    dateTimeElement.textContent = formattedDateTime;
}
// Update the date and time every second
setInterval(updateDateTime, 1000);
// Initial call to display the date and time immediately
updateDateTime();
/* ===================================================================================================== */
 // JavaScript to handle active class toggling
 document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
    this.classList.add('active');
  });
});
function showSection(sectionId) {
  // Remove 'active' class from all nav links
  document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
  
  // Add 'active' class to the clicked nav link
  const activeNavLink = document.querySelector(`[href="#${sectionId}"]`);
  activeNavLink.classList.add('active');
  
  // Your logic to show the corresponding section goes here
  // Example: Show or hide sections based on sectionId
}
// JavaScript function to handle section navigation
function showSection(sectionId) {
    document.querySelectorAll('main section').forEach(section => {
        section.style.display = 'none';
    });
    const target = document.getElementById(sectionId);
    if (target) target.style.display = 'block';
}
/* ===================================================================================================== */
// Function to calculate heat index
function calculateHeatIndex(temp, humidity) {
  const T = temp;
  const R = humidity;
  const heatIndex = -42.379 + 2.04901523 * T + 10.14333127 * R - 0.22475541 * T * R - 6.83783 * Math.pow(10, -3) * Math.pow(T, 2) - 5.481717 * Math.pow(10, -2) * Math.pow(R, 2) + 1.22874 * Math.pow(10, -3) * Math.pow(T, 2) * R + 8.5282 * Math.pow(10, -4) * T * Math.pow(R, 2) - 1.99 * Math.pow(10, -6) * Math.pow(T, 2) * Math.pow(R, 2);
  return heatIndex.toFixed(2);
}
// dashboard chart script function
document.addEventListener('DOMContentLoaded', () => {
  const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const temperatureData = [35, 36, 37, 38, 39, 40, 41, 40, 39, 38, 37, 36, 35, 34, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42];
  const humidityData = [55, 60, 65, 70, 75, 80, 85, 80, 75, 70, 65, 60, 55, 50, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90];
  const heatIndexData = temperatureData.map((temp, index) => calculateHeatIndex(temp, humidityData[index]));

  const ctx = document.getElementById('conditionsChart').getContext('2d');
  const conditionsChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [
              {
                  label: 'Temperature (°C)',
                  data: temperatureData,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  yAxisID: 'y-axis-temp',
                  pointStyle: 'circle',
                  pointRadius: 5,
                  pointHoverRadius: 7,
              },
              {
                  label: 'Humidity (%)',
                  data: humidityData,
                  borderColor: 'rgba(153, 102, 255, 1)',
                  backgroundColor: 'rgba(153, 102, 255, 0.2)',
                  yAxisID: 'y-axis-humidity',
                  pointStyle: 'circle',
                  pointRadius: 5,
                  pointHoverRadius: 7,
              },
              {
                  label: 'Heat Index (°C)',
                  data: heatIndexData,
                  borderColor: 'rgba(255, 99, 132, 1)',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  yAxisID: 'y-axis-heatIndex',
                  pointStyle: 'circle',
                  pointRadius: 5,
                  pointHoverRadius: 7,
              }
          ]
      },
      options: {
          scales: {
              yAxes: [
                  {
                      id: 'y-axis-temp',
                      type: 'linear',
                      position: 'left',
                      ticks: {
                          beginAtZero: true
                      },
                      scaleLabel: {
                          display: true,
                          labelString: 'Temperature (°C)'
                      }
                  },
                  {
                      id: 'y-axis-humidity',
                      type: 'linear',
                      position: 'right',
                      ticks: {
                          beginAtZero: true
                      },
                      scaleLabel: {
                          display: true,
                          labelString: 'Humidity (%)'
                      }
                  },
                  {
                      id: 'y-axis-heatIndex',
                      type: 'linear',
                      position: 'right',
                      ticks: {
                          beginAtZero: true
                      },
                      scaleLabel: {
                          display: true,
                          labelString: 'Heat Index (°C)'
                      },
                      gridLines: {
                          drawOnChartArea: false
                      }
                  }
              ]
          },
          tooltips: {
              mode: 'index',
              intersect: false,
          },
          hover: {
              mode: 'nearest',
              intersect: true
          },
          legend: {
              display: true,
              position: 'top',
              labels: {
                  fontColor: '#333',
                  usePointStyle: true,
              }
          },
          responsive: true,
          maintainAspectRatio: false
      }
  });

  
});
/* ====================================================================================================== */
// Include Chart.js library in your HTML file
// <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
// charts for history section modals
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('hidden');
  modal.classList.add('flex'); // Ensure modal is visible

  // Render chart based on modalId
  switch (modalId) {
    case 'BSISModal':
      renderChart('BSISChart', 'BSIS Building');
      break;
    case 'FarmersModal':
      renderChart('FarmersChart', 'Farmers Hall');
      break;
    default:
      break;
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('hidden');
  modal.classList.remove('flex'); // Hide modal
}

function renderChart(canvasId, location) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00',
        '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
        '20:00', '21:00', '22:00', '23:00'
      ],
      datasets: [{
        label: `${location} Temperature`,
        data: [22, 21, 20, 19, 18, 17, 16, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }, {
        label: `${location} Humidity`,
        data: [55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78],
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }, {
        label: `${location} Heat Index`,
        data: [23, 22, 21, 20, 19, 18, 17, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { beginAtZero: true },
        y: { beginAtZero: true }
      }
    }
  });
}
/* ====================================================================================================== */
