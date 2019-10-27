export const call = (fn: Function): any => fn()
export const removeFrom = (deps: Array<Function>) => (fn: Function): void => {
  for (let i = 0; i < deps.length; i++) {

    if (deps[i] === fn) {
      deps.splice(i, 1)
      return
    }

  }
}
