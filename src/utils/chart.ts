import { ProjectColumnNode, ProjectCardNode } from "../interfaces/github/node";
import { CountMethodEnum } from "../interfaces/egp";

interface CountPointOptions {
  state?: "OPEN" | "CLOSED";
  countMethod?: CountMethodEnum;
}

export function velocityLabels(columns: Array<ProjectColumnNode>) {
  return columns.map(column => column.name);
}

export function velocityData(columns: Array<ProjectColumnNode>, options: CountPointOptions = {}) {
  return columns.map(column => countPoint(column, options));
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

export function velocityChartData(columns: Array<ProjectColumnNode>, options: Pick<CountPointOptions, "countMethod"> = {}) {
  return {
    labels: velocityLabels(columns),
    datasets: [
      {
        label: "CLOSED",
        data: velocityData(columns, { state: "CLOSED", countMethod: options.countMethod }),
        backgroundColor: colorOptions(columns.length, 0.6),
        borderColor: colorOptions(columns.length, 1),
        borderWidth: 1
      },
      {
        label: "OPEN",
        data: velocityData(columns, { state: "OPEN", countMethod: options.countMethod }),
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

export function countPoint(column: ProjectColumnNode, options: CountPointOptions = {}) {
  let total = 0;

  column.cards.nodes.map((card: ProjectCardNode) => {
    if (options.state) {
      if (card.content && options.state === card.content.state) {
        total += getCardPoint(card, options.countMethod);
      } else if (!card.content && options.state === "OPEN") {
        // Handle note cards as OPEN state
        total += getCardPoint(card, options.countMethod);
      }
    } else {
      total += getCardPoint(card, options.countMethod);
    }
  });

  return total;
}

function getCardPoint(card: ProjectCardNode, countMethod: CountMethodEnum | undefined) {
  switch (countMethod) {
    case CountMethodEnum.Issue:
      return 1;
    case CountMethodEnum.Title:
      const title = card.note || card.content!.title;
      const ptRegex = /\[([0-9]+)\s*pts?\]/;
      const matched = title.match(ptRegex);
      if (matched) {
        return parseInt(matched[1], 10);
      } else {
        return 1;
      }
    default:
      return 1;
  }
}
