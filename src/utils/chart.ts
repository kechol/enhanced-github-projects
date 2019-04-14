import { ProjectColumnNode, ProjectCardNode } from "../interfaces/github/node";

export function velocityLabels(columns: Array<ProjectColumnNode>) {
  return columns.map(column => column.name);
}

export function velocityData(columns: Array<ProjectColumnNode>, state: "OPEN" | "CLOSED") {
  return columns.map(column => countPoint(column, state));
}

export function velocityChartOptions() {
  return {
    animation: {
      duration: 0
    },
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            stepSize: 1,
            beginAtZero: true,
            suggestedMax: 8
          }
        }
      ],
      xAxes: [
        {
          maxBarThickness: 80,
          stacked: true
        }
      ]
    }
  };
}

export function velocityChartData(columns: Array<ProjectColumnNode>) {
  return {
    labels: velocityLabels(columns),
    datasets: [
      {
        label: "CLOSED",
        data: velocityData(columns, "CLOSED"),
        backgroundColor: colorOptions(columns.length, 0.6),
        borderColor: colorOptions(columns.length, 1),
        borderWidth: 1
      },
      {
        label: "OPEN",
        data: velocityData(columns, "OPEN"),
        backgroundColor: colorOptions(columns.length, 0.2),
        borderColor: colorOptions(columns.length, 1),
        borderWidth: 1
      }
    ]
  };
}

export function colorOptions(length: number = 1, alpha: number = 0.8, variety: boolean = false) {
  const colorDefaults = [
    `rgba(229, 36, 59, ${alpha})`,
    `rgba(36, 106, 229, ${alpha})`,
    `rgba(36, 229, 81, ${alpha})`,
    `rgba(229, 212, 36, ${alpha})`,
    `rgba(229, 64, 36, ${alpha})`,
    `rgba(229, 36, 200, ${alpha})`,
    `rgba(55, 36, 229, ${alpha})`,
    `rgba(36, 206, 229, ${alpha})`,
    `rgba(36, 229, 81, ${alpha})`,
    `rgba(209, 229, 36, ${alpha})`,
    `rgba(229, 109, 36, ${alpha})`,
    `rgba(229, 36, 103, ${alpha})`,
    `rgba(36, 93, 229, ${alpha})`,
    `rgba(36, 229, 177, ${alpha})`,
    `rgba(36, 229, 45, ${alpha})`,
    `rgba(164, 229, 36, ${alpha})`,
    `rgba(229, 161, 36, ${alpha})`
  ];

  const options = [];
  for (let i = 0; i < length; i++) {
    const ci = variety ? i % colorDefaults.length : 0;
    options.push(colorDefaults[ci]);
  }

  return options;
}

export function countPoint(column: ProjectColumnNode, state: "OPEN" | "CLOSED" | undefined = undefined) {
  let total = 0;

  column.cards.nodes.map((card: ProjectCardNode) => {
    if (state) {
      if (card.content && state === card.content.state) {
        total += 1;
      } else if (!card.content && state === "OPEN") {
        // Handle note cards as OPEN state
        total += 1;
      }
    } else {
      total += 1;
    }
  });

  return total;
}
