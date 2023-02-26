export interface GraphResponse {
    graph: GraphType,
    frequency: {[key: string]: number}
}

export type GraphType = {
    [index:number]: 
    {
    [key:string]:
    {
      [key: string]: string[];
    }
  };
  }
