import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { AboutMe } from '@/components/sections/AboutMe';
import { ChatBot } from '@/components/sections/ChatBot';

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
      <Navbar />
      
      <main className="max-w-5xl mx-auto">
        <Hero />
        
        <div className="h-24 w-full flex items-center justify-center">
          <div className="w-1 h-12 bg-gradient-to-b from-primary/50 to-transparent rounded-full animate-bounce"></div>
        </div>
        
        <AboutMe />
        
        <ChatBot />
      </main>

      <footer className="py-12 px-4 border-t border-border mt-20 text-center text-sm text-muted-foreground">
        <p>© 2026 令狐赵桓的个人主页. All Rights Reserved.</p>
        <p className="mt-2 font-mono opacity-50 tracking-widest uppercase">Built with Passion & AI</p>
      </footer>
    </div>
  );
};

export default Home;
