import {
  type ReactElement,
  isValidElement,
  type ComponentType,
  type Component as ClassComponent,
  type JSX,
  Children,
} from "react";

/**
 * A function that returns the text content of the given {@link ReactElement | React element}.
 * This function will recursively search the given {@link ReactElement | React element}
 * for text content.
 *
 * @see {@link ReactElement}
 * @see {@link Children}
 */
export function getChildTextContent(element: ReactElement): string {
  function predicate(child: unknown): child is string | ReactElement {
    if (typeof child === "string") {
      return true;
    }

    if (isReactElement(child)) {
      return getChildTextContent(child) !== "";
    }
    return false;
  }

  return Children.toArray(element.props.children).filter(predicate).join(" ").trim();
}

/**
 * A function that returns true if the given value is a {@link ReactElement | React element}.
 * This is a type guard function that that narrows the type of the given value
 * to {@link ReactElement | React element} if it returns true.
 *
 * @see {@link ReactElement}
 * @see {@link isValidElement}
 */
export function isReactElement(value: unknown): value is ReactElement {
  return isValidElement(value);
}

/**
 * A function that returns true if the given value is a {@link ReactElement | React element}
 * of the given type. This is a type guard function that that narrows the type
 * of the given value to {@link ReactElement | React element} of the given type
 * if it returns true.
 *
 * @see {@link ComponentType}
 */
export function isReactElementOfType<E extends ReactElement, P extends object>(
  value: unknown,
  type: ComponentType<P>
): value is E {
  return isReactElement(value) && value.type === type;
}

/**
 * A function that returns true if the given value is a {@link ReactElement | React element}
 * of the given type. This is a type guard function that that narrows the type
 * of the given value to {@link ReactElement | React element} of the given type
 * if it returns true.
 *
 * @see {@link ClassComponent}
 */
export function isReactClassComponent<P extends object>(value: unknown): value is ClassComponent<P> {
  return typeof value === "function" && value.prototype && value.prototype.isReactComponent;
}

/**
 * A function that returns true if the given value is a {@link ReactElement | React element}
 * of the given type. This is a type guard function that that narrows the type
 * of the given value to {@link ReactElement | React element} of the given type
 * if it returns true.
 *
 * @see {@link JSX.Element}
 */
export function isReactFunctionalComponent<P extends object>(
  value: unknown
): value is (props: P) => JSX.Element | null {
  return typeof value === "function" && String(value).includes("return React.createElement");
}

/**
 * A function that returns true if the given value is a {@link ReactElement | React element}
 * of the given type. This is a type guard function that that narrows the type
 * of the given value to {@link ReactElement | React element} of the given type
 * if it returns true.
 *
 * The given {@link value} may be either a {@link ClassComponent | class component}
 * or a {@link JSX.Element | functional component}.
 *
 * @see {@link isReactClassComponent}
 * @see {@link isReactFunctionalComponent}
 */
export function isReactComponent<P extends object>(value: unknown): value is (props: P) => JSX.Element | null {
  return isReactClassComponent(value) || isReactFunctionalComponent(value);
}
