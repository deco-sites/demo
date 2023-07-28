export type Item = {
  label: string;
  href: string;
};

export interface RegionOptions {
  currency?: Item[];
  language?: Item[];
}

export default function RegionSelector(
  { content = { currency: [], language: [] } }: { content?: RegionOptions },
) {
  return (
    <>
      {content && ((content.language && content?.language?.length > 0) || (content.currency && content?.currency?.length > 0) &&
        <div class="flex gap-4 text-base-content">
          {content?.currency?.length > 0 && (
            <select class="select select-bordered select-sm">
              {content.currency.map((crr) => <option>{crr.label}</option>)}
            </select>
          )}
          {content.language && content.language?.length > 0 && (
            <select class="select select-bordered select-sm">
              {content.language.map((lng) => <option>{lng.label}</option>)}
            </select>
          )}
        </div>
      )}
    </>
  );
}
