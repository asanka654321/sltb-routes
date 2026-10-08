// Sri Lanka Transport Board - Luxury Bus Route Explorer & Drawer App
document.addEventListener('DOMContentLoaded', () => {

  // ALWAYS start at the Landing Portal screen when page loads
  let currentRole = 'portal';
  localStorage.removeItem('sltb_current_role');

  // Sri Lanka Towns Geocoding Lookup Dictionary
  const PLACE_COORDS = {
    "අ/පුර -පුත්තලම් පාර": { lat: 8.3114, lng: 80.4037 },
    "අක්කරපත්තුව": { lat: 7.2173, lng: 81.8504 },
    "අක්කරේපත්තුව": { lat: 7.2173, lng: 81.8504 },
    "අකුරැස්ස": { lat: 6.0964, lng: 80.4764 },
    "අනුරාධපුර": { lat: 8.3114, lng: 80.4037 },
    "අම්පාර": { lat: 7.2912, lng: 81.6724 },
    "අම්බලන්ගොඩ": { lat: 6.2356, lng: 80.0544 },
    "අඹගස්වැව": { lat: 7.9400, lng: 81.0000 },
    "ඇඹිලිපිටිය": { lat: 6.3400, lng: 80.8500 },
    "ඇල්පිටිය": { lat: 6.2575, lng: 80.1417 },
    "උඩුගම": { lat: 6.2167, lng: 80.3167 },
    "කටුනායක": { lat: 7.1719, lng: 79.8853 },
    "කඩවත": { lat: 7.0016, lng: 79.9511 },
    "කඩුවෙල": { lat: 6.9344, lng: 79.9842 },
    "කතරගම": { lat: 6.4133, lng: 81.3331 },
    "කදුරුවෙල": { lat: 7.9333, lng: 81.0000 },
    "කරාපිටිය": { lat: 6.0667, lng: 80.2292 },
    "කරෙයිනගර්": { lat: 9.7408, lng: 79.8808 },
    "කල්මුණ": { lat: 7.4167, lng: 81.8333 },
    "කල්මුණේ": { lat: 7.4167, lng: 81.8333 },
    "කල්මුනේ": { lat: 7.4167, lng: 81.8333 },
    "කාත්තන්කුඩි": { lat: 7.6833, lng: 81.7167 },
    "කින්නියා": { lat: 8.5000, lng: 81.1833 },
    "කුරුණැගල 05": { lat: 7.4863, lng: 80.3623 },
    "කුරුණෑගල": { lat: 7.4863, lng: 80.3623 },
    "කුලියාපිටිය": { lat: 7.4688, lng: 80.0401 },
    "කො ළඹ": { lat: 6.9271, lng: 79.8612 },
    "කොළඔ": { lat: 6.9271, lng: 79.8612 },
    "කොළම": { lat: 6.9271, lng: 79.8612 },
    "කොළඹ": { lat: 6.9271, lng: 79.8612 },
    "ගාල්ල": { lat: 6.0535, lng: 80.2210 },
    "තංගල්ල": { lat: 6.0242, lng: 80.7941 },
    "ත්‍රිකුණාමලය": { lat: 8.5874, lng: 81.2152 },
    "ත්‍රිකුණාමලය(88)": { lat: 8.5874, lng: 81.2152 },
    "තෙල්දෙණිය/ මහනුවර": { lat: 7.2906, lng: 80.6337 },
    "දුටුවැව": { lat: 8.1667, lng: 80.7000 },
    "දෙණියාය": { lat: 6.3400, lng: 80.5600 },
    "නාවලපිටිය": { lat: 7.0506, lng: 80.5367 },
    "නුවර": { lat: 7.2906, lng: 80.6337 },
    "නුවරඑළිය": { lat: 6.9497, lng: 80.7891 },
    "පස්සර": { lat: 6.9333, lng: 81.1500 },
    "පාසිකුඩා": { lat: 7.9228, lng: 81.5628 },
    "පිළියන්දල": { lat: 6.7977, lng: 79.9233 },
    "පුත්තලම": { lat: 8.0362, lng: 79.8283 },
    "පුල්මුඩේ (87)": { lat: 8.9442, lng: 80.9575 },
    "පේදුරුතුඩුව": { lat: 9.8167, lng: 80.2333 },
    "පේරාදෙණිය/කොළඹ": { lat: 7.2575, lng: 80.5975 },
    "පොතුවිල්": { lat: 6.8775, lng: 81.8286 },
    "බඩල්කුඹුර": { lat: 6.8500, lng: 81.2500 },
    "බණ්ඩාරවෙල-සූරිය වැව": { lat: 6.8333, lng: 80.9833 },
    "බදුල්ල": { lat: 6.9934, lng: 81.0550 },
    "බිබිල": { lat: 7.1667, lng: 81.2167 },
    "මඩකළපුව": { lat: 7.7310, lng: 81.6747 },
    "මන්නාරම": { lat: 8.9814, lng: 79.9044 },
    "මහනුවර": { lat: 7.2906, lng: 80.6337 },
    "මහි,බිබි": { lat: 7.1667, lng: 81.2167 },
    "මහියංගණය": { lat: 7.3167, lng: 81.0000 },
    "මාකුඹුර": { lat: 6.8406, lng: 79.9725 },
    "මාකුඹූර": { lat: 6.8406, lng: 79.9725 },
    "මාතර": { lat: 5.9549, lng: 80.5550 },
    "මාතලේ": { lat: 7.4675, lng: 80.6234 },
    "මිද්දෙණිය": { lat: 6.1667, lng: 80.7667 },
    "මීගමුව": { lat: 7.2008, lng: 79.8737 },
    "මුතුර්": { lat: 8.4500, lng: 81.2667 },
    "මුතූර්": { lat: 8.4500, lng: 81.2667 },
    "මුලතිව්": { lat: 9.2671, lng: 80.8142 },
    "මොණරාගල": { lat: 6.8724, lng: 81.3510 },
    "යාපනය": { lat: 9.6615, lng: 80.0255 },
    "වව්නියාව": { lat: 8.7514, lng: 80.4971 },
    "වවුනියා": { lat: 8.7514, lng: 80.4971 },
    "වාරියපොල": { lat: 7.6250, lng: 80.2750 },
    "වැලිමඩ": { lat: 6.9036, lng: 80.9067 },
    "සම්මන්තුර": { lat: 7.3667, lng: 81.8000 },
    "සීගිරිය": { lat: 7.9570, lng: 80.7603 },
    "හම්බන්තොට": { lat: 6.1241, lng: 81.1185 },
    "හලාවත": { lat: 7.5758, lng: 79.7953 },
    "හැටන්": { lat: 6.8916, lng: 80.5967 },
    "හික්කඩුව": { lat: 6.1394, lng: 80.1063 },
    "හොරොව්පොතාන": { lat: 8.5833, lng: 80.8667 }
  };

  // State Management
  let routes = window.SLTB_ROUTES || [];
  let activeRouteId = null;
  let polylineLayers = {};
  let markerLayers = {};
  
  // Drawing state
  let isDrawingMode = false;
  let currentDrawPoints = [];
  let currentDrawPolyline = null;
  let currentDrawMarkers = [];

  // OSRM Highway Routing Function
  async function fetchHighwayRoadGeometry(p1, p2) {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${p1.lng},${p1.lat};${p2.lng},${p2.lat}?overview=full&geometries=geojson`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.routes && data.routes.length > 0) {
        const coords = data.routes[0].geometry.coordinates;
        const points = coords.map(c => [c[1], c[0]]);
        const distKm = (data.routes[0].distance / 1000).toFixed(1);
        return { points, distKm };
      }
    } catch (err) {
      console.warn('Highway OSRM routing fallback:', err);
    }
    return { points: [[p1.lat, p1.lng], [p2.lat, p2.lng]], distKm: null };
  }

  // Handle Role State & UI Updates
  const landingPortal = document.getElementById('landingPortal');
  const roleBadgeIndicator = document.getElementById('roleBadgeIndicator');
  const adminControls = document.getElementById('adminControls');
  const adminLoginModal = document.getElementById('adminLoginModal');
  const loginErrorMsg = document.getElementById('loginErrorMsg');

  function setRoleMode(role) {
    currentRole = role;

    if (role === 'portal') {
      landingPortal.classList.remove('hidden');
    } else {
      landingPortal.classList.add('hidden');
      if (role === 'admin') {
        roleBadgeIndicator.className = 'role-indicator-badge badge-mode-admin';
        roleBadgeIndicator.innerHTML = `<i class="fa-solid fa-user-shield"></i> <span>පරිපාලක මට්ටම (Admin)</span>`;
        adminControls.classList.remove('hidden');
      } else {
        roleBadgeIndicator.className = 'role-indicator-badge badge-mode-viewer';
        roleBadgeIndicator.innerHTML = `<i class="fa-solid fa-eye"></i> <span>සාමාන්‍ය නැරඹුම් මට්ටම (Viewer)</span>`;
        adminControls.classList.add('hidden');
      }
      setTimeout(() => map.invalidateSize(), 300);
      renderAll();
    }
  }

  // Landing Portal Actions
  document.getElementById('btnEnterViewer').addEventListener('click', (e) => {
    e.stopPropagation();
    setRoleMode('viewer');
  });

  document.getElementById('cardSelectViewer').addEventListener('click', (e) => {
    if (!e.target.closest('#btnEnterViewer')) {
      setRoleMode('viewer');
    }
  });

  function openAdminLoginModal() {
    loginErrorMsg.style.display = 'none';
    document.getElementById('loginUsername').value = 'admin';
    document.getElementById('loginPassword').value = '';
    adminLoginModal.classList.remove('hidden');
    document.getElementById('loginPassword').focus();
  }

  document.getElementById('btnEnterAdmin').addEventListener('click', (e) => {
    e.stopPropagation();
    openAdminLoginModal();
  });

  document.getElementById('cardSelectAdmin').addEventListener('click', (e) => {
    if (!e.target.closest('#btnEnterAdmin')) {
      openAdminLoginModal();
    }
  });

  // Switch Role / Portal Button
  document.getElementById('btnSwitchRolePortal').addEventListener('click', () => {
    setRoleMode('portal');
  });

  // Admin Login Form Submit
  document.getElementById('btnCloseLoginModal').addEventListener('click', () => adminLoginModal.classList.add('hidden'));
  document.getElementById('btnCancelLogin').addEventListener('click', () => adminLoginModal.classList.add('hidden'));

  document.getElementById('adminLoginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById('loginUsername').value.trim();
    const passwordInput = document.getElementById('loginPassword').value.trim();

    // Credentials Validation: admin / admin123 (or sltb_admin / admin123)
    if ((usernameInput === 'admin' || usernameInput === 'sltb_admin') && passwordInput === 'admin123') {
      adminLoginModal.classList.add('hidden');
      setRoleMode('admin');
      alert('පරිපාලක (Admin) ලෙස සාර්ථකව පිවිසුණි!');
    } else {
      loginErrorMsg.style.display = 'block';
    }
  });

  // Map Tile Layers Configuration
  const tileLayers = {
    google_roadmap: L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      attribution: '© Google Maps'
    }),
    google_satellite: L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      attribution: '© Google Maps'
    }),
    google_hybrid: L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      attribution: '© Google Maps'
    }),
    carto_dark: L.tileLayer('https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© CartoDB'
    }),
    osm: L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    })
  };

  // Initialize Map
  const map = L.map('map', {
    center: [7.8731, 80.7718], // Center of Sri Lanka
    zoom: 8,
    layers: [tileLayers.google_roadmap],
    zoomControl: false
  });

  // Add custom zoom control
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  // Invalidate map size
  setTimeout(() => {
    map.invalidateSize();
  }, 200);

  // Switch Tile Layer
  document.getElementById('layerSelect').addEventListener('change', (e) => {
    const selectedKey = e.target.value;
    Object.keys(tileLayers).forEach(key => map.removeLayer(tileLayers[key]));
    if (tileLayers[selectedKey]) {
      tileLayers[selectedKey].addTo(map);
    }
  });

  // Populate Filter Dropdowns
  function initFilters() {
    const regionSelect = document.getElementById('regionFilter');
    const depotSelect = document.getElementById('depotFilter');

    const regionCounts = {};
    routes.forEach(r => {
      if (r.region) {
        regionCounts[r.region] = (regionCounts[r.region] || 0) + 1;
      }
    });

    regionSelect.innerHTML = `<option value="ALL">සියලුම ප්‍රාදේශික (All Regions - ${Object.keys(regionCounts).length})</option>`;

    Object.keys(regionCounts).sort().forEach(reg => {
      const opt = document.createElement('option');
      opt.value = reg;
      opt.textContent = `${reg} (${regionCounts[reg]} රූට්ස්)`;
      regionSelect.appendChild(opt);
    });

    updateDepotsDropdown();
  }

  function updateDepotsDropdown() {
    const regionSelect = document.getElementById('regionFilter');
    const depotSelect = document.getElementById('depotFilter');
    const selectedRegion = regionSelect.value;
    const currentDepotVal = depotSelect.value;

    const depotCounts = {};
    routes.forEach(r => {
      if (selectedRegion === 'ALL' || r.region === selectedRegion) {
        if (r.depot) {
          depotCounts[r.depot] = (depotCounts[r.depot] || 0) + 1;
        }
      }
    });

    const totalDepotsCount = Object.keys(depotCounts).length;
    depotSelect.innerHTML = `<option value="ALL">සියලුම ඩිපෝ (All Depots - ${totalDepotsCount})</option>`;

    Object.keys(depotCounts).sort().forEach(dep => {
      const opt = document.createElement('option');
      opt.value = dep;
      opt.textContent = `${dep} ඩිපෝව (${depotCounts[dep]} රූට්ස්)`;
      if (dep === currentDepotVal) opt.selected = true;
      depotSelect.appendChild(opt);
    });
  }

  // Update Header Summary Stats
  function updateStats() {
    document.getElementById('statRoutesCount').textContent = routes.length;
    let totalBuses = 0;
    let totalKm = 0;

    routes.forEach(r => {
      totalBuses += parseInt(r.buses || 0, 10);
      totalKm += parseFloat(r.distance || 0);
    });

    document.getElementById('statBusesCount').textContent = totalBuses;
    document.getElementById('statKmCount').textContent = `${Math.round(totalKm).toLocaleString()} km`;
  }

  // Render Routes on Map and Sidebar
  function renderAll() {
    // Clear existing map layers
    Object.values(polylineLayers).forEach(layer => map.removeLayer(layer));
    Object.values(markerLayers).forEach(group => map.removeLayer(group));
    polylineLayers = {};
    markerLayers = {};

    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const selectedRegion = document.getElementById('regionFilter').value;
    const selectedDepot = document.getElementById('depotFilter').value;

    const filteredRoutes = routes.filter(r => {
      const matchesSearch = !searchTerm || 
        r.title.toLowerCase().includes(searchTerm) || 
        r.region.toLowerCase().includes(searchTerm) || 
        r.depot.toLowerCase().includes(searchTerm) ||
        r.from.toLowerCase().includes(searchTerm) ||
        r.to.toLowerCase().includes(searchTerm);

      const matchesRegion = selectedRegion === 'ALL' || r.region === selectedRegion;
      const matchesDepot = selectedDepot === 'ALL' || r.depot === selectedDepot;

      return matchesSearch && matchesRegion && matchesDepot;
    });

    // Render Sidebar List
    const routeListContainer = document.getElementById('routeList');
    routeListContainer.innerHTML = '';

    filteredRoutes.forEach(r => {
      // 1. Create Map Polyline
      const polyline = L.polyline(r.points, {
        color: r.color || '#007aff',
        weight: 4,
        opacity: 0.85,
        lineJoin: 'round'
      }).addTo(map);

      // Mouse click on polyline
      polyline.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        selectAndHighlightRoute(r.id);
      });

      // Hover tooltip
      polyline.bindTooltip(`<b>${r.title}</b><br>${r.depot} ඩිපෝව | ${r.distance} km`, {
        sticky: true,
        className: 'custom-tooltip'
      });

      polylineLayers[r.id] = polyline;

      // 2. Create Start / End Markers
      const startPoint = r.points[0];
      const endPoint = r.points[r.points.length - 1];

      const startIcon = L.divIcon({
        className: 'custom-pin-start',
        html: `<div style="background: #34c759; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 8px rgba(52, 199, 89, 0.8);"></div>`,
        iconSize: [12, 12]
      });

      const endIcon = L.divIcon({
        className: 'custom-pin-end',
        html: `<div style="background: #ff3b30; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 8px rgba(255, 59, 48, 0.8);"></div>`,
        iconSize: [12, 12]
      });

      const mStart = L.marker(startPoint, { icon: startIcon }).addTo(map);
      const mEnd = L.marker(endPoint, { icon: endIcon }).addTo(map);

      const markerGroup = L.layerGroup([mStart, mEnd]);
      markerLayers[r.id] = markerGroup;

      // 3. Create Sidebar Card Element
      const card = document.createElement('div');
      card.className = `route-card ${r.id === activeRouteId ? 'active' : ''}`;
      card.id = `card-${r.id}`;
      card.style.setProperty('--route-color', r.color || '#007aff');

      const adminDeleteBtn = (currentRole === 'admin') ? 
        `<button class="icon-btn danger btn-delete" title="Delete"><i class="fa-solid fa-trash-can"></i></button>` : '';

      card.innerHTML = `
        <div class="card-header">
          <div class="card-title">
            ${r.no ? `<span class="card-no">${r.no}</span>` : ''}
            <span>${r.title}</span>
          </div>
          <div style="width: 10px; height: 10px; border-radius: 50%; background: ${r.color}; box-shadow: 0 0 6px ${r.color}; flex-shrink: 0;"></div>
        </div>
        
        <div class="card-badges">
          <span class="badge badge-depot"><i class="fa-solid fa-warehouse"></i> ${r.depot} ඩිපෝව</span>
          <span class="badge badge-region"><i class="fa-solid fa-map-location-dot"></i> ${r.region}</span>
        </div>

        <div class="card-meta">
          <span><i class="fa-solid fa-road"></i> ${r.distance} km</span>
          <span><i class="fa-solid fa-bus"></i> සුඛෝපභෝගී බස් ${r.buses || 1}</span>
          <div class="card-actions">
            ${adminDeleteBtn}
          </div>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-delete')) {
          e.stopPropagation();
          deleteRoute(r.id);
          return;
        }
        selectAndHighlightRoute(r.id);
      });

      routeListContainer.appendChild(card);
    });

    updateStats();
  }

  // Highlight Selected Route (Focus, Glow, FitBounds)
  function selectAndHighlightRoute(routeId) {
    activeRouteId = routeId;

    const targetRoute = routes.find(r => r.id === routeId);
    if (!targetRoute) return;

    // Reset all polylines
    Object.keys(polylineLayers).forEach(id => {
      const pl = polylineLayers[id];
      const rData = routes.find(r => r.id === id);
      pl.setStyle({
        weight: 3.5,
        opacity: 0.4,
        color: rData ? rData.color : '#007aff'
      });
      if (pl._path) pl._path.classList.remove('route-highlight-pulse');
    });

    // Highlight active polyline
    const activePolyline = polylineLayers[routeId];
    if (activePolyline) {
      activePolyline.setStyle({
        weight: 8,
        opacity: 1,
        color: targetRoute.color || '#007aff'
      });
      activePolyline.bringToFront();

      if (activePolyline._path) {
        activePolyline._path.classList.add('route-highlight-pulse');
      }

      // Fit map bounds smoothly around route
      const bounds = activePolyline.getBounds();
      map.fitBounds(bounds, {
        padding: [60, 60],
        maxZoom: 12,
        animate: true,
        duration: 0.8
      });
    }

    // Highlight active sidebar card
    document.querySelectorAll('.route-card').forEach(card => card.classList.remove('active'));
    const activeCard = document.getElementById(`card-${routeId}`);
    if (activeCard) {
      activeCard.classList.add('active');
      activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Show floating info overlay
    const overlay = document.getElementById('routeInfoOverlay');
    document.getElementById('overlayTitle').textContent = targetRoute.title;
    document.getElementById('overlaySub').textContent = `${targetRoute.depot} ඩිපෝව | ${targetRoute.region} ප්‍රාදේශිකය`;
    document.getElementById('overlayDistance').textContent = `${targetRoute.distance} km`;
    document.getElementById('overlayBuses').textContent = `අවශ්‍ය සුඛෝපභෝගී බස්: ${targetRoute.buses}`;
    document.getElementById('overlayColorDot').style.background = targetRoute.color;

    overlay.classList.remove('hidden');
  }

  // Delete Route (Admin Only)
  function deleteRoute(routeId) {
    if (currentRole !== 'admin') {
      alert('මාර්ග ඉවත් කිරීමට කරුණාකර Admin ලෙස පිවිසෙන්න.');
      return;
    }
    if (confirm('මෙම මාර්ගය ඉවත් කිරීමට ඔබට විශ්වාසද?')) {
      routes = routes.filter(r => r.id !== routeId);
      if (activeRouteId === routeId) {
        activeRouteId = null;
        document.getElementById('routeInfoOverlay').classList.add('hidden');
      }
      initFilters();
      renderAll();
    }
  }

  // Event Listeners for Filters
  document.getElementById('searchInput').addEventListener('input', renderAll);
  
  document.getElementById('regionFilter').addEventListener('change', () => {
    updateDepotsDropdown();
    renderAll();
  });

  document.getElementById('depotFilter').addEventListener('change', renderAll);

  // Close Overlay
  document.getElementById('btnCloseOverlay').addEventListener('click', () => {
    document.getElementById('routeInfoOverlay').classList.add('hidden');
  });

  // Reset Map View
  document.getElementById('btnResetView').addEventListener('click', () => {
    map.setView([7.8731, 80.7718], 8);
    activeRouteId = null;
    document.getElementById('routeInfoOverlay').classList.add('hidden');
    renderAll();
  });

  // Toggle Sidebar
  document.getElementById('btnToggleSidebar').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
    setTimeout(() => map.invalidateSize(), 300);
  });

  // Manual Route Drawing Tools
  const drawPanel = document.getElementById('drawPanel');
  document.getElementById('btnToggleDraw').addEventListener('click', () => {
    if (currentRole !== 'admin') {
      alert('අලුත් මාර්ග ඇඳීමට කරුණාකර පරිපාලක (Admin) ලෙස පිවිසෙන්න.');
      return;
    }
    isDrawingMode = !isDrawingMode;
    if (isDrawingMode) {
      drawPanel.classList.remove('hidden');
      currentDrawPoints = [];
      map.getContainer().style.cursor = 'crosshair';
    } else {
      cancelDrawing();
    }
  });

  map.on('click', (e) => {
    if (!isDrawingMode) return;
    const pt = [e.latlng.lat, e.latlng.lng];
    currentDrawPoints.push(pt);

    const m = L.circleMarker(pt, {
      radius: 6,
      color: document.getElementById('drawColor').value,
      fillColor: '#fff',
      fillOpacity: 1
    }).addTo(map);
    currentDrawMarkers.push(m);

    if (currentDrawPolyline) {
      currentDrawPolyline.setLatLngs(currentDrawPoints);
    } else {
      currentDrawPolyline = L.polyline(currentDrawPoints, {
        color: document.getElementById('drawColor').value,
        weight: 5,
        dashArray: '8, 8'
      }).addTo(map);
    }
  });

  document.getElementById('btnSaveDraw').addEventListener('click', async () => {
    if (currentDrawPoints.length < 2) {
      alert('කරුණාකර මැප් එක මත ලක්ෂ්‍ය අවම වශයෙන් 2ක් වත් ක්ලික් කරන්න.');
      return;
    }

    const title = document.getElementById('drawTitle').value.trim() || `නව මාර්ගය #${routes.length + 1}`;
    const color = document.getElementById('drawColor').value;
    const routingMode = document.getElementById('drawRoutingMode').value;

    let finalPoints = currentDrawPoints;
    let distKm = '100';

    if (routingMode === 'road' && currentDrawPoints.length >= 2) {
      const p1 = { lat: currentDrawPoints[0][0], lng: currentDrawPoints[0][1] };
      const p2 = { lat: currentDrawPoints[currentDrawPoints.length - 1][0], lng: currentDrawPoints[currentDrawPoints.length - 1][1] };
      const roadRes = await fetchHighwayRoadGeometry(p1, p2);
      if (roadRes.points) finalPoints = roadRes.points;
      if (roadRes.distKm) distKm = roadRes.distKm;
    } else {
      let totalMeters = 0;
      for (let i = 0; i < currentDrawPoints.length - 1; i++) {
        const p1 = L.latLng(currentDrawPoints[i][0], currentDrawPoints[i][1]);
        const p2 = L.latLng(currentDrawPoints[i+1][0], currentDrawPoints[i+1][1]);
        totalMeters += p1.distanceTo(p2);
      }
      distKm = (totalMeters / 1000).toFixed(1);
    }

    const newRoute = {
      id: `custom-${Date.now()}`,
      no: `${routes.length + 1}`,
      title: title,
      region: 'Custom',
      depot: 'User Defined',
      buses: '1',
      distance: distKm,
      from: 'Start Point',
      to: 'End Point',
      color: color,
      visible: true,
      points: finalPoints
    };

    routes.unshift(newRoute);
    cancelDrawing();
    initFilters();
    renderAll();
    selectAndHighlightRoute(newRoute.id);
  });

  document.getElementById('btnCancelDraw').addEventListener('click', cancelDrawing);

  function cancelDrawing() {
    isDrawingMode = false;
    drawPanel.classList.add('hidden');
    map.getContainer().style.cursor = '';
    if (currentDrawPolyline) map.removeLayer(currentDrawPolyline);
    currentDrawMarkers.forEach(m => map.removeLayer(m));
    currentDrawPoints = [];
    currentDrawMarkers = [];
    currentDrawPolyline = null;
  }

  // Excel / CSV File Import Parser
  const excelModal = document.getElementById('excelModal');
  const excelDropzone = document.getElementById('excelDropzone');
  const excelFileInput = document.getElementById('excelFileInput');

  document.getElementById('btnImportExcel').addEventListener('click', () => {
    if (currentRole !== 'admin') {
      alert('Excel ගොනු Import කිරීමට කරුණාකර Admin ලෙස පිවිසෙන්න.');
      return;
    }
    excelModal.classList.remove('hidden');
  });

  document.getElementById('btnCloseModal').addEventListener('click', () => {
    excelModal.classList.add('hidden');
  });

  document.getElementById('btnSelectFile').addEventListener('click', () => {
    excelFileInput.click();
  });

  excelDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    excelDropzone.classList.add('dragover');
  });

  excelDropzone.addEventListener('dragleave', () => {
    excelDropzone.classList.remove('dragover');
  });

  excelDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    excelDropzone.classList.remove('dragover');
    if (e.dataTransfer.files.length) {
      handleExcelFile(e.dataTransfer.files[0]);
    }
  });

  excelFileInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
      handleExcelFile(e.target.files[0]);
    }
  });

  function handleExcelFile(file) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonRows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        await parseExcelRows(jsonRows);
        excelModal.classList.add('hidden');
        alert('Excel File එක සාර්ථකව Import කරන ලදී!');
      } catch (err) {
        alert('Excel File එක කියවීමේදී දෝෂයක් සිදු විය: ' + err.message);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  async function parseExcelRows(rows) {
    let importedRoutes = [];
    let curRegion = 'SLTB';
    let curDepot = 'General Depot';
    let curBuses = '1';

    for (let idx = 0; idx < rows.length; idx++) {
      const r = rows[idx];
      if (idx < 3 || r.length < 5) continue;
      const col0 = String(r[0] || '').trim();
      const col1 = String(r[1] || '').trim();
      const col2 = String(r[2] || '').trim();
      const col3 = String(r[3] || '').trim();
      const origin = String(r[4] || '').trim();
      const dest = String(r[5] || '').trim();
      const dist = String(r[6] || '').trim();

      if (col1) curRegion = col1;
      if (col2) curDepot = col2;
      if (col3) curBuses = col3;

      if (origin && dest && origin !== 'සිට' && dest !== 'දක්වා') {
        const p1 = PLACE_COORDS[origin] || { lat: 6.9271 + (Math.random() - 0.5) * 2, lng: 79.8612 + (Math.random() - 0.5) * 2 };
        const p2 = PLACE_COORDS[dest] || { lat: 6.9271 + (Math.random() - 0.5) * 2, lng: 79.8612 + (Math.random() - 0.5) * 2 };

        const roadRes = await fetchHighwayRoadGeometry(p1, p2);
        const points = roadRes.points;
        const calcDist = roadRes.distKm || dist || '100';

        importedRoutes.push({
          id: `imp-${Date.now()}-${idx}`,
          no: col0,
          title: `${origin} ➔ ${dest}`,
          region: curRegion,
          depot: curDepot,
          buses: curBuses,
          distance: calcDist,
          from: origin,
          to: dest,
          color: '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
          visible: true,
          points: points
        });
      }
    }

    if (importedRoutes.length > 0) {
      routes = [...importedRoutes, ...routes];
      initFilters();
      renderAll();
    }
  }

  // Initialize Data, UI & Interface
  initFilters();
  setRoleMode('portal');

  // Select first route by default
  if (routes.length > 0) {
    selectAndHighlightRoute(routes[0].id);
  }

});
