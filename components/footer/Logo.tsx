import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { imgPh } from "$store/components/ui/Types.tsx";

export interface Props {
  logo?: {
    image: LiveImage;
    description?: string;
  };
}

export default function Logo({ logo }: Props) {
  return (
    <div class="flex flex-col gap-3">
      <div class="w-28 max-h-16">
        <img
          src={logo?.image || imgPh["rct-sm"]}
          alt={logo?.description}
          width={200}
          height={100}
        />
      </div>
      <div class="">
        {logo?.description}
      </div>
    </div>
  );
}
