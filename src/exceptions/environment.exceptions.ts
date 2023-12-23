/**
 * The exception that is thrown when a client-side action is
 * not supported by the current environment.
 */
export class ClientSideActionNotSupportedException extends Error {
  constructor(usedAPI: string) {
    super(`The client-side action is not supported by the current environment. Used API: ${usedAPI}`);
    this.name = "ClientSideActionNotSupportedException";
  }
}
