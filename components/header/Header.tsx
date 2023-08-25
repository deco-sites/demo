import Modals from "$store/islands/HeaderModals.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";

import { Colors, TextColors } from "$store/components/ui/Types.tsx"

import { Alert, Alerts } from "./Alerts.tsx";
import Navbar, { AdditionalProps as NavBarOptions, Layout as NavBarLayout, Style as navBarStyle } from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";

export interface Layout {
  alertWidth?: "Full" | "Full bleed";
}

export interface Style {
  alert?: {
    bgColor?: Colors;
    bgImage?: LiveImage;
    textColor?: TextColors;
  }
  navBar?: navBarStyle;
}

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  image?: {
    src?: LiveImage;
    alt?: string;
  };
}

export interface Search {
  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: LoaderReturnType<Product[] | null>;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: LoaderReturnType<Suggestion | null>;
}

export interface NavItems {
  /**
   * @title Navigation items
   * @description Shown on mobile and desktop menus
   */
  navItems?: NavItem[];
}

export interface Props {
  alerts?: Array<Alert>;
  logo?: { src: LiveImage; alt: string };
  navBar?: NavItems & NavBarOptions;
  /** @title Search */
  searchbar?: SearchbarProps & Search;
  layout?: Layout & NavBarLayout;
  style?: Style;
}

function Header({
  alerts = [],
  logo,
  navBar,
  searchbar: _searchbar,
  layout,
  style,
}: Props) {
  const searchbar = { ..._searchbar };

  return (
    <>
      <header style={{ height: headerHeight }}>
        <div class="fixed w-full z-50">
          { alerts.length > 0 && <Alerts alerts={alerts} /> }
          <Navbar
            items={navBar?.navItems || []}
            saleLink={navBar?.saleLink}
            searchbar={searchbar}
            extraIcons={navBar?.extraIcons}
            regionOptions={navBar?.regionOptions}
            buttons={navBar?.buttons}
            logo={logo}
            style={style?.navBar}
            layout={layout}
          />
        </div>

        <Modals
          menu={{ items: navBar?.navItems || [] }}
          searchbar={searchbar}
        />
      </header>
    </>
  );
}

export default Header;
