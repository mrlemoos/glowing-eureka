import { type JSX } from "react";

import { Input, type InputProps } from "@root/components/ui/input.module";

/**
 * The picked properties from the {@link InputProps}.
 */
type __PickedInputProps = Pick<InputProps, "value" | "onChange" | "disabled" | "onKeyDown">;

/**
 * The modifier that removes any optional chaining annotation from the props
 * from the {@link __PickedInputProps} type.
 */
type __RequiredPickedInputProps = Required<__PickedInputProps>;

/**
 * The props of the {@link PromptInput} component.
 */
export interface PromptInputProps extends __RequiredPickedInputProps {
  /**
   * @ignore
   */
  children?: never;
}

/**
 * This isolated React controlled component renders the field that is
 * responsible for {@link PromptInputProps.onChange | handling} and displaying
 * the user's {@link PromptInputProps.value | input} to the AI.
 *
 * The name defined in the HTML semantical form is `prompt`.
 *
 * @props {@link PromptInputProps}
 */
export function PromptInput({ value, onChange, disabled }: PromptInputProps): JSX.Element {
  return (
    <Input
      value={value}
      onChange={onChange}
      disabled={disabled}
      name="prompt"
      placeholder="What can I help you with?"
      className="w-full p-3 dark:text-black max-h-[10rem] border-none resize-none focus-visible:ring-transparent focus-visible:ring-0 shadow-none"
      autoComplete="off"
      autoFocus={true}
    />
  );
}
