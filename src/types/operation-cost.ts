export interface OperationCost<Target> {
  affectedItems: number;
  timing: number;
  data: Target;
}
