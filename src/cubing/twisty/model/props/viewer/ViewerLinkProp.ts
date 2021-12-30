import { SimpleTwistyPropSource } from "../TwistyProp";

export const viewerLinkPages = {
  twizzle: true, // default
  none: true,
};
export type ViewerLinkPage = keyof typeof viewerLinkPages;
export type ViewerLinkPageWithAuto = ViewerLinkPage | "auto";

export class ViewerLinkProp extends SimpleTwistyPropSource<ViewerLinkPageWithAuto> {
  getDefaultValue(): ViewerLinkPageWithAuto {
    return "auto";
  }
}
