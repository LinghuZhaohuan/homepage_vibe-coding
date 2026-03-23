import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, MessageCircle } from 'lucide-react';

export const Hero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-32 pb-20 flex flex-col items-center text-center px-4">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
        <Avatar className="w-28 h-28 md:w-36 md:h-36 border-4 border-white shadow-xl relative z-10">
          <AvatarImage src="/images/touxiang.png" alt="令狐赵桓" />
          <AvatarFallback className="bg-primary text-white text-3xl font-bold">L</AvatarFallback>
        </Avatar>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-foreground">
        令狐赵桓
      </h1>
      
      <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-md">
        一个专注因果推理的算法探索者
      </p>
      
      <div className="mt-6 flex gap-2">
        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold tracking-wider uppercase">
          AI Research
        </span>
        <span className="px-3 py-1 bg-pink-100 text-pink-500 rounded-full text-xs font-semibold tracking-wider uppercase">
          Causal Inference
        </span>
      </div>

      <div className="mt-10 flex gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={() => scrollTo('about')}
          className="rounded-full px-8 text-base font-semibold gap-2 border-primary/30 hover:bg-primary/5"
        >
          <User size={18} />
          关于我
        </Button>
        <Button
          size="lg"
          onClick={() => scrollTo('chat')}
          className="rounded-full px-8 text-base font-semibold gap-2 shadow-lg shadow-primary/25"
        >
          <MessageCircle size={18} />
          和我聊聊
        </Button>
      </div>
    </section>
  );
};
