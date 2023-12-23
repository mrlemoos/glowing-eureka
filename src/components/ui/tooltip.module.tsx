"use client";

import {
  Fragment,
  forwardRef,
  useCallback,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import {
  Arrow as PrimitiveArrow,
  Content as PrimitiveContent,
  Portal as PrimitivePortal,
  Provider as PrimitiveProvider,
  Root as PrimitiveRoot,
  Trigger as PrimitiveTrigger,
} from "@radix-ui/react-tooltip";

import { cn } from "@root/util/cn.module";

/**
 * The type of the {@link ElementRef | forwarded reference}
 * for the tooltip.
 */
export type TooltipForwardedReferenceType = ElementRef<typeof PrimitiveContent>;

/**
 * The props for the {@link PrimitiveContent} from Radix UI.
 */
export type TooltipContentProps = ComponentPropsWithoutRef<typeof PrimitiveContent>;
/**
 * The picked props for the {@link PrimitiveContent} from
 * Radix UI.
 */
type PickedPrimitiveContentProps = Pick<
  TooltipContentProps,
  | "className"
  | "side"
  | "sideOffset"
  | "align"
  | "alignOffset"
  | "collisionBoundary"
  | "collisionPadding"
  | "updatePositionStrategy"
>;

/**
 * The props for the {@link PrimitiveProvider} from Radix
 * UI.
 */
export type TooltipProviderProps = ComponentPropsWithoutRef<typeof PrimitiveProvider>;
/**
 * The composable {@link PrimitiveProvider} component.
 */
export const TooltipProvider = PrimitiveProvider;

/**
 * The picked props for the {@link PrimitiveProvider} from
 * Radix UI.
 */
type PickedPrimitiveProviderProps = Pick<
  TooltipProviderProps,
  "delayDuration" | "disableHoverableContent" | "skipDelayDuration"
>;

/**
 * The props for the {@link PrimitiveRoot} from Radix UI.
 */
export type TooltipRootProps = ComponentPropsWithoutRef<typeof PrimitiveRoot>;
/**
 * The composable {@link PrimitiveRoot} component.
 */
export const TooltipRoot = PrimitiveRoot;

/**
 * The picked props for the {@link PrimitiveRoot} from Radix
 * UI.
 */
type PickedPrimitiveRootProps = Pick<TooltipRootProps, "defaultOpen" | "open">;

/**
 * The props for the {@link PrimitiveTrigger} from Radix UI.
 */
export type TooltipTriggerProps = ComponentPropsWithoutRef<typeof PrimitiveTrigger>;
/**
 * The composable {@link PrimitiveTrigger} component.
 */
export const TooltipTrigger = PrimitiveTrigger;

/**
 * The picked props for the {@link PrimitiveTrigger} from
 * Radix UI.
 */
type PickedPrimitiveTriggerProps = Pick<TooltipTriggerProps, "asChild">;

/**
 * The props for the {@link PrimitiveArrow} from Radix UI.
 */
export type TooltipArrowProps = ComponentPropsWithoutRef<typeof PrimitiveArrow>;
/**
 * The composable {@link PrimitiveArrow} component.
 */
export const TooltipArrow = PrimitiveArrow;

/**
 * The picked props for the {@link PrimitiveArrow} from
 * Radix UI.
 */
type PickedPrimitiveArrowProps = Pick<
  TooltipArrowProps,
  | "offset"
  | "startOffset"
  | "markerEnd"
  | "markerHeight"
  | "markerMid"
  | "markerStart"
  | "markerUnits"
  | "markerWidth"
  | "alignmentBaseline"
  | "allowReorder"
  | "amplitude"
>;

/**
 * The props for the {@link TooltipContainer} component.
 */
export interface TooltipContainerProps {
  /**
   * The custom content element that is rendered inside the
   * afloat tooltip.
   */
  children: ReactNode;
  /**
   * Checks whether or not the tooltip is rendered inside a
   * {@link PrimitivePortal | portal} element.
   *
   * @default false
   */
  isPortal?: boolean;
  /**
   * The {@link HTMLElement | element} which is the
   * container/wrapper for the tooltip {@link TooltipProps.content | content},
   * and inside the tooltip {@link TooltipProps.children | children}
   * are rendered. If not defined and {@link isPortal} is
   * `true`, this prop defaults to {@link document.body}.
   *
   * @default document.body
   *
   * @see {@link HTMLElement}
   * @see {@link createPortal}
   * @see {@link document.body}
   * @see {@link TooltipProps.content}
   * @see {@link TooltipProps.children}
   * @see {@link isPortal}
   */
  portalContainerElement?: HTMLElement;
}

/**
 * The container/wrapper for the tooltip {@link TooltipProps.content | content}.
 *
 * @props {@link TooltipContainerProps}
 */
export function TooltipContainer({
  children,
  isPortal,
  portalContainerElement: portalContainerElement_,
}: TooltipContainerProps): JSX.Element {
  const portalContainerElement = portalContainerElement_ ?? document.body;

  return (
    <Fragment>
      {isPortal ? <PrimitivePortal container={portalContainerElement}>{children}</PrimitivePortal> : children}
    </Fragment>
  );
}

/**
 * The event that is fired when the tooltip visibility state
 * is updated.
 */
export class TooltipVisibilityStateUpdateEvent {
  constructor(
    /**
     * See {@link TooltipContainerProps.children}.
     */
    public readonly trigger: ReactNode,
    /**
     * The boolean that indicates whether or not the tooltip
     * is open.
     */
    public readonly isOpen: boolean,
    /**
     * See {@link TooltipContainerProps.isPortal}.
     */
    public readonly isRenderedThroughPortal: boolean,
    /**
     * See {@link TooltipContainerProps.portalContainerElement}.
     */
    public readonly portalContainerElement?: HTMLElement
  ) {}
}
/**
 * The event handler for the {@link TooltipVisibilityStateUpdateEvent} event.
 */
export interface TooltipVisibilityStateUpdateEventHandler {
  (event: TooltipVisibilityStateUpdateEvent): void;
}

/**
 * The picked props for the {@link TooltipContainer}
 * component used in the {@link Tooltip} component.
 */
type PickedTooltipContainerProps = Pick<TooltipContainerProps, "isPortal" | "portalContainerElement">;

/**
 * The props for the {@link Tooltip} component.
 */
export interface TooltipProps
  extends PickedPrimitiveArrowProps,
    PickedPrimitiveContentProps,
    PickedPrimitiveProviderProps,
    PickedPrimitiveRootProps,
    PickedPrimitiveTriggerProps,
    PickedTooltipContainerProps {
  /**
   * The {@link ReactNode | children} of the tooltip that
   * will work as the trigger element for the tooltip, as
   * well as the top-level {@link HTMLElement | element} to
   * which the tooltip is anchored.
   *
   * @see {@link ReactNode}
   * @see {@link HTMLElement}
   */
  children: ReactNode;
  /**
   * The {@link ReactNode | custom content element} that is
   * rendered inside the afloat tooltip.
   *
   * @see {@link ReactNode}
   */
  content: ReactNode;
  /**
   * The function that behaves as the event handler for the
   * {@link TooltipVisibilityStateUpdateEvent} event. This
   * event is fired when the tooltip visibility state is
   * updated.
   *
   * @see {@link TooltipVisibilityStateUpdateEvent}
   * @see {@link TooltipVisibilityStateUpdateEventHandler}
   */
  onVisibilityStateUpdate?: TooltipVisibilityStateUpdateEventHandler;
}

/**
 * The component that is used to render a tooltip that is
 * afloat. The default behaviour of the tooltip is to be
 * afloat and to be rendered inside the {@link document.body | body}
 * element when the user hovers over the {@link TooltipProps.children | children}
 * of the {@link JSX} expression.
 *
 * @example
 * ```tsx
 * import { type JSX } from "react";
 *
 * import { Tooltip } from "@root/components/ui/tooltip.module";
 *
 * function MyComponent(): JSX.Element {
 *   return (
 *     <Tooltip content="This is a tooltip">
 *       <button>Hover over me</button>
 *     </Tooltip>
 *   )
 * }
 * ```
 *
 * Also, it is possible to pass a `asChild` prop so the
 * children of the tooltip receive the props from the
 * trigger element. See the example below:
 *
 * @example
 * ```tsx
 * import { type JSX } from "react";
 *
 * import { Tooltip } from "@root/components/ui/tooltip.module";
 *
 * function MyComponent(): JSX.Element {
 *   return (
 *     <Tooltip content="This is a tooltip" asChild={true}>
 *       <button>Hover over me</button>
 *     </Tooltip>
 *   )
 * }
 * ```
 *
 * @props {@link TooltipProps}
 * @ref {@link TooltipForwardedReferenceType}
 */
export const Tooltip = forwardRef<TooltipForwardedReferenceType, TooltipProps>(function TooltipRender(
  {
    align,
    alignOffset,
    alignmentBaseline,
    allowReorder,
    amplitude,
    asChild = false,
    className,
    collisionBoundary,
    collisionPadding,
    defaultOpen,
    open,
    delayDuration,
    disableHoverableContent,
    markerEnd,
    markerHeight,
    markerMid,
    markerStart,
    markerUnits,
    markerWidth,
    offset,
    side,
    sideOffset = 4,
    skipDelayDuration,
    startOffset,
    updatePositionStrategy,
    children,
    content,
    isPortal,
    portalContainerElement,
    onVisibilityStateUpdate,
  },
  ref
) {
  const handleOpenChange = useCallback(
    (open: boolean) => {
      const event = new TooltipVisibilityStateUpdateEvent(children, open, isPortal!!, portalContainerElement);

      if (typeof onVisibilityStateUpdate === "function") {
        onVisibilityStateUpdate(event);
      }
    },
    [children, isPortal, onVisibilityStateUpdate, portalContainerElement]
  );

  return (
    <PrimitiveProvider
      delayDuration={delayDuration}
      disableHoverableContent={disableHoverableContent}
      skipDelayDuration={skipDelayDuration}
    >
      <PrimitiveRoot defaultOpen={defaultOpen} open={open} onOpenChange={handleOpenChange}>
        <PrimitiveTrigger asChild={asChild}>{children}</PrimitiveTrigger>
        <TooltipContainer isPortal={isPortal} portalContainerElement={portalContainerElement}>
          <PrimitiveContent
            ref={ref}
            side={side}
            sideOffset={sideOffset}
            align={align}
            alignOffset={alignOffset}
            collisionBoundary={collisionBoundary}
            collisionPadding={collisionPadding}
            updatePositionStrategy={updatePositionStrategy}
            className={cn(
              "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              className
            )}
          >
            {content}
            <PrimitiveArrow
              offset={offset}
              startOffset={startOffset}
              markerEnd={markerEnd}
              markerHeight={markerHeight}
              markerMid={markerMid}
              markerStart={markerStart}
              markerUnits={markerUnits}
              markerWidth={markerWidth}
              alignmentBaseline={alignmentBaseline}
              allowReorder={allowReorder}
              amplitude={amplitude}
            />
          </PrimitiveContent>
        </TooltipContainer>
      </PrimitiveRoot>
    </PrimitiveProvider>
  );
});
Tooltip.displayName = "Tooltip";
