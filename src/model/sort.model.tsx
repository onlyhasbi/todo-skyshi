import sortByNew from "../assets/sort-new.svg?inline";
import sortByOld from "../assets/sort-old.svg?inline";
import sortByAZ from "../assets/sort-az.svg?inline";
import sortByZA from "../assets/sort-za.svg?inline";
import sortByUnchecked from "../assets/not-yet.svg?inline";

export const SORT = [
  { label: "Terbaru", icon: sortByNew, value: "new" },
  { label: "Terlama", icon: sortByOld, value: "old" },
  { label: "A-Z", icon: sortByAZ, value: "az" },
  { label: "Z-A", icon: sortByZA, value: "za" },
  { label: "Belum Selesai", icon: sortByUnchecked, value: "unchecked" },
];
