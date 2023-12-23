import { ClientSideActionNotSupportedException } from "@root/exceptions/environment.exceptions";

/**
 * The object which represents the {@link OperatingSystemType | operating system}
 * of the user.
 */
export const OperatingSystem = {
  Windows: "windows",
  Darwin: "mac",
  Linux: "linux",
  Android: "android",
  iOS: "ios",
  iPadOS: "ipados",
  Unknown: "unknown",
} as const;

/**
 * The type which represents the {@link OperatingSystem | operating system} of
 * the user.
 */
export type OperatingSystemType = (typeof OperatingSystem)[keyof typeof OperatingSystem];

/**
 * The function which (via the {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform#browser_compatibility | legacy API})
 * identifies the operating system of the user.
 */
export function identifyOperatingSystem(platform?: string): OperatingSystemType {
  if (!platform) {
    return OperatingSystem.Unknown;
  }

  const foundPlatform = Object.values(OperatingSystem).find(function (os) {
    return platform.includes(os);
  });

  return foundPlatform || OperatingSystem.Unknown;
}

/**
 * The function that (via the {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform#browser_compatibility | legacy API})
 * identifies the operating system of the user.
 */
export function getPlatformLegacy(): string | undefined {
  if (
    typeof window === "undefined" ||
    // Reference: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform#browser_compatibility
    !window.navigator?.platform
  ) {
    throw new ClientSideActionNotSupportedException("window.navigator.platform");
  }

  const platformLegacy = window.navigator.platform;

  if (typeof platformLegacy === "string") {
    return platformLegacy.toLowerCase();
  }
}

type __WindowNavigatorWithExperimentalAPI = Window["navigator"] & {
  userAgentData: {
    platform: string;
  };
};

/**
 * The function that (via the {@link https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/platform | experimental API})
 * identifies the operating system of the user.
 */
export function getExperimentalPlatform(): string | undefined {
  if (
    typeof window === "undefined" ||
    !window.navigator ||
    // Reference: https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/platform
    typeof (window.navigator as __WindowNavigatorWithExperimentalAPI)?.userAgentData?.platform === "undefined"
  ) {
    throw new ClientSideActionNotSupportedException("window.navigator.userAgentData.platform");
  }

  const experimentalPlatform = (
    window.navigator as unknown as {
      userAgentData: {
        platform: string;
      };
    }
  ).userAgentData?.platform?.toLowerCase();

  return experimentalPlatform;
}

/**
 * The function which identifies the {@link OperatingSystemType | operating system}
 * of the user. It uses the {@link getPlatformLegacy | legacy API} and the
 * {@link getExperimentalPlatform | experimental API} to identify the operating
 * system.
 *
 * Also, this function may throw an {@link ClientSideActionNotSupportedException | error}
 * if the APIs are not either supported by the browser or called on the server
 * side.
 */
export function getPlatform() {
  if (typeof window === "undefined" || !window.navigator) {
    throw new ClientSideActionNotSupportedException("window.navigator");
  }

  const platformLegacy = getPlatformLegacy();
  const experimentalPlatform = getExperimentalPlatform();

  const coercedPlatform = platformLegacy || experimentalPlatform;
  const foundPlatform = identifyOperatingSystem(coercedPlatform);

  return foundPlatform;
}
