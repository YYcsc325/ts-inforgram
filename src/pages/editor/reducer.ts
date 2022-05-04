import { set, omit } from "lodash";

// export function useReducer(reducer, initialState) {
//   const [state, setState] = useState(initialState);

//   function dispatch(action) {
//     const nextState = reducer(state, action);
//     setState(nextState);
//   }

//   return [state, dispatch];
// }

export const pageReducerTypes = {
  /** 增加page页 */
  ADD: "ADD",
  /** 修改page页 */
  MODIFY: "MODIFY",
  /** 删除page页 */
  DELETE: "DELETE",
  /** 增加page页下children元素 */
  ADD_CHILDREN: "ADD_CHILDREN",
  /** 删除page页下的children元素 */
  DELETE_CHILDREN: "DELETE_CHILDREN",
};

export type IPageReducerTypes = keyof typeof pageReducerTypes;

export function pageReducer(state: any, { type, payload }: any) {
  const { boxId, pageId, data } = payload || {};
  const childrenList = state?.[pageId]?.children || [];

  switch (type) {
    case pageReducerTypes.ADD:
      return { ...set(state, [pageId], data) };

    case pageReducerTypes.MODIFY:
      return { ...set(state, [pageId], { ...state[pageId], ...data }) };

    case pageReducerTypes.DELETE:
      return { ...omit(state, [pageId]) };

    case pageReducerTypes.ADD_CHILDREN:
      return { ...set(state, [pageId, "children"], [...childrenList, boxId]) };

    case pageReducerTypes.DELETE_CHILDREN:
      return {
        ...set(
          state,
          [pageId, "children"],
          childrenList.filter((item: any) => item !== boxId)
        ),
      };

    default:
      return { ...state, ...data };
  }
}

export const boxReducerTypes = {
  /** 增加box */
  ADD: "ADD",
  /** 修改box */
  MODIFY: "MODIFY",
  /** 删除box */
  DELETE: "DELETE",
};

export type IBoxReducerTypes = keyof typeof boxReducerTypes;

export function boxReducer(state: any, { type, payload }: any) {
  const { boxId, data } = payload || {};

  switch (type) {
    case boxReducerTypes.ADD:
      return { ...set(state, [boxId], data) };

    case boxReducerTypes.MODIFY:
      return { ...set(state, [boxId], { ...state[boxId], ...data }) };

    case boxReducerTypes.DELETE:
      return { ...omit(state, [boxId]) };

    default:
      return { ...state, ...data };
  }
}
