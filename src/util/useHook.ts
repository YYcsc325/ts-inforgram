import { isFunction } from "@/util/utils";
import { useEffect, useRef, useState } from "react";

export function useDidMount(callback: Function) {
  if (!isFunction(callback)) {
    throw new Error("callback is not function.");
  }
  const fn = useRef(callback);

  useEffect(() => {
    const returnFn = fn.current();
    return returnFn;
  }, []);
}

export function useUpdate(callback: Function) {
  if (!isFunction(callback)) {
    throw new Error("callback is not function.");
  }
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const returnCallback = callback();
      return returnCallback;
    } else isMounted.current = true;
  });
}
/**
 * @param v 缓存值
 * @returns
 */
export function usePrevious(v: any) {
  const cache = useRef();

  useEffect(() => {
    cache.current = v;
  }, [v]);

  return cache.current;
}
/**
 * @param actionSimpleClick 单击事件
 * @param actionDoubleClick 双击事件
 * @param delay 延迟事件
 * @returns
 * @desc 用时间延迟区分是单击还是双击事件
 */
export function useSingleAndDoubleClick(
  actionSimpleClick: Function,
  actionDoubleClick: Function,
  delay = 250
) {
  const [click, setClick] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (click === 1) actionSimpleClick();
      setClick(0);
    }, delay);

    if (click === 2) actionDoubleClick();

    return () => clearTimeout(timer);
  }, [click]);

  return () => setClick((prev: number) => prev + 1);
}
