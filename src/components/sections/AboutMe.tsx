import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { PersonalInfo } from './PersonalInfo';
import { Education } from './Education';
import { Contact } from './Contact';
import { Resume } from './Resume';

export const AboutMe = () => {
  const others = [
    '热爱运动，篮球、羽毛球爱好者，每周坚持跑步3-4次',
    'FPS游戏爱好者，CSGO骨灰级玩家，Team Spirit未签约选手',
    '一直在尝试用vibe coding做一些有意思的事情',
  ];

  return (
    <section id="about" className="py-20 px-4 md:px-8 max-w-4xl mx-auto space-y-12">
      <div className="flex flex-col items-center md:items-start space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          关于我 <div className="w-12 h-1 bg-primary rounded-full"></div>
        </h2>
        <p className="text-muted-foreground">这里是关于我的一些基本信息。</p>
      </div>

      <PersonalInfo />

      <Education />

      <Contact />

      <Resume />

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
