export function debounce<TFunc extends (...args: any[]) => void>(
  func: TFunc,
  delay: number
): (...args: Parameters<TFunc>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let runs = 0; // Run counter is a backup for timeout
  return function debouncedFunction(...args: Parameters<TFunc>) {
    runs++
    const currentRun = runs
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      if (currentRun === runs) func(...args);
    }, delay);
  };
}

// React example.

// import { useRef, useEffect } from "react";

// type Timer = ReturnType<typeof setTimeout>;
// type SomeFunction = (...args: any[]) => void;
// /**
//  *
//  * @param func The original, non debounced function (You can pass any number of args to it)
//  * @param delay The delay (in ms) for the function to return
//  * @returns The debounced function, which will run only if the debounced function has not been called in the last (delay) ms
//  */

// export function useDebounce<Func extends SomeFunction>(
//   func: Func,
//   delay = 1000
// ) {
//   const timer = useRef<Timer>();

//   useEffect(() => {
//     return () => {
//       if (!timer.current) return;
//       clearTimeout(timer.current);
//     };
//   }, []);

//   const debouncedFunction = ((...args) => {
//     const newTimer = setTimeout(() => {
//       func(...args);
//     }, delay);
//     clearTimeout(timer.current);
//     timer.current = newTimer;
//   }) as Func;

//   return debouncedFunction;
// }