import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { LoaderContext } from "$live/mod.ts";
import { Matcher } from "$live/blocks/matcher.ts";

/** @titleBy alt */
export interface Banner {
  /** @title Regra de Aplicação */
  rule: Matcher;
  /**
   * @title Imagem para mobile
   */
  mobile: LiveImage;
  /**
   * @title Imagem para desktop
   */
  desktop: LiveImage;
  /**
   * @title Texto alternativo
   */
  alt: string;
  /**
   * @title Link
   */
  href: string;
  /**
   * @title Pré-carregar
   * @description Marque essa opção quando esse banner for a maior imagem na tela na primeira visualização para questões de otimização
   */
  preload?: boolean;
}

export interface Props {
  /** @title Banners */
  banners: Banner[];
  /**
   * @title Pré-carregar
   * @description Marque essa opção quando esse banner for a maior imagem na tela na primeira visualização para questões de otimização
   */
  preload?: boolean;
}

function ScheduledBanner(
  { href, mobile, desktop, alt, preload }: Banner,
) {
  return (
    <a
      href={href}
      class="mb-10 block"
    >
      <Picture preload={preload}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={preload ? "high" : "auto"}
          src={mobile}
          width={767}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={preload ? "high" : "auto"}
          src={desktop}
          width={1920}
        />
        <img
          class="w-full"
          src={mobile}
          alt={alt}
          decoding="async"
          loading={preload ? "eager" : "lazy"}
          height={100}
          width={1920}
        />
      </Picture>
    </a>
  );
}

export default ScheduledBanner;

export const loader = async (
  { banners: unfilteredBanners, preload }: Props,
  req: Request,
  ctx: LoaderContext,
) => {
  const banners = (await Promise.all(
    unfilteredBanners.map(async ({ rule, ...rest }) => {
      const matcher = (await ctx.get(rule)) as (
        input: { request: Request },
      ) => boolean;

      if (typeof matcher === "function" && matcher({ request: req })) {
        return { ...rest, preload };
      }

      return null;
    }),
  )).filter(Boolean).flatMap((a) => a);

  return banners[0];
};