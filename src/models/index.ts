import type { createActionsType } from "./modelsPublicInterface";

const createActions: createActionsType = (model) => {
  var keys = Object.keys(model.effects || {}).concat(
    Object.keys(model.reducers || {})
  );
  return keys.reduce(function (acc: any, key) {
    acc[key] = function (payload: any) {
      return {
        type: "".concat(model.namespace, "/").concat(key),
        payload: payload,
      };
    };
    return acc;
  }, {});
};

export { createActions };
