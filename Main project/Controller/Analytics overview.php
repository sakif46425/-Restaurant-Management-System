<?php
session_start();

// Check if user is logged in
if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Restaurant Dashboard</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <link rel="stylesheet" href="../Assets/Analytics overview.css" />
</head>
<body>
  <div class="sidebar">
    <h2>Restaurant</h2>
    
    <a href="Home Dashboard.php">Home</a>
    <a href="#">Orders</a>
    <a href="#">Reservations</a>
    <a href="#">Menu</a>
    <a href="#">Staff</a>
    <a href="#">Settings</a>

    <div class="dropdown">
      <button class="dropbtn">More</button>
      <div class="dropdown-content">
        <a href="Analytics overview.php">Analytics Overview</a>
        <a href="Quick Actions.php">Quick Actions</a>
      </div>
    </div>
  </div>

  <div class="main">
    <div class="topbar">
      <div class="logo">🍽️ MyRestaurant</div>
      <div class="profile">👤 <?php echo $_SESSION['user']; ?></div>
      <div class="dropdown">
        <button class="dropbtn">More Options</button>
        <div class="dropdown-content">
          <a href="Analytics overview.php">Analytics Overview</a>
          <a href="Home Dashboard.php">Home Dashboard</a>
          <a href="Quick Actions.php">Quick Actions</a>
        </div>
      </div>
    </div>

    <div class="analytics-section">
      <h2>📊 Analytics Overview</h2>
      <label for="dateFilter">Filter by date:</label>
      <select id="dateFilter" onchange="updateCharts()">
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="custom">Custom</option>
      </select>

      <div class="chart-container">
        <h3>📈 Sales Trend</h3>
        <canvas id="salesChart"></canvas>
      </div>

      <div class="chart-container">
        <h3>🍲 Top Dishes</h3>
        <canvas id="dishesChart"></canvas>
      </div>

      <div class="chart-container">
        <h3>⏱️ Peak Hours</h3>
        <canvas id="peakChart"></canvas>
      </div>
    </div>
  </div>

  <script src="../Assets/Analytics overview.js"></script>
</body>
</html>
