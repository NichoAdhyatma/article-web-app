"use client";

import SelectBuilder from "@/components/global/builder/select-builder";
import { Box } from "@/components/ui/box";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { useCategory } from "@/context/category-context";
import { useFilterContext } from "@/context/filter-context";
import useDebounce from "@/hooks/use-debounce";
import { useEffect, useState } from "react";

const HeaderContent = () => {
  const { title, category, handleSearch, handleCategoryChange } =
    useFilterContext();

  const [search, setSearch] = useState(title);

  const debouncedSearch = useDebounce(search, 500);

  const { categories } = useCategory();

  const [localCategory, setLocalCategory] = useState(category);

  useEffect(() => {
    handleSearch(debouncedSearch);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  useEffect(() => {
    handleCategoryChange(localCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localCategory]);

  const categoriesOptions =
    categories.data
      ?.filter(
        (c) => c.id && c.name && c.id.trim() !== "" && c.name.trim() !== ""
      )
      .map((c) => ({
        value: c.id as string,
        label: c.name as string,
      })) ?? [];

  return (
    <Box className="max-w-[730px] gap-10 mt-10 mb-[90px] px-4 sm:px-0 pt-25">
      <Box className="gap-3">
        <Typography size={"textBase"} weight={"bold"} className="text-white">
          Blog genzet
        </Typography>

        <Typography
          size={"text5xl"}
          weight={"medium"}
          align={"center"}
          className="text-white"
        >
          The Journal : Design Resources, Interviews, and Industry News
        </Typography>

        <Typography size={"text2xl"} weight={"regular"} className="text-white">
          Your daily dose of design insights!
        </Typography>
      </Box>

      <Box className="p-[10px] rounded-[12px] gap-2 bg-blue-500 flex-col sm:flex-row max-w-[608px]">
        <SelectBuilder
          value={localCategory}
          placeholder="Select Category"
          options={categoriesOptions}
          onChange={(value) => {
            if (!value || value === "") {
              value = "";
            }

            setLocalCategory(value);
          }}
        />

        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles"
        />
      </Box>
    </Box>
  );
};

export default HeaderContent;
