document.addEventListener('DOMContentLoaded', () => {
  // Sidebar Toggle for Mobile
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebarClose = document.getElementById('sidebar-close');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const dashboardSidebar = document.querySelector('.dashboard-sidebar');
  
  const toggleSidebar = () => {
    dashboardSidebar.classList.toggle('active');
    if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
  };

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', toggleSidebar);
  }

  if (sidebarClose) {
    sidebarClose.addEventListener('click', toggleSidebar);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', toggleSidebar);
  }

  // Section Switching Logic
  const navLinks = document.querySelectorAll('.sidebar-menu a');
  const sections = document.querySelectorAll('.content-section');
  const sectionTitle = document.getElementById('section-title');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetSection = link.getAttribute('data-section');
      if (!targetSection) return;

      // Update active link
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Show/Hide sections
      sections.forEach(section => {
        section.style.display = 'none';
      });
      
      const activeSection = document.getElementById(`${targetSection}-section`);
      if (activeSection) {
        activeSection.style.display = 'block';
        
        // Update header title
        const linkText = link.textContent.trim().split(' ')[0]; // Remove badge numbers if any
        sectionTitle.textContent = `Dashboard ${linkText}`;
      }

      // Close sidebar on mobile after clicking
      if (window.innerWidth <= 1024) {
        dashboardSidebar.classList.remove('active');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
      }
    });
  });

  // Logout Redirect
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'index.html';
    });
  }

  // Mock Chart Visualization
  function initChart() {
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
        
        const finalHeight = bar.style.height;
        bar.style.height = '0';
        
        chartContainer.appendChild(bar);
        
        setTimeout(() => {
          bar.style.height = finalHeight;
        }, 100);
      });
    }
  }

  initChart();
});
