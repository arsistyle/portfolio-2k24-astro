import type { UiKeys } from "i18n/ui";

export interface NavItem {
  name: UiKeys;
  href: string;
}

export interface SelectorProps {
  scheme: string;
}