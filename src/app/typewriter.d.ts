declare module 'typewriter-effect/dist/core' {
  interface Options {
    loop?: boolean;
    autoStart?: boolean;
    strings?: string[];
  }
  export default class Typewriter {
    constructor(container: HTMLElement, options?: Options);
    stop(): this;
  }
}
