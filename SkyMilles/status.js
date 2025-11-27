// Dados expandidos dos voos com mais informações
const flightsData = [
    {
        number: "SK100",
        departure: "São Paulo (GRU)",
        arrival: "Rio de Janeiro (GIG)",
        departureTime: "14:30",
        departureDate: "2025-01-15",
        arrivalTime: "15:45",
        arrivalDate: "2025-01-15",
        status: "no-tempo",
        gate: "A12",
        aircraft: "Boeing 737-800",
        airline: "SkyMilles",
        duration: "1h 15m",
        distance: "400 km",
        delay: "0 min",
        passengers: 156,
        occupancy: 87
    },
    {
        number: "SK201",
        departure: "Rio de Janeiro (GIG)",
        arrival: "Salvador (SSA)",
        departureTime: "16:00",
        departureDate: "2025-01-15",
        arrivalTime: "17:50",
        arrivalDate: "2025-01-15",
        status: "atrasado",
        gate: "B05",
        aircraft: "Airbus A320",
        airline: "SkyMilles",
        duration: "1h 50m",
        distance: "1086 km",
        delay: "25 min",
        passengers: 182,
        occupancy: 94
    },
    {
        number: "SK305",
        departure: "Brasília (BSB)",
        arrival: "São Paulo (GRU)",
        departureTime: "09:15",
        departureDate: "2025-01-15",
        arrivalTime: "10:30",
        arrivalDate: "2025-01-15",
        status: "embarque",
        gate: "C08",
        aircraft: "Boeing 737-800",
        airline: "SkyMilles",
        duration: "1h 15m",
        distance: "850 km",
        delay: "0 min",
        passengers: 145,
        occupancy: 79
    },
    {
        number: "SK450",
        departure: "São Paulo (GRU)",
        arrival: "Manaus (MAO)",
        departureTime: "11:00",
        departureDate: "2025-01-15",
        arrivalTime: "14:20",
        arrivalDate: "2025-01-15",
        status: "decolou",
        gate: "D02",
        aircraft: "Airbus A330",
        airline: "SkyMilles",
        duration: "3h 20m",
        distance: "2800 km",
        delay: "0 min",
        passengers: 298,
        occupancy: 91
    },
    {
        number: "SK520",
        departure: "Salvador (SSA)",
        arrival: "Recife (REC)",
        departureTime: "13:45",
        departureDate: "2025-01-15",
        arrivalTime: "14:55",
        arrivalDate: "2025-01-15",
        status: "cancelado",
        gate: "E15",
        aircraft: "Boeing 737-800",
        airline: "SkyMilles",
        duration: "1h 10m",
        distance: "265 km",
        delay: "Cancelado",
        passengers: 0,
        occupancy: 0
    },
    {
        number: "SK650",
        departure: "Curitiba (CWB)",
        arrival: "São Paulo (GRU)",
        departureTime: "17:30",
        departureDate: "2025-01-15",
        arrivalTime: "18:45",
        arrivalDate: "2025-01-15",
        status: "no-tempo",
        gate: "A20",
        aircraft: "Airbus A320",
        airline: "SkyMilles",
        duration: "1h 15m",
        distance: "408 km",
        delay: "0 min",
        passengers: 168,
        occupancy: 82
    }
];

const flightsContainer = document.getElementById('flightsContainer');
const searchInput = document.getElementById('searchInput');
const filterStatus = document.getElementById('filterStatus');
const emptyState = document.getElementById('emptyState');

// Mapear status para texto exibição
const statusMap = {
    'no-tempo': 'No Tempo',
    'atrasado': 'Atrasado',
    'embarque': 'Embarque',
    'decolou': 'Decolou',
    'cancelado': 'Cancelado'
};

function createFlightCard(flight) {
    const card = document.createElement('div');
    card.className = `flight-card ${flight.status}`;
    
    const delayInfo = flight.status === 'cancelado' ? 
        `<span class="delay-badge cancelado">CANCELADO</span>` :
        flight.delay !== '0 min' ? 
        `<span class="delay-badge atrasado">⚠ ${flight.delay}</span>` :
        `<span class="delay-badge on-time">✓ No horário</span>`;
    
    card.innerHTML = `
        <div class="flight-header">
            <span class="flight-number">${flight.number}</span>
            <span class="flight-status status-${flight.status}">${statusMap[flight.status]}</span>
            ${delayInfo}
        </div>
        
        <div class="flight-route">
            <span class="airport-code">${flight.departure.split('(')[1].replace(')', '')}</span>
            <span class="route-arrow">→</span>
            <span class="airport-code">${flight.arrival.split('(')[1].replace(')', '')}</span>
        </div>

        <div class="flight-times">
            <div class="time-section">
                <div class="time-label">Partida</div>
                <div class="time-value">${flight.departureTime}</div>
                <div class="airport-name">${flight.departure}</div>
            </div>
            <div class="flight-duration">${flight.duration}</div>
            <div class="time-section">
                <div class="time-label">Chegada</div>
                <div class="time-value">${flight.arrivalTime}</div>
                <div class="airport-name">${flight.arrival}</div>
            </div>
        </div>

        <div class="flight-details-grid">
            <div class="detail-box">
                <div class="detail-label">Aeronave</div>
                <div class="detail-value">${flight.aircraft}</div>
            </div>
            <div class="detail-box">
                <div class="detail-label">Portão</div>
                <div class="detail-value gate">${flight.gate}</div>
            </div>
            <div class="detail-box">
                <div class="detail-label">Distância</div>
                <div class="detail-value">${flight.distance}</div>
            </div>
            <div class="detail-box">
                <div class="detail-label">Ocupação</div>
                <div class="detail-value">${flight.occupancy}%</div>
            </div>
        </div>

        <div class="occupancy-bar">
            <div class="occupancy-fill" style="width: ${flight.occupancy}%"></div>
        </div>

        <div class="flight-footer">
            <button class="btn-details" onclick="mostrarDetalhes('${flight.number}')">Ver Detalhes</button>
            <button class="btn-notificacao">🔔 Notificar</button>
        </div>
    `;
    return card;
}

