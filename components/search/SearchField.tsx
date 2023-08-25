import { useUI } from "$store/sdk/useUI.ts";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export default function SearchField() {
    const { displaySearchbar } = useUI();

    return (
        <form class="relative text-base-content">
            <input
                class="input input-bordered input-sm w-60 pl-9"
                onFocus={() => {
                    displaySearchbar.value = true;
                }}
                onBlur={() => {
                    displaySearchbar.value = false;
                }}
            />
            <div class="absolute left-2 top-0 flex h-8 items-center text-base-300">
            <Icon
                id="MagnifyingGlass"
                size={20}
            />
            </div>
        </form>
    )
}