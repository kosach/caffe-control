// Dummy data for charts (e.g., last 7 days of sales, transactions, inventory)
const labels = ["Mar 12", "Mar 13", "Mar 14", "Mar 15", "Mar 16", "Mar 17", "Mar 18"];
const salesData = [1100, 1500, 1300, 1250, 1430, 1580, 1700];      // Sales revenue per day
const transactionsData = [40, 52, 47, 45, 50, 53, 60];            // Transactions per day
const inventoryData = [32, 29, 31, 30, 28, 35, 33];               // Inventory units used per day

// Initialize Chart.js charts
const salesCtx = document.getElementById('salesChartCanvas').getContext('2d');
const inventoryCtx = document.getElementById('inventoryChartCanvas').getContext('2d');
const perfCtx = document.getElementById('perfChartCanvas').getContext('2d');

// Sales chart (Line chart for Sales Revenue over time)
const salesChart = new Chart(salesCtx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Sales Revenue',
      data: salesData,
      borderColor: '#4CAF50',
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      tension: 0.3,
      fill: true
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true } },
    scales: { y: { beginAtZero: true } }
  }
});

// Inventory chart (Bar chart for Inventory Used over time)
const inventoryChart = new Chart(inventoryCtx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Inventory Used',
      data: inventoryData,
      backgroundColor: '#2196F3'
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true } },
    scales: { y: { beginAtZero: true } }
  }
});

// Performance chart (Line chart for Number of Transactions over time)
const perfChart = new Chart(perfCtx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Transactions',
      data: transactionsData,
      borderColor: '#ff9800',
      backgroundColor: 'rgba(255,152,0,0.1)',
      tension: 0.3,
      fill: true
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true } },
    scales: { y: { beginAtZero: true } }
  }
});

// Update charts visibility based on selected report type
function updateCharts() {
  const reportType = document.getElementById('reportType').value;
  // Show/hide canvases according to selection
  document.getElementById('salesChartCanvas').style.display = (reportType === 'Sales') ? 'block' : 'none';
  document.getElementById('inventoryChartCanvas').style.display = (reportType === 'Inventory') ? 'block' : 'none';
  document.getElementById('perfChartCanvas').style.display = (reportType === 'Performance') ? 'block' : 'none';
  // (Optional) If we wanted to update data instead of show/hide:
  // filter the data arrays by date range and call salesChart.data.datasets[0].data = filteredSalesData, then salesChart.update() etc.&#8203;:contentReference[oaicite:10]{index=10}
}
document.getElementById('reportType').addEventListener('change', updateCharts);
document.getElementById('startDate').addEventListener('change', updateCharts);
document.getElementById('endDate').addEventListener('change', updateCharts);

// Initially show only the default selected report's chart (e.g., Sales)
updateCharts();

// Export to CSV: gather table data and trigger download
function downloadCSV(csvData, filename) {
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const tempLink = document.createElement('a');
  tempLink.href = url;
  tempLink.download = filename;
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
}
function exportTableToCSV() {
  const table = document.getElementById('reportTable');
  let csvContent = "";
  // Loop through each table row (tr)
  const rows = table.querySelectorAll('tr');
  rows.forEach(row => {
    const cols = row.querySelectorAll('th, td');
    const rowData = [];
    cols.forEach(col => rowData.push(col.innerText));
    csvContent += rowData.join(",") + "\n";
  });
  downloadCSV(csvContent, "CafeLAutomation_Report.csv");
}
document.getElementById('csvBtn').addEventListener('click', exportTableToCSV);

// Export to PDF: trigger browser print dialog (user can save as PDF)
document.getElementById('pdfBtn').addEventListener('click', () => {
  window.print();
});
