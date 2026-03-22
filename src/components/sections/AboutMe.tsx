import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Rocket, Heart, Info } from 'lucide-react';

export const AboutMe = () => {
  const details = [
    { label: '当前身份', value: '计算机专业的研0学生', icon: User },
    { label: '当前主要任务', value: '毕设和 vibe coding', icon: Rocket },
    { label: '兴趣', value: '运动和游戏', icon: Heart },
  ];

  const others = [
    '姓名由四个字构成',
    '令狐为复姓',
    '专注因果推理与大模型交互',
  ];

  return (
    <section id="about" className="py-20 px-4 md:px-8 max-w-4xl mx-auto space-y-12">
      <div className="flex flex-col items-center md:items-start space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          关于我 <div className="w-12 h-1 bg-primary rounded-full"></div>
        </h2>
        <p className="text-muted-foreground">这里是关于我的一些基本信息和近况展示。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {details.map((item, index) => (
          <Card key={index} className="border-none bg-white shadow-lg shadow-pink-100/20 hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                <item.icon size={20} />
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{item.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold text-foreground leading-tight">
                {item.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none bg-secondary/30 backdrop-blur-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="p-8 md:w-1/3 bg-primary/10 flex flex-col items-center justify-center text-center">
            <Info className="text-primary mb-4" size={40} />
            <h3 className="font-bold text-xl mb-2">其他备注</h3>
            <p className="text-sm text-muted-foreground">更多碎碎念...</p>
          </div>
          <div className="p-8 md:w-2/3">
            <ul className="space-y-4">
              {others.map((text, i) => (
                <li key={i} className="flex items-center gap-4 text-foreground group">
                  <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform"></div>
                  <span className="font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </section>
  );
};
