import * as EventEmitter from "eventemitter3";
import * as Chart from "chart.js";

import { ProjectNode } from "./github/node";

export interface WindowWithEGP extends Window {
  __egp: {
    project?: ProjectNode;
    emitter: EventEmitter;
    velocityChart?: Chart;
  };
}
