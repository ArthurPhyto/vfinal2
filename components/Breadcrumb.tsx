"use client";

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { createCategorySlug } from '@/lib/utils/slug';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-white mb-8">
      <Link 
        href="/" 
        className="text-white hover:text-white/80 transition-colors cursor-pointer"
      >
        Film en streaming
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4" />
          {item.href ? (
            <Link 
              href={`/categorie/${createCategorySlug(item.label)}`}
              className="text-white hover:text-white/80 transition-colors cursor-pointer"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white/80">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}