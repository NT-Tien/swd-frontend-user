
const UseDebounce = (callback, delay=900) => {

    let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout((  ) => {
        callback(...args);

    }, delay)
  }
}

export default UseDebounce