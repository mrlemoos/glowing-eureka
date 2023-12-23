import { cleanup, render } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";

import { Button } from "./button.module";

describe("Assert: useButtonAccessibilityAssertionEffect()", function () {
  beforeEach(function () {
    cleanup();
  });
});

describe("Assert: <Button />", function () {
  beforeEach(function () {
    cleanup();
  });
  describe("given that it is rendered", function () {
    test("then renders the button", async function () {
      // Arrange
      const buttonTestId = "arbitrary-button-id";

      // Act
      const { findByTestId } = render(<Button data-testid={buttonTestId}>Lorem Ipsum</Button>);
      const buttonElement = await findByTestId(buttonTestId);

      // Assert
      expect(buttonElement).toBeTruthy();
    });
    describe('and the "asChild" prop is defined as "true"', function () {
      test("then renders the child element with the Button's props and styles", async function () {
        // Arrange
        const buttonTestId = "arbitrary-button-id";

        // Act
        const { findByRole } = render(
          <Button asChild={true} data-testid={buttonTestId}>
            <a href="http://localhost:3000">Ipsum</a>
          </Button>
        );
        const anchorElement = await findByRole("link");

        // Assert
        expect(anchorElement).toBeTruthy();
      });
    });
  });
  describe("given that the ref is defined, the ref accesses the HTML button", function () {
    test("then assigns the provided button reference", function () {
      // Arrange
      let buttonReference: HTMLButtonElement | null = null;
      function readButtonReference(element: HTMLButtonElement) {
        buttonReference = element;
      }

      // Act
      const { getByRole } = render(<Button ref={readButtonReference}>Lorem Ipsum</Button>);
      const buttonElement = getByRole("button");

      // Assert
      expect(buttonReference).toBe(buttonElement);
    });
  });
});
