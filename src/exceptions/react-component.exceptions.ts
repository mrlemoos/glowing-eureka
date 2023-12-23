/**
 * The exception that is thrown when a given React component does not have a display name.
 */
export class ReactComponentDisplayNameNotFoundException extends Error {
  constructor(public readonly componentName: string) {
    super(`The component "${componentName}" does not have a display name.`);
  }
}

/**
 * The exception that is thrown when a given prop is not allowed in a React component.
 */
export class ReactComponentPropNotAllowedException extends Error {
  constructor(public readonly componentName: string, public readonly propName: string) {
    super(`The prop "${propName}" is not allowed in the component "${componentName}".`);
  }
}
