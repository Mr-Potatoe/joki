
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

// JavaScript function to handle section navigation
function showSection(sectionId) {
    document.querySelectorAll('main section').forEach(section => {
        section.style.display = 'none';
    });
    const target = document.getElementById(sectionId);
    if (target) target.style.display = 'block';
}


function showCreateAlertForm() {
  const form = document.getElementById('create-alert-form');
  form.classList.toggle('hidden');
}

function createAlert(event) {
    event.preventDefault();
    
    // Fetch values from the form
    const description = document.getElementById('alert-description').value;
    const status = document.getElementById('alert-status').value;
  
    // Create new row for current alerts table
    const currentRow = document.createElement('tr');
    currentRow.innerHTML = `
      <td class="py-2 px-4 border-b border-gray-200 text-center">New</td>
      <td class="py-2 px-4 border-b border-gray-200 text-center">${description}</td>
      <td class="py-2 px-4 border-b border-gray-200 text-center">${status}</td>
      <td class="py-2 px-4 border-b border-gray-200 text-center">${new Date().toLocaleString()}</td>
      <td class="py-2 px-4 border-b border-gray-200 text-center">
        <button class="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-md mr-2">
          <i class="fas fa-check"></i>
        </button>
        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md">
          <i class="fas fa-times"></i>
        </button>
      </td>
    `;
    
    // Append to current alerts table
    document.getElementById('current-alerts').appendChild(currentRow);
  
    // Create new row for alert history table
    const historyRow = currentRow.cloneNode(true);
    historyRow.querySelector('td:nth-child(1)').textContent = ''; // Clear ID
    historyRow.querySelector('td:nth-child(3)').innerHTML = `
      <span class="bg-green-500 text-white px-2 py-1 rounded-full">${status}</span>
    `;
    
    // Append to alert history table
    document.getElementById('alert-history').appendChild(historyRow);
  
    // Reset form and hide create alert form
    document.getElementById('alert-form').reset();
    document.getElementById('create-alert-form').classList.add('hidden');
  }
  
function updateTheme() {
    const theme = document.getElementById('theme').value;
    document.body.className = theme === 'dark' ? 'dark-mode' : '';
}

function savePreferences() {
    const theme = document.getElementById('theme').value;
    const notifications = document.getElementById('notifications').checked;

    localStorage.setItem('theme', theme);
    localStorage.setItem('notifications', notifications);
}

function loadPreferences() {
    const theme = localStorage.getItem('theme') || 'light';
    const notifications = localStorage.getItem('notifications') === 'true';

    document.getElementById('theme').value = theme;
    document.getElementById('notifications').checked = notifications;

    updateTheme();
}

function saveSystemSettings() {
    const refreshRate = document.getElementById('refresh-rate').value;
    const sensorCalibration = document.getElementById('sensor-calibration').value;

    localStorage.setItem('refreshRate', refreshRate);
    localStorage.setItem('sensorCalibration', sensorCalibration);
}

function loadSystemSettings() {
    const refreshRate = localStorage.getItem('refreshRate') || 60;
    const sensorCalibration = localStorage.getItem('sensorCalibration') || '';

    document.getElementById('refresh-rate').value = refreshRate;
    document.getElementById('sensor-calibration').value = sensorCalibration;
}
// Function to calculate heat index
function calculateHeatIndex(temp, humidity) {
  // Using the formula from NOAA
  const T = temp;
  const R = humidity;
  const heatIndex = -42.379 + 2.04901523 * T + 10.14333127 * R - 0.22475541 * T * R - 6.83783 * Math.pow(10, -3) * Math.pow(T, 2) - 5.481717 * Math.pow(10, -2) * Math.pow(R, 2) + 1.22874 * Math.pow(10, -3) * Math.pow(T, 2) * R + 8.5282 * Math.pow(10, -4) * T * Math.pow(R, 2) - 1.99 * Math.pow(10, -6) * Math.pow(T, 2) * Math.pow(R, 2);
  return heatIndex.toFixed(2);
}

