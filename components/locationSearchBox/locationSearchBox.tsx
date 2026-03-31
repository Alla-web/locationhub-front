import css from "./locationSearchBox.module.css";

import type { Region } from "@/types/region";
import type { LocationType } from "@/types/locationType";
import type { LocationFilters } from "@/types/location";

interface LocationSearchBoxProps {
  search: string;
  regions: Region[];
  locationTypes: LocationType[];
  filters: LocationFilters;
  onSearchChange: (search: string) => void;
  onFiltersChange: (filters: LocationFilters) => void;
}

export default function LocationSearchBox({
  search,
  regions,
  locationTypes,
  filters,
  onSearchChange,
  onFiltersChange,
}: LocationSearchBoxProps) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    onFiltersChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div>
      <div>
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          name="search"
          type="text"
          placeholder="Пошук"
        />

        <select
          name="region"
          value={filters.region}
          onChange={handleSelectChange}
        >
          <option value="">Регіон</option>
          {regions.map((region) => (
            <option key={region._id} value={region._id}>
              {region.name}
            </option>
          ))}
        </select>

        <select
          name="locationType"
          value={filters.locationType}
          onChange={handleSelectChange}
        >
          <option value="">Тип локації</option>
          {locationTypes.map((type) => (
            <option key={type._id} value={type._id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <select name="sort" value={filters.sort} onChange={handleSelectChange}>
        <option value="">Сортування</option>

        <option value="name-asc">Назва A → Я</option>
        <option value="name-desc">Назва Я → А</option>

        <option value="rate-asс">Рейтинг ↑</option>
        <option value="rate-desc">Рейтинг ↑</option>

        <option value="newest">Спочатку нові</option>
        <option value="oldest">Спочатку старі</option>
      </select>
    </div>
  );
}
