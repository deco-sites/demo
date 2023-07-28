import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Searchbar from "$store/islands/HeaderSearchbar.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import Image from "deco-sites/std/components/Image.tsx";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import { TextColors } from "$store/components/ui/Types.tsx"
import RegionSelector, { RegionOptions } from "$store/components/footer/RegionSelector.tsx";
import { Colors, ButtonType, colorClasses, getButtonClasses, textColorClasses, layoutClasses } from "$store/components/ui/Types.tsx"

export interface IconItem {
  icon: AvailableIcons;
  label: string;
  href: string;
}

export type Width = 
  "Full bleed" |
  "Full";


export type Variations =
  "Variation 1: One line" |
  "Variation 2: One line" |
  "Variation 3: One line" |
  "Variation 4: One line" |
  "Variation 5: Two lines" |
  "Variation 6: Two lines" |
  "Variation 7: Two lines" |
  "Variation 8: Two lines" |
  "Variation 9: Two lines";

export interface Button {
  label: string;
  href: string;
  style: ButtonType;
}

export interface AdditionalProps {
  saleLink?: {
    label?: string;
    href?: string;
    color?: TextColors;
  }
  extraIcons?: Array<IconItem>;
  regionOptions?: RegionOptions;
  buttons?: Array<Button>;
  hide?: {
    language?: boolean;
  }
}

export interface Style {
  bgColor?: Colors;
  bgImage?: LiveImage;
  textColor?: TextColors;
}

export interface Props {
  logo?: {
      src: string;
      alt: string;
  };
  items: INavItem[];
  searchbar: SearchbarProps;
  style?: Style;
  layout?: {
    navBarWidth?: Width;
    navBarVariation?: Variations;
  }
}

export default function Navbar({
  logo,
  items,
  saleLink = {},
  searchbar,
  extraIcons = [],
  regionOptions = { currency: [], language: [] },
  buttons = [],
  style,
  layout,
}: Props & AdditionalProps) {
  const _logo = (
    <div class="flex-none w-44">
      {logo && (
        <a
          href="/"
          aria-label="Store logo"
          class="flex items-center w-[160px]"
        >
          <Image src={logo.src} alt={logo.alt} width={126} height={16} />
        </a>
      )}
    </div>
  )

  const _navItems = (
    <ul class="flex justify-center">
      {items.map((item) => <NavItem item={item} />)}
      {saleLink && (
        <li class="group flex items-center">
          <a href={saleLink.href} class={`group-hover:underline px-4 py-3 ${textColorClasses[saleLink.color || "Auto"]}`}>{saleLink.label}</a>
        </li>
      )}
    </ul>
  )

  const _extraIcons = (
    extraIcons.length > 0 && (
      <>
        {
          extraIcons.map(icon => {
            return (
              <a
                class="btn btn-circle btn-sm btn-ghost"
                href={icon.href}
                aria-label={icon.label}
              >
                <Icon
                  id={icon.icon}
                  size={20}
                  strokeWidth={2}
                  fill="none"
                />
              </a>
            )
          })
        }
      </>
    )
  )

  const _icons_class = "btn btn-circle btn-sm btn-ghost";
  const _icons = (
    <div class="flex-none flex items-center justify-end gap-2">
      <Buttons variant="search" />
      <Searchbar searchbar={searchbar} />
      <a class={_icons_class} href="/login" aria-label="Log in">
        <Icon id="User" size={20} />
      </a>
      <a class={_icons_class} href="/wishlist" aria-label="Wishlist">
        <Icon id="Heart" size={20} />
      </a>
      {_extraIcons}
      <Buttons variant="cart" />
    </div>
  )

  const _region = <RegionSelector content={regionOptions} />;

  const _buttons = (
    buttons.length > 0 && (
      <div class="flex gap-2">
        {
          buttons.map(button => {
            return (
              <a href={button.href} class={`${getButtonClasses(button.style || {})} btn-sm`}>{button.label}</a>
            )
          })
        }
      </div>
    )
  )

  const bgColor = style?.bgColor || "Transparent";
  const bgColorClasses = bgColor ? colorClasses[bgColor] : "";
  const l = layout?.navBarVariation || "Variation 1: One line";
  const width = layoutClasses[layout?.navBarWidth || "Full bleed"]
  
  return (
    <>
      {/* Desktop Version */}
      <div
        class={`
          hidden md:block border-b border-base-200 w-full px-3
          ${bgColorClasses}
          ${textColorClasses[style?.textColor || "Auto"]}
          ${style?.bgImage ? "bg-cover bg-center" : ""}
        `}
        style={{ "background-image": style?.bgImage ? `url(${style?.bgImage})` : "" }}
      >
        {
          l === "Variation 1: One line" && (
            <div class={`${width} flex justify-between items-center gap-3`}>
              {_navItems}
              <div class="flex-auto flex justify-center">
                {_logo}
              </div>
              {_icons}
              {_region}
              {_buttons}
            </div>
          )
        }

        {
          l === "Variation 2: One line" && (
            <div class={`${width} flex justify-between items-center gap-3`}>
              {_logo}
              <div class="flex-auto flex justify-center">
                {_navItems}
              </div>
              {_icons}
              {_region}
              {_buttons}
            </div>
          )
        }

        {
          l === "Variation 3: One line" && (
            <div class={`${width} flex justify-between items-center gap-3`}>
              <div class="flex-auto flex items-center">
                {_logo}
                {_navItems}
              </div>
              {_icons}
              {_region}
              {_buttons}
            </div>
          )
        }
      </div>

      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 gap-2"
      >
        <Buttons variant="menu" />

        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image src={logo.src} alt={logo.alt} width={126} height={16} />
          </a>
        )}

        <div class="flex gap-1">
          <Buttons variant="search" />
          <Buttons variant="cart" />
        </div>
      </div>
    </>
  );
}