document.addEventListener('DOMContentLoaded', () => {
  // Sample data
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const temperatureData = [30, 32, 35, 33, 31, 29, 34];
  const humidityData = [70, 65, 80, 75, 70, 68, 72];
  const heatIndexData = temperatureData.map((temp, index) => calculateHeatIndex(temp, humidityData[index]));

  // Initialize the conditions chart
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
              },
              {
                  label: 'Humidity (%)',
                  data: humidityData,
                  borderColor: 'rgba(153, 102, 255, 1)',
                  backgroundColor: 'rgba(153, 102, 255, 0.2)',
                  yAxisID: 'y-axis-humidity',
              },
              {
                  label: 'Heat Index (°C)',
                  data: heatIndexData,
                  borderColor: 'rgba(255, 99, 132, 1)',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  yAxisID: 'y-axis-heatIndex',
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
          responsive: true,
          maintainAspectRatio: false
      }
  });
});
// Example function to fetch and update humidity, temperature, and heat index
function updateHistorySection() {
    // Replace with actual fetch or calculation logic
    const currentHumidity = 55; // Example value
    const currentTemperature = 25; // Example value

    // Calculate heat index (example formula)
    const heatIndex = calculateHeatIndex(currentTemperature, currentHumidity);

    // Update DOM elements
    document.getElementById('current-humidity').textContent = `${currentHumidity}%`;
    document.getElementById('current-temperature').textContent = `${currentTemperature}°C`;
    document.getElementById('heat-index').textContent = `${heatIndex}`;
}

// Example function to calculate heat index (replace with actual calculation)
function calculateHeatIndex(temperature, humidity) {
    // Example formula (replace with actual heat index calculation)
    return temperature + humidity;
}

// Call update function when page loads or as needed
updateHistorySection();


// Include Chart.js library in your HTML file
// <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

function showModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
    // Add logic to load the chart data and render the chart
    if (modalId === 'officeRoomModal') {
      renderChart('officeRoomChart', 'Office Room');
    } else if (modalId === 'livingRoomModal') {
      renderChart('livingRoomChart', 'Living Room');
    } else if (modalId === 'kitchenModal') {
      renderChart('kitchenChart', 'Kitchen');
    }
  }
  
  function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
  }
  
  function renderChart(canvasId, location) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'], // Example data
        datasets: [{
          label: `${location} Temperature`,
          data: [22, 24, 23, 25, 26, 28], // Example data
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }, {
          label: `${location} Humidity`,
          data: [55, 60, 58, 57, 56, 54], // Example data
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }, {
          label: `${location} Heat Index`,
          data: [23, 25, 24, 26, 27, 29], // Example data
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

// Sample function to show the add sensor form
function showAddSensorForm() {
    document.getElementById('add-sensor-form').style.display = 'block';
}

// Sample function to hide the add sensor form
function hideAddSensorForm() {
    document.getElementById('add-sensor-form').style.display = 'none';
}

// Sample function to add a new sensor to the table
function addSensor(event) {
    event.preventDefault(); // Prevent form submission

    // Fetch form values
    let sensorId = document.getElementById('sensor-id').value.trim();
    let location = document.getElementById('location').value.trim();
    let status = document.getElementById('status').value.trim();
    let lastUpdate = document.getElementById('last-update').value.trim();

    // Validation
    if (sensorId === '' || location === '' || status === '' || lastUpdate === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Create a new table row
    let tableBody = document.getElementById('sensor-table-body');
    let newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="py-2 px-4 border-b border-gray-300 text-center">${sensorId}</td>
        <td class="py-2 px-4 border-b border-gray-300 text-center">${location}</td>
        <td class="py-2 px-4 border-b border-gray-300 text-center">${status}</td>
        <td class="py-2 px-4 border-b border-gray-300 text-center">${lastUpdate}</td>
    `;
    tableBody.appendChild(newRow);

    // Clear form fields
    document.getElementById('sensor-id').value = '';
    document.getElementById('location').value = '';
    document.getElementById('status').value = 'Active'; // Reset status dropdown
    document.getElementById('last-update').value = '';

    // Hide the form after submission
    hideAddSensorForm();
}