function updateFlightStatistics() {
    const totalFlights = flightsData.length;
    const onTimeFlights = flightsData.filter(f => f.status === 'no-tempo').length;
    const delayedFlights = flightsData.filter(f => f.status === 'atrasado').length;
    const canceledFlights = flightsData.filter(f => f.status === 'cancelado').length;

    const totalFlightsEl = document.getElementById('totalFlights');
    const onTimeFlightsEl = document.getElementById('onTimeFlights');
    const delayedFlightsEl = document.getElementById('delayedFlights');
    const canceledFlightsEl = document.getElementById('canceledFlights');

    if (totalFlightsEl) totalFlightsEl.textContent = totalFlights;
    if (onTimeFlightsEl) onTimeFlightsEl.textContent = onTimeFlights;
    if (delayedFlightsEl) delayedFlightsEl.textContent = delayedFlights;
    if (canceledFlightsEl) canceledFlightsEl.textContent = canceledFlights;
}

function renderFlights(flights) {
    flightsContainer.innerHTML = '';
    
    if (flights.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        flights.forEach(flight => {
            flightsContainer.appendChild(createFlightCard(flight));
        });
    }
    
    // Atualizar estatísticas sempre que renderizar
    updateFlightStatistics();
}

function filterFlights() {
    const searchTerm = searchInput.value.toUpperCase();
    const statusFilter = filterStatus.value;
    
    const filtered = flightsData.filter(flight => {
        const matchesSearch = flight.number.includes(searchTerm) || 
                            flight.departure.includes(searchTerm) ||
                            flight.arrival.includes(searchTerm);
        const matchesStatus = statusFilter === '' || flight.status === statusFilter;
        return matchesSearch && matchesStatus;
    });
    
    renderFlights(filtered);
}

function mostrarDetalhes(numeroVoo) {
    const voo = flightsData.find(v => v.number === numeroVoo);
    if (!voo) return;

    const modal = document.createElement('div');
    modal.className = 'modal-detalhes';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="this.parentElement.parentElement.remove()">✕</button>
            
            <div class="modal-header">
                <h2>Detalhes do Voo ${voo.number}</h2>
                <span class="flight-status status-${voo.status}">${statusMap[voo.status]}</span>
            </div>

            <div class="modal-body">
                <div class="info-section">
                    <h3>Informações da Rota</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="label">Origem:</span>
                            <span class="value">${voo.departure}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Destino:</span>
                            <span class="value">${voo.arrival}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Distância:</span>
                            <span class="value">${voo.distance}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Duração:</span>
                            <span class="value">${voo.duration}</span>
                        </div>
                    </div>
                </div>

                <div class="info-section">
                    <h3>Horários</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="label">Saída:</span>
                            <span class="value">${voo.departureTime} - ${voo.departureDate}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Chegada:</span>
                            <span class="value">${voo.arrivalTime} - ${voo.arrivalDate}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Atraso:</span>
                            <span class="value ${voo.delay === '0 min' ? 'no-delay' : 'has-delay'}">${voo.delay}</span>
                        </div>
                    </div>
                </div>

                <div class="info-section">
                    <h3>Aeronave e Terminal</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="label">Aeronave:</span>
                            <span class="value">${voo.aircraft}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Portão:</span>
                            <span class="value">${voo.gate}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Companhia:</span>
                            <span class="value">${voo.airline}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Passageiros:</span>
                            <span class="value">${voo.passengers}/${Math.ceil(voo.passengers / (voo.occupancy / 100))}</span>
                        </div>
                    </div>
                </div>

                <div class="info-section">
                    <h3>Ocupação da Aeronave</h3>
                    <div class="occupancy-bar-modal">
                        <div class="occupancy-fill" style="width: ${voo.occupancy}%"></div>
                    </div>
                    <div class="occupancy-text">${voo.occupancy}% de ocupação</div>
                </div>
            </div>

            <div class="modal-footer">
                <button class="btn-notificacao-modal">🔔 Receber Notificações</button>
                <button class="btn-imprimir-modal">🖨 Imprimir Dados</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'flex';
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Event listeners
searchInput.addEventListener('input', filterFlights);
filterStatus.addEventListener('change', filterFlights);

// Renderizar voos iniciais e atualizar estatísticas
renderFlights(flightsData);
updateFlightStatistics();
