export = Didact;
export as namespace Didact;

declare namespace Didact {
  type Primitive = string | number;
  type PropObject = { [prop: string]: any } & { children: DidactNode[] };

  type DidactNode = DidactElement | TextElement<Primitive>;
  type DidactChild = DidactNode;
  type PropsWithChildren<P> = P & { children: DidactNode[] };
  type Key<P> = keyof P & string;
  type PropKey = Key<PropObject>;

  type DidactElement<P = any, T = string | Function> = {
    type: T;
    props: PropsWithChildren<P>;
  };

  type TextElement<T> = DidactElement<{ nodeValue: T }, "TEXT_ELEMENT">;

  interface Fiber {
    dom: HTMLElement | Text | null;
    parent?: Fiber;
    child?: Fiber;
    sibling?: Fiber;
    type?: string | Function;
    props: PropsWithChildren<{
      [prop: string]: any & { children: DidactNode[] };
    }>;
    hooks?: Array<Hook<any>>;
    alternate?: Fiber;
    effectTag?: "UPDATE" | "PLACEMENT" | "DELETION";
  }

  type StateReturnArray<S> = [S];
  type SetStateAction<S> = (prevState: S) => S;
  type Hook<T> = { state: T; queue: Array<SetStateAction<T>> };

  interface FunctionalFiber extends Fiber {
    type?: Function;
  }
  interface HostFiber extends Fiber {
    type?: string;
  }

  type KeyCheck<T = any> = (key: Key<T>) => boolean;
  type KeyComparison<T = any> = (prev: T, next: T) => KeyCheck<T>;
}

// Microsort doesn't support experimental APIs
/** found https://github.com/microsoft/TypeScript/issues/21309#issuecomment-376338415 */
declare global {
  interface Window {
    requestIdleCallback: (
      callback: (deadline: RequestIdleCallbackDeadline) => void,
      opts?: RequestIdleCallbackOptions
    ) => RequestIdleCallbackHandle;
    cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void;
  }

  type RequestIdleCallbackHandle = any;
  type RequestIdleCallbackOptions = {
    timeout: number;
  };
  type RequestIdleCallbackDeadline = {
    readonly didTimeout: boolean;
    timeRemaining: () => number;
  };
}
