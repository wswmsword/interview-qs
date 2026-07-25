"use client";

import Image from "next/image";
import * as React from "react";

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { MerchantImage } from "@/types/merchant";

interface MerchantGalleryProps {
  images: MerchantImage[];
}

export function MerchantGallery({ images }: MerchantGalleryProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const updateSelectedIndex = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    updateSelectedIndex();
    api.on("select", updateSelectedIndex);
    api.on("reInit", updateSelectedIndex);

    return () => {
      api.off("select", updateSelectedIndex);
      api.off("reInit", updateSelectedIndex);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", loop: false }}
      aria-label="商家案例图片"
      className="mt-6"
    >
      <CarouselContent className="ml-0">
        {images.map((image, index) => (
          <CarouselItem
            key={image.url}
            className="pl-0"
            aria-label={`第 ${index + 1} 张，共 ${images.length} 张`}
          >
            <figure className="relative aspect-[16/9] overflow-hidden rounded-lg bg-fill md:aspect-[2.15/1]">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                unoptimized
                priority={index === 0}
                sizes="(max-width: 1071px) calc(100vw - 48px), 1024px"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-[#12201a]/70 px-5 py-3 text-sm text-white">
                <span>{image.alt}</span>
                <a
                  href={image.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 text-xs text-white/80 underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  图片：{image.author} / Unsplash
                </a>
              </figcaption>
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>

      {images.length > 1 && (
        <>
          <CarouselPrevious
            aria-label="上一张商家图片"
            className="left-3 sm:left-4"
          />
          <CarouselNext
            aria-label="下一张商家图片"
            className="right-3 sm:right-4"
          />
          <div
            className="mt-4 flex justify-center gap-2"
            aria-label="选择商家图片"
          >
            {images.map((image, index) => (
              <button
                key={image.url}
                type="button"
                aria-label={`查看第 ${index + 1} 张商家图片`}
                aria-current={selectedIndex === index ? "true" : undefined}
                onClick={() => api?.scrollTo(index)}
                className="grid size-7 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <span
                  className={`block h-2 rounded-full transition-[width,background-color] duration-200 ${
                    selectedIndex === index
                      ? "w-6 bg-brand"
                      : "w-2 bg-line"
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </Carousel>
  );
}
