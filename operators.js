/**
 *
 * @param {EventTarget} target
 * @param {string} eventName
 * @returns {ReadableStream}
 */
const fromEvent = (target, eventName) => {
  let _listener;
  return new ReadableStream({
    start(controller) {
      _listener = (e) => controller.enqueue(e);
      target.addEventListener(eventName, _listener);
    },
    cancel() {
      target.removeEventListener(eventName, _listener);
    },
  });
};

/**
 *
 * @param {Number} ms
 * @returns {ReadableStream}
 */
const interval = (ms) => {
  let _intervalid;
  return new ReadableStream({
    start(controller) {
      _intervalid = setInterval(() => {
        controller.enqueue(Date.now());
      }, ms);
    },
    cancel() {
      clearInterval(_intervalid);
    },
  });
};

/**
 *
 * @param {Function} fn
 * @returns {TransformStream}
 */
const map = (fn) => {
  return new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(fn(chunk));
    },
  });
};

export { fromEvent, interval, map };
