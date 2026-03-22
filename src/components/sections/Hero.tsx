import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Hero = () => {
  return (
    <section className="pt-32 pb-16 flex flex-col items-center text-center px-4">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
        <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white shadow-xl relative z-10">
          <AvatarImage src="https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_6dfd91dc-4c50-4ec1-87e1-dc949079ad44.jpg" alt="令狐赵桓" />
          <AvatarFallback className="bg-primary text-white text-3xl font-bold">L</AvatarFallback>
        </Avatar>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-foreground">
        令狐赵桓
      </h1>
      
      <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-md">
        一个专注因果推理的算法探索者
      </p>
      
      <div className="mt-8 flex gap-2">
        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold tracking-wider uppercase">
          AI Research
        </span>
        <span className="px-3 py-1 bg-pink-100 text-pink-500 rounded-full text-xs font-semibold tracking-wider uppercase">
          Causal Inference
        </span>
      </div>
    </section>
  );
};
