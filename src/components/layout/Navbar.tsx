import React from 'react';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <span className="font-bold text-lg tracking-tight gradient-text">令狐赵桓</span>
        <div className="flex gap-4">
          <Button variant="ghost" size="sm" onClick={() => scrollTo('about')}>关于我</Button>
          <Button variant="ghost" size="sm" onClick={() => scrollTo('chat')}>聊天区</Button>
        </div>
      </div>
    </nav>
  );
};
