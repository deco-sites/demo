import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Container, { HeaderContent, Layout, ExtendedStyle } from "$store/components/ui/Container.tsx"

/**
 * @titleBy alt
 */
export interface Banner {
  srcMobile: LiveImage;
  srcDesktop?: LiveImage;
  alt: string;
  href: string;
}

export type BorderRadius =
  | "None"
  | "Small"
  | "Medium"
  | "Large"
  | "Extra large"
  | "2x Extra large"
  | "3x Extra large"
  | "Full";

export interface Items {
  /** @default Auto */
  mobile?: "Auto" | "1" | "2";
  /** @default Auto */
  desktop?: "Auto" | "1" | "2" | "4" | "6" | "8";
}

export interface Border {
  /** @default none */
  mobile?: BorderRadius;
  /** @default none */
  desktop?: BorderRadius;
}

export interface ItemsLayout {
  itemsPerLine?: Items;
  /**
   * @description Item's border radius
   */
  borderRadius?: Border;
}

export interface Size {
  width: number;
  height: number;
}

export interface Props {
  header?: HeaderContent;
  banners?: Banner[];
  bannerSize: Size;
  itemsLayout?: ItemsLayout;
  layout?: Layout;
  style?: ExtendedStyle;
}

const MOBILE_COLUMNS = {
  "Auto": "grid-flow-col",
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  "Auto": "lg:grid-flow-col",
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-2",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-4",
  6: "lg:grid-cols-6",
  7: "lg:grid-cols-8",
  8: "lg:grid-cols-8",
};

const RADIUS_MOBILE = {
  "None": "rounded-none",
  "Small": "rounded-sm",
  "Medium": "rounded-md",
  "Large": "rounded-lg",
  "Extra large": "rounded-xl",
  "2x Extra large": "rounded-2xl",
  "3x Extra large": "rounded-3xl",
  "Full": "rounded-full",
};

const RADIUS_DESKTOP = {
  "None": "lg:rounded-none",
  "Small": "lg:rounded-sm",
  "Medium": "lg:rounded-md",
  "Large": "lg:rounded-lg",
  "Extra large": "lg:rounded-xl",
  "2x Extra large": "lg:rounded-2xl",
  "3x Extra large": "lg:rounded-3xl",
  "Full": "lg:rounded-full",
};

export default function ImageGrid({
  header,
  layout,
  itemsLayout,
  style,
  banners = [
    {
      srcMobile: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/a8d36df6-4b96-4421-bb6c-de0fe1478e06",
      srcDesktop: "",
      alt: "",
      href: "/",
    },
    {
      srcMobile: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/29dbf8d4-90c3-43f7-9b6b-4c6bda5e7835",
      srcDesktop: "",
      alt: "",
      href: "/",
    },
    {
      srcMobile: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/1e6250d4-f9d2-4185-b8a6-b0e8a8fed4a7",
      srcDesktop: "",
      alt: "",
      href: "/",
    },
    {
      srcMobile: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/3210eea1-5437-4f19-8327-8b8fa4edfc45",
      srcDesktop: "",
      alt: "",
      href: "/",
    },
  ],
  bannerSize = { width: 600, height: 300 },
}: Props) {
  const items = itemsLayout?.itemsPerLine
  const radius = itemsLayout?.borderRadius

  return (
    <Container header={header} layout={layout} style={style}>
      <div
        class={`grid gap-4
          ${MOBILE_COLUMNS[items?.mobile ?? "Auto"]}
          ${DESKTOP_COLUMNS[items?.desktop ?? "Auto"]}
          ${items?.mobile === "Auto" ? "lg:grid-flow-dense" : ""}
        `}
      >
        {banners.map(({ href, srcMobile, srcDesktop, alt }) => (
          <a
            href={href}
            class={`overflow-hidden
              ${RADIUS_MOBILE[radius?.mobile ?? "None"]}
              ${RADIUS_DESKTOP[radius?.desktop ?? "None"]}
            `}
          >
            <Picture>
              <Source
                media="(max-width: 767px)"
                src={srcMobile}
                width={bannerSize.width}
                height={bannerSize.height}
              />
              <Source
                media="(min-width: 768px)"
                src={srcDesktop ? srcDesktop : srcMobile}
                width={bannerSize.width}
                height={bannerSize.height}
              />
              <img
                class="w-full"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={srcMobile}
                alt={alt}
                decoding="async"
                loading="lazy"
              />
            </Picture>
          </a>
        ))}
      </div>
    </Container>
  );
}
