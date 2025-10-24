<script src="https://cdn.jsdelivr.net/npm/chart.js@4.5.0"></script>
// Podaci iz treniranja - epohe 1-40
const epochs = Array.from({length: 40}, (_, i) => i + 1);

// mAP metrike
const map50 = [
    0.0688, 0.229, 0.31, 0.49, 0.544, 0.652, 0.657, 0.676, 0.762, 0.753,
    0.762, 0.788, 0.782, 0.806, 0.803, 0.803, 0.801, 0.815, 0.837, 0.828,
    0.851, 0.851, 0.849, 0.851, 0.845, 0.857, 0.856, 0.86, 0.863, 0.854,
    0.868, 0.865, 0.866, 0.873, 0.87, 0.882, 0.882, 0.876, 0.879, 0.886
];
const map50_95 = [
    0.0222, 0.0912, 0.133, 0.229, 0.287, 0.335, 0.339, 0.375, 0.416, 0.414,
    0.438, 0.463, 0.45, 0.463, 0.469, 0.469, 0.473, 0.477, 0.51, 0.495,
    0.512, 0.514, 0.512, 0.516, 0.51, 0.517, 0.528, 0.526, 0.525, 0.524,
    0.541, 0.536, 0.533, 0.541, 0.539, 0.55, 0.549, 0.551, 0.545, 0.555
];
// Gubici
const boxLoss = [
    3.489, 2.541, 2.159, 1.956, 1.839, 1.757, 1.715, 1.672, 1.638, 1.604,
    1.575, 1.547, 1.522, 1.502, 1.47, 1.459, 1.438, 1.419, 1.403, 1.386,
    1.38, 1.374, 1.35, 1.339, 1.331, 1.325, 1.301, 1.292, 1.281, 1.276,
    1.261, 1.251, 1.24, 1.229, 1.216, 1.209, 1.209, 1.198, 1.184, 1.162
];
const clsLoss = [
    4.232, 3.064, 2.426, 2.076, 1.842, 1.704, 1.594, 1.499, 1.439, 1.366,
    1.318, 1.247, 1.213, 1.178, 1.144, 1.113, 1.087, 1.064, 1.027, 1.012,
    0.9947, 0.9833, 0.9568, 0.9514, 0.9299, 0.9285, 0.8949, 0.8886, 0.8762, 0.8613,
    0.8515, 0.8501, 0.83, 0.8236, 0.8215, 0.8035, 0.7934, 0.7862, 0.7757, 0.7596
];
const dflLoss = [
    3.552, 2.649, 2.246, 2.017, 1.895, 1.807, 1.755, 1.72, 1.69, 1.658,
    1.624, 1.609, 1.579, 1.567, 1.543, 1.535, 1.515, 1.494, 1.476, 1.456,
    1.463, 1.46, 1.437, 1.434, 1.426, 1.422, 1.398, 1.392, 1.393, 1.377,
    1.371, 1.367, 1.349, 1.352, 1.34, 1.334, 1.331, 1.327, 1.319, 1.301
];
// Preciznost i Odziv (prosječne vrijednosti)
const precision = [
    0.322, 0.336, 0.41, 0.502, 0.551, 0.578, 0.649, 0.595, 0.703, 0.733,
    0.689, 0.749, 0.692, 0.753, 0.763, 0.749, 0.746, 0.731, 0.813, 0.741,
    0.77, 0.78, 0.791, 0.749, 0.797, 0.787, 0.757, 0.766, 0.772, 0.795,
    0.774, 0.776, 0.753, 0.789, 0.769, 0.789, 0.821, 0.788, 0.753, 0.827
];
const recall = [
    0.147, 0.256, 0.364, 0.506, 0.522, 0.646, 0.631, 0.681, 0.689, 0.697,
    0.696, 0.686, 0.752, 0.737, 0.709, 0.722, 0.733, 0.799, 0.713, 0.792,
    0.799, 0.779, 0.782, 0.819, 0.786, 0.813, 0.829, 0.846, 0.839, 0.792,
    0.825, 0.827, 0.829, 0.833, 0.844, 0.854, 0.804, 0.829, 0.856, 0.821
];
// Graf 1: Metrike Točnosti
const accuracyCtx = document.getElementById('accuracyChart').getContext('2d');
new Chart(accuracyCtx, {
    type: 'line',
    data: {
        labels: epochs,
        datasets: [
            {
                label: 'mAP50',
                data: map50,
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                borderWidth: 3,
                tension: 0.3,
                fill: true
            },
            {
                label: 'mAP50-95',
                data: map50_95,
                borderColor: '#2196F3',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                borderWidth: 3,
                tension: 0.3,
                fill: true
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Rast Metrika Točnosti'
            },
            tooltip: {
                mode: 'index',
                intersect: false
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Epoha'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Vrijednost mAP'
                },
                min: 0,
                max: 1
            }
        }
    }
});
// Graf 2: Gubici
const lossCtx = document.getElementById('lossChart').getContext('2d');
new Chart(lossCtx, {
    type: 'line',
    data: {
        labels: epochs,
        datasets: [
            {
                label: 'Box Loss',
                data: boxLoss,
                borderColor: '#FF5722',
                borderWidth: 2,
                tension: 0.3
            },
            {
                label: 'Class Loss',
                data: clsLoss,
                borderColor: '#9C27B0',
                borderWidth: 2,
                tension: 0.3
            },
            {
                label: 'DFL Loss',
                data: dflLoss,
                borderColor: '#3F51B5',
                borderWidth: 2,
                tension: 0.3
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Pad Gubitaka kroz Treniranje'
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Epoha'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Vrijednost Gubitka'
                },
                min: 0
            }
        }
    }
});
// Graf 3: Preciznost i Odziv
const prCtx = document.getElementById('prChart').getContext('2d');
new Chart(prCtx, {
    type: 'line',
    data: {
        labels: epochs,
        datasets: [
            {
                label: 'Preciznost (Precision)',
                data: precision,
                borderColor: '#E91E63',
                backgroundColor: 'rgba(233, 30, 99, 0.1)',
                borderWidth: 3,
                tension: 0.3,
                fill: true
            },
            {
                label: 'Odziv (Recall)',
                data: recall,
                borderColor: '#FF9800',
                backgroundColor: 'rgba(255, 152, 0, 0.1)',
                borderWidth: 3,
                tension: 0.3,
                fill: true
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Preciznost vs Odziv'
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Epoha'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Vrijednost'
                },
                min: 0,
                max: 1
            }
        }
    }
});