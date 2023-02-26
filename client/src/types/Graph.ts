interface GraphResponse {
    graph: Graph,
    frequency: {[key: string]: number}
}

type Graph = {
    [index: number]: {
      [key: string]: string[];
    };
  }
