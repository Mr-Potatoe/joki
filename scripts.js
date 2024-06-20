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
  const activeNavLink = document.queelector(`[href="#${sectionId}"]`);
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
/* ===================================================================================================== */// 
// Function to calculate heat index
// Function to calculate heat index
function calculateHeatIndex(tempC, humidity) {
  const T = tempC * 9 / 5 + 32; // Convert Celsius to Fahrenheit
  const R = humidity;
  const heatIndexF = -42.379
    + 2.04901523 * T
    + 10.14333127 * R
    - 0.22475541 * T * R
    - 0.00683783 * Math.pow(T, 2)
    - 0.05481717 * Math.pow(R, 2)
    + 0.00122874 * Math.pow(T, 2) * R
    + 0.00085282 * T * Math.pow(R, 2)
    - 0.00000199 * Math.pow(T, 2) * Math.pow(R, 2);
  const heatIndexC = (heatIndexF - 32) * 5 / 9; // Convert Fahrenheit back to Celsius
  return heatIndexC.toFixed(2);
}

// Chart options for dark mode
const darkChartOptions = {
  scales: {
    x: {
      title: {
        display: true,
        text: 'Time',
        color: '#fff' // X-axis title color in dark theme
      },
      ticks: {
        color: '#aaa' // X-axis ticks color in dark theme
      }
    },
    y: {
      beginAtZero: true,
      type: 'linear',
      position: 'left',
      title: {
        display: false
      },
      ticks: {
        color: '#aaa' // Y-axis ticks color in dark theme
      }
    },
    y2: {
      beginAtZero: true,
      type: 'linear',
      position: 'right',
      title: {
        display: false
      },
      grid: {
        drawOnChartArea: false
      },
      ticks: {
        color: '#aaa' // Y2-axis ticks color in dark theme
      }
    }
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        fontColor: '#ddd', // Legend labels color in dark theme
        usePointStyle: true
      }
    },
    tooltip: {
      backgroundColor: 'rgba(50, 50, 50, 0.8)', // Tooltip background color in dark theme
      titleColor: '#fff', // Tooltip title color in dark theme
      bodyColor: '#fff', // Tooltip body text color in dark theme
      caretPadding: 10,
      cornerRadius: 5,
      displayColors: false
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  elements: {
    point: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)' // Data point background color in dark theme
    }
  }
};

// Chart options for light mode
const lightChartOptions = {
  scales: {
    x: {
      title: {
        display: true,
        text: 'Time',
        color: 'gray' // X-axis title color in light theme
      },
      ticks: {
        color: '#666' // X-axis ticks color in light theme
      }
    },
    y: {
      beginAtZero: true,
      type: 'linear',
      position: 'left',
      title: {
        display: false
      },
      ticks: {
        color: '#666' // Y-axis ticks color in light theme
      }
    },
    y2: {
      beginAtZero: true,
      type: 'linear',
      position: 'right',
      title: {
        display: false
      },
      grid: {
        drawOnChartArea: false
      },
      ticks: {
        color: '#666' // Y2-axis ticks color in light theme
      }
    }
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        fontColor: '#333', // Legend labels color in light theme
        usePointStyle: true
      }
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Tooltip background color in light theme
      titleColor: '#333', // Tooltip title color in light theme
      bodyColor: '#333', // Tooltip body text color in light theme
      caretPadding: 10,
      cornerRadius: 5,
      displayColors: false
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  elements: {
    point: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)' // Data point background color in light theme
    }
  }
};

// Function to create chart
function createChart(ctx, labels, temperatureData, humidityData, heatIndexData, theme) {
  const options = theme === 'dark' ? darkChartOptions : lightChartOptions;

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Temperature (°C)',
          data: temperatureData,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          yAxisID: 'y',
          pointStyle: 'circle',
          pointRadius: 5,
          pointHoverRadius: 7
        },
        {
          label: 'Humidity (%)',
          data: humidityData,
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          yAxisID: 'y2',
          pointStyle: 'circle',
          pointRadius: 5,
          pointHoverRadius: 7
        },
        {
          label: 'Heat Index (°C)',
          data: heatIndexData,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          yAxisID: 'y2',
          pointStyle: 'circle',
          pointRadius: 5,
          pointHoverRadius: 7
        }
      ]
    },
    options: options
  });
}

// Example usage with dark and light themes
document.addEventListener('DOMContentLoaded', () => {
  const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  
  // Data for the first location
  const temperatureData = [22, 23, 24, 25, 26, 27, 28, 27, 26, 25, 24, 23, 22, 21, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
  const humidityData = [50, 55, 60, 65, 70, 75, 80, 75, 70, 65, 60, 55, 50, 45, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85];
  
  const heatIndexData = temperatureData.map((temp, index) => calculateHeatIndex(temp, humidityData[index]));
  
  // Example usage with dark theme
  const ctx1 = document.getElementById('conditionsChart').getContext('2d');
  createChart(ctx1, labels, temperatureData, humidityData, heatIndexData, 'dark == true,false');
  
  // Data for the second location
  const temperatureData2 = [18, 19, 20, 21, 22, 27, 24, 27, 22, 21, 20, 19, 18, 17, 16, 17, 18, 19, 20, 21, 22, 27, 24, 25];
  const humidityData2 = [45, 50, 55, 60, 65, 74, 75, 74, 65, 60, 55, 50, 45, 40, 35, 40, 45, 50, 55, 60, 65, 74, 75, 80];
  
  const heatIndexData2 = temperatureData2.map((temp, index) => calculateHeatIndex(temp, humidityData2[index]));
  
  const ctx2 = document.getElementById('conditionsChart2').getContext('2d');
  createChart(ctx2, labels, temperatureData2, humidityData2, heatIndexData2, 'light ');
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
