"use client";

import { PlaceholderIcon } from "@phosphor-icons/react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const categories = [
  "美食",
  "景点/周边游",
  "酒店/民宿",
  "休闲/玩乐",
  "美发",
  "外卖",
  "KTV",
  "健身/运动",
  "按摩/足疗",
  "装修服务",
  "物流搬运",
  "园艺绿化",
  "水管电工",
  "保姆月嫂",
  "房屋租赁",
];

const ROW_COUNT = 2;

const layouts = Array.from({ length: 7 }, (_, index) => {
  const columnCount = index + 1;
  const pageSize = columnCount * ROW_COUNT;
  const pages = Array.from(
    { length: Math.ceil(categories.length / pageSize) },
    (_, pageIndex) =>
      categories.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
  );

  return {
    columnCount,
    pages,
  };
});

export function CategoryPager() {
  return (
    <section
      aria-labelledby="category-heading"
      className="relative rounded-2xl p-5 sm:p-6"
    >
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-ink">
            Explore local
          </p>
          <h2
            id="category-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            探索本地生活
          </h2>
        </div>
        <p className="hidden text-sm text-muted sm:block">
          墨尔本生活服务，一站轻松找到
        </p>
      </div>

      <div className="category-grid-container">
        {layouts.map(({ columnCount, pages }) => (
          <div
            key={columnCount}
            className="category-layout"
            data-columns={columnCount}
          >
            <Carousel
              opts={{
                align: "start",
                containScroll: "trimSnaps",
                duration: 28,
                loop: false,
              }}
              aria-label="本地生活分类"
            >
              <CarouselContent className="ml-0 gap-3">
                {pages.map((pageCategories, pageIndex) => (
                  <CarouselItem
                    key={pageIndex}
                    className="pl-0"
                    aria-label={`第 ${pageIndex + 1} 页，共 ${pages.length} 页`}
                  >
                    <div
                      className="category-grid"
                      data-columns={columnCount}
                    >
                      {pageCategories.map((category) => (
                        <div key={category} className="category-tile">
                          <span className="grid size-11 place-items-center rounded-md bg-brand/10 text-brand-ink">
                            <PlaceholderIcon
                              aria-hidden="true"
                              size={24}
                              weight="duotone"
                            />
                          </span>
                          <span className="text-sm font-semibold text-ink">
                            {category}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {pages.length > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          </div>
        ))}
      </div>
    </section>
  );
}
