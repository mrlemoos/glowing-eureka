"use client";

import { memo, type SVGAttributes } from "react";

import * as icons from "@radix-ui/react-icons";

import type { RemoveSuffix } from "@root/util/type-util.module";

/**
 * The type of the object that contains the {@link icons | schema of icons}.
 */
type __ReactRadixIconsSchema = typeof icons;

/**
 * The type of the keys of the {@link __ReactRadixIconsSchema | schema of icons}.
 */
type __ReactRadixIconsSchemaKeys = keyof __ReactRadixIconsSchema;

/**
 * The name of the icons to be rendered via the {@link Icon | icon component}.
 *
 * @see {@link Icon | icon component}
 * @see {@link __ReactRadixIconsSchema | schema of icons}
 * @see {@link __ReactRadixIconsSchemaKeys | keys of the schema of icons}
 *
 * @example
 * ```ts
 * import { IconName } from "@root/components/icon.module";
 *
 * const iconName: IconName = "ArrowUp";
 * ```
 */
export type IconName = RemoveSuffix<__ReactRadixIconsSchemaKeys, "Icon">;

/**
 * The type of the color of the {@link Icon | icon component}.
 * The color can be specified in the formats allowed by the
 * SVG `fill` attribute.
 */
export type IconColor =
  | `#${string}`
  | `rgb(${string})`
  | `rgba(${string})`
  | `hsl(${string})`
  | "inherit"
  | "initial"
  | "unset"
  | (string & {});

/**
 * The attributes adapted from React to be used in the
 * injection of props into the `svg` elements.
 */
type __SVGElementAttributes = SVGAttributes<SVGSVGElement>;

/**
 * The remembered attributes of the `svg` elements.
 * 'Remembered' means that the attributes are not omitted
 * from the {@link __SVGElementAttributes | SVG element attributes}.
 */
type __RememberedSVGElementAttributes = Omit<
  __SVGElementAttributes,
  "width" | "height" | "viewBox" | "children" | "color"
>;

/**
 * The props of the {@link Icon | icon component}.
 */
export interface IconProps extends __RememberedSVGElementAttributes {
  /**
   * @ignore
   */
  children?: never;
  /**
   * The number of pixels applied to the width and height of
   * the {@link IconName | icon}. As well, the value can be
   * specified in the format allowed by the CSS {@link __SVGElementAttributes.width | `width`}
   * and {@link __SVGElementAttributes.height | `height`}
   * properties with string values.
   *
   * @default 24
   */
  size?: number | string;
  /**
   * The {@link IconName | name} of the icon to be rendered
   * in the component.
   */
  name: IconName;
  /**
   * The color of the icon. The default value is `inherit`.
   *
   * @default 'inherit'
   */
  color?: IconColor;
}

/**
 * The {@link Icon | icon component} renders the
 * {@link IconName | icon} from the {@link __ReactRadixIconsSchema | schema of icons}.
 * The component is based on the {@link __SVGElementAttributes | SVG}
 * element and can be used as a regular {@link __SVGElementAttributes | SVG}
 * element.
 *
 * @example
 * ```tsx
 * import { type JSX } from "react";
 *
 * import { Icon } from "@root/components/icon.module";
 *
 * function MyComponent(): JSX.Element {
 *   return (
 *     <Icon name="ArrowUp" />
 *   );
 * }
 *
 * ```
 *
 * @props {@link IconProps}
 */
export const Icon = memo<IconProps>(function ({
  size = 24,
  className,
  color = "inherit",
  name,
  ...props
}: IconProps): JSX.Element {
  const IconComponent = icons[`${name}Icon`];

  return (
    <IconComponent
      {...props}
      className={className}
      color={color === "inherit" ? "currentColor" : color}
      height={size}
      width={size}
    />
  );
});
Icon.displayName = "Icon";
