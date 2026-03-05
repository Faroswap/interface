/**
 * Runtime shim for @lingui/macro when the SWC plugin is unavailable.
 * Since this project is English-only, components render their content as-is.
 */
import React from 'react';

type TransProps = {
  children?: React.ReactNode;
  id?: string;
  message?: string;
};

export function Trans({ children, id, message }: TransProps): React.ReactElement {
  return <>{children ?? message ?? id}</>;
}

// Tagged template literal function: t`Some text ${value}`
export function t(
  strings: TemplateStringsArray | { id?: string; message?: string },
  ...values: unknown[]
): string {
  if (!Array.isArray(strings)) {
    return (strings as { id?: string; message?: string }).message ??
      (strings as { id?: string; message?: string }).id ??
      '';
  }
  return (strings as TemplateStringsArray).reduce(
    (result, str, i) => result + str + (i < values.length ? String(values[i] ?? '') : ''),
    '',
  );
}
