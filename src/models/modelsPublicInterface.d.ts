export interface IDvaModel<S = any, A = any> {
  namespace: string;
  state: S;
  effects?: Record<string, any>;
  reducers?: Record<string, (state: S, action: A) => S>;
  [x: string]: any;
}
export declare type ActionWithPayload<P = any> = {
  type: string;
  payload: P;
};
export type ActionKey<M extends IDvaModel = IDvaModel> =
  | keyof M["effects"]
  | keyof M["reducers"];
export type DvaEffect<P = any, R = any> = (
  action: ActionWithPayload<P>,
  io: any
) => Generator<R, any, unknown>;
export type io = any;
export type DvaReducers<S = any, P = any> = (
  state: S,
  action: ActionWithPayload<P>
) => S;
export type DvaPayload<
  M extends IDvaModel,
  T extends ActionKey<M>
> = M["effects"][T] extends DvaEffect<infer P, any>
  ? P
  : M["reducers"][T] extends DvaReducers<any, infer P>
  ? P
  : void;
export type DvaDispatchAction<
  M extends IDvaModel,
  T extends ActionKey<M>
> = DvaPayload<M, T> extends object
  ? (payload: DvaPayload<M, T>) => {
      type: T;
      payload: DvaPayload<M, T>;
    }
  : (unknown?: any) => {
      type: T;
    };

export interface DispatchPromiseProp {
  dispatch: <A = any, R = any>(action: A) => PromiseLike<R>;
}

export type createActionsType = <M extends IDvaModel>(
  model: M
) => {
  [key in keyof (M["effects"] & M["reducers"])]: DvaDispatchAction<M, key>;
};
