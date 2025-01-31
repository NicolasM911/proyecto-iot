'use client';

import { ModeToggle } from '@/components/mode-toggle';
import { Droplet, Gauge, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden mr-2"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <Droplet className="h-6 w-6" />
            <span className="font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Proyecto IoT
            </span>
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-end space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}