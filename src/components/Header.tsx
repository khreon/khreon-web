'use client';

import Link from 'next/link';
import Image from 'next/image';
import content from '../../content.json';
import { Menu, X } from 'lucide-react';
import ClientTrackedLink from "@/components/ClientTrackedLink";
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 h-16">
        <Link href="/" className="flex items-center gap-2">
          <Image src={content.header.logo} alt={`${content.hospitalName} 로고`} width={36} height={36} className="w-8 h-8 md:w-9 md:h-9 object-contain" />
          <span className="font-bold text-xl tracking-tight text-primary">{content.hospitalName}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          {content.header.navMenu.map((item, idx) => (
            <Link key={idx} href={item.path} className="hover:text-primary transition-colors">{item.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <ClientTrackedLink href={content.header.bookingUrl} target="_blank" rel="noopener noreferrer" 
             action="click_booking" category="Header"
             className="inline-flex items-center justify-center px-4 md:px-5 py-2 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-dark transition-colors shadow-sm whitespace-nowrap">
            네이버 예약
          </ClientTrackedLink>
          <button className="md:hidden p-1 text-gray-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
          {content.header.navMenu.map((item, idx) => (
            <Link 
              key={idx} 
              href={item.path} 
              className="text-gray-700 font-bold text-lg py-3 border-b border-gray-50 hover:text-primary transition-colors active:bg-gray-50 px-2 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
