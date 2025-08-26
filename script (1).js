
document.addEventListener('DOMContentLoaded', function () {
  const main = document.getElementById('main-content');

  const modules = [
    {
      title: "Department Engagement Overview",
      desc: "This chart shows how each department is engaging with Spekit over the last few months.",
      html: '<canvas id="engagementChart" height="100"></canvas>',
      render: function () {
        new Chart(document.getElementById('engagementChart'), {
          type: 'bar',
          data: {
            labels: ["Admissions", "Tech Support", "Financial Aid", "Academics", "Career Services"],
            datasets: [{
              label: "Monthly Views",
              data: [4500, 2300, 1800, 2200, 900],
              backgroundColor: "#E55725"
            }]
          },
          options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
          }
        });
      }
    },
    {
      title: "Top 5 Most Viewed Speks",
      desc: "These are the most accessed knowledge items.",
      html: '<ol class="list-decimal pl-5 text-gray-700 text-sm space-y-1"><li>Contact Management</li><li>Opportunity Overview</li><li>Duplicate Review Process</li><li>Program Enrollment Status</li><li>Updating Contact Info</li></ol>'
    },
    {
      title: "Search Behavior Trends",
      desc: "Displays recent AI search activity and trends in volume.",
      html: '<canvas id="searchTrendsChart" height="100"></canvas>',
      render: function () {
        new Chart(document.getElementById('searchTrendsChart'), {
          type: 'line',
          data: {
            labels: ["April", "May", "June", "July", "August"],
            datasets: [{
              label: "Search Volume",
              data: [120, 150, 180, 140, 175],
              borderColor: "#E55725",
              backgroundColor: "rgba(229,87,37,0.1)",
              tension: 0.4,
              fill: true
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: { mode: 'index', intersect: false }
            },
            scales: {
              y: { beginAtZero: true },
              x: { grid: { display: false } }
            }
          }
        });
      }
    },
    {
      title: "Top Unused Speks",
      desc: "Identify content with little to no engagement.",
      html: '<canvas id="unusedSpeksChart" height="100"></canvas>',
      render: function () {
        new Chart(document.getElementById('unusedSpeksChart'), {
          type: 'bar',
          data: {
            labels: ["Internal Notes", "Salesforce Settings", "Lead Status Policy", "Campus Resources", "Support Script Template"],
            datasets: [{
              label: "Views",
              data: [5, 8, 12, 6, 10],
              backgroundColor: "#FBBF24"
            }]
          },
          options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
              y: { beginAtZero: true },
              x: { ticks: { maxRotation: 30, minRotation: 30 } }
            }
          }
        });
      }
    },
    {
      title: "AI Suggestion Matrix",
      desc: "Mapping no-result searches to content that likely matches the user’s intent.",
      html: '<table class="w-full text-sm text-left text-gray-600"><thead><tr><th class="py-2">Query</th><th class="py-2">Suggested Spek</th><th class="py-2">Why?</th></tr></thead><tbody><tr><td>Enrollment freeze</td><td>Program Enrollment Status</td><td>Likely confusion with hold policies</td></tr><tr><td>Scholarship rules</td><td>Financial Aid Policy Overview</td><td>Context suggests eligibility questions</td></tr></tbody></table>'
    },
    {
      title: "Adoption Rates by Team",
      desc: "Percentage of team members actively using Spekit.",
      html: '<ul class="space-y-2 text-sm text-gray-700"><li><b>Admissions:</b> 88%</li><li><b>Tech Support:</b> 61%</li><li><b>Financial Aid:</b> 52%</li><li><b>Academics:</b> 66%</li><li><b>Career Services:</b> 35%</li></ul>'
    },
    {
      title: "ROI Calculator",
      desc: "Estimate cost savings based on productivity gains.",
      html:
        '<div class="space-y-2 text-sm text-gray-700">' +
        '<label>Active Users: <input id="roi-users" type="number" value="650" class="border rounded p-1 ml-2 w-24"/></label><br>' +
        '<label>Avg Minutes Saved/User/Week: <input id="roi-minutes" type="number" value="20" class="border rounded p-1 ml-2 w-24"/></label><br>' +
        '<p id="roi-result" class="font-semibold text-gray-800 mt-2"></p>' +
        '</div>',
      render: function () {
        const updateROI = () => {
          const users = +document.getElementById('roi-users').value;
          const minutes = +document.getElementById('roi-minutes').value;
          const annualCost = 102952;
          const hoursSaved = (users * minutes * 52) / 60;
          const hourlyRate = 28;
          const savings = hoursSaved * hourlyRate;
          const roi = ((savings - annualCost) / annualCost) * 100;
          document.getElementById('roi-result').innerText = 'Estimated Annual ROI: ' + roi.toFixed(1) + '%';
        };
        document.getElementById('roi-users').addEventListener('input', updateROI);
        document.getElementById('roi-minutes').addEventListener('input', updateROI);
        updateROI();
      }
    }
  ];

  modules.forEach((mod) => {
    const section = document.createElement('section');
    section.className = 'card';
    section.innerHTML =
      '<h2 class="section-title text-orange-600">' + mod.title + '</h2>' +
      '<p class="section-desc">' + mod.desc + '</p>' +
      mod.html;
    main.appendChild(section);
    if (mod.render) mod.render();
  });
});
