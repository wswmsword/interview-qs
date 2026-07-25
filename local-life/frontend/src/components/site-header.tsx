"use client";

import {
  HouseLineIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[60px] border-b border-line bg-white/95 backdrop-blur">
      <div className="site-shell flex h-full items-center gap-3">
        <Link
          href="/"
          aria-label="邻里集首页"
          className="flex shrink-0 items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <span className="grid size-9 place-items-center rounded-md bg-brand text-white">
            <HouseLineIcon aria-hidden="true" size={21} weight="fill" />
          </span>
          <span className="hidden font-serif text-[18px] font-semibold text-ink sm:inline">
            邻里集
          </span>
        </Link>

        <div role="search" className="min-w-0 flex-1 max-sm:hidden">
          <label className="relative block">
            <span className="sr-only">搜索本地商户</span>
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              size={18}
            />
            <input
              type="search"
              placeholder="搜索商户、服务或地区"
              className="h-10 w-full rounded-md border border-line bg-fill pl-10 pr-4 text-sm text-ink outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand-soft"
            />
          </label>
        </div>

        <button
          type="button"
          aria-label="搜索"
          className="ml-auto grid size-10 shrink-0 place-items-center rounded-md text-ink outline-none transition hover:bg-fill focus-visible:ring-2 focus-visible:ring-brand sm:hidden"
        >
          <MagnifyingGlassIcon aria-hidden="true" size={21} weight="bold" />
        </button>

        <button
          type="button"
          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-md bg-brand px-3.5 text-sm font-semibold text-white outline-none transition hover:bg-brand-ink focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          <PlusIcon aria-hidden="true" size={16} weight="bold" />
          发布
        </button>
        <button
          type="button"
          className="h-10 shrink-0 rounded-md px-2 text-sm font-semibold text-ink outline-none transition hover:bg-fill focus-visible:ring-2 focus-visible:ring-brand sm:px-3.5"
        >
          登录
        </button>
      </div>
    </header>
  );
}
