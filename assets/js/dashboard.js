document.addEventListener('DOMContentLoaded', () => {
  // Sidebar Toggle for Mobile
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const dashboardSidebar = document.querySelector('.dashboard-sidebar');
  const dashboardMain = document.querySelector('.dashboard-main');

  if (sidebarToggle && dashboardSidebar) {
    sidebarToggle.addEventListener('click', () => {
      dashboardSidebar.classList.toggle('active');
    });
  }

  // Logout Redirect
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Clear any session data here if needed
      window.location.href = 'index.html';
    });
  }

  // Mock Chart Visualization (Using vanilla JS Canvas or simple DOM elements since no external libraries allowed except FontAwesome)
  // We will simulate a chart using CSS flexbox for the engagement charts
  const chartContainer = document.getElementById('engagement-chart');
  if (chartContainer) {
    const dataPoints = [40, 60, 30, 80, 50, 90, 70];
    const maxVal = Math.max(...dataPoints);
    
    chartContainer.innerHTML = '';
    chartContainer.style.display = 'flex';
    chartContainer.style.alignItems = 'flex-end';
    chartContainer.style.gap = '10px';
    chartContainer.style.height = '200px';
    chartContainer.style.padding = '20px 0';
    
    dataPoints.forEach(val => {
      const bar = document.createElement('div');
      const heightPercent = (val / maxVal) * 100;
      bar.style.height = `${heightPercent}%`;
      bar.style.flex = '1';
      bar.style.background = 'var(--gradient)';
      bar.style.borderRadius = '4px 4px 0 0';
      bar.style.transition = 'height 1s ease';
      
      // Initial height 0 for animation
      const finalHeight = bar.style.height;
      bar.style.height = '0';
      
      chartContainer.appendChild(bar);
      
      setTimeout(() => {
        bar.style.height = finalHeight;
      }, 100);
    });
  }
});
