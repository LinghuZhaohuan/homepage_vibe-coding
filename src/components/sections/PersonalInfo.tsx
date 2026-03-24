import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Fingerprint, MapPin, Calendar, UserCircle, Crosshair, Clock, IdCard } from 'lucide-react';

const NameCard = () => (
  <div className="relative rounded-xl bg-background/80 border border-border/60 p-5 group hover:border-primary/30 transition-colors duration-200 overflow-hidden">
    <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    />
    <div className="absolute top-3 right-3 text-primary/15 group-hover:text-primary/25 transition-colors">
      <UserCircle size={28} />
    </div>
    <span className="text-[16px] font-mono text-muted-foreground tracking-wider uppercase">
      姓名
    </span>
    <p className="mt-2 text-lg font-bold text-foreground tracking-tight">
      令狐赵桓
    </p>
    <div className="mt-2.5">
      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-muted-foreground/10 bg-muted-foreground/[0.04]">
        <IdCard size={11} className="text-muted-foreground/40" />
        <span className="text-[14px] font-mono text-muted-foreground/60 tracking-wider">
          Linghu Zhaohuan
        </span>
      </div>
    </div>
  </div>
);

const AgeCard = () => (
  <div className="relative rounded-xl bg-background/80 border border-border/60 p-5 group hover:border-primary/30 transition-colors duration-200 overflow-hidden">
    <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    />
    <div className="absolute top-3 right-3 text-primary/15 group-hover:text-primary/25 transition-colors">
      <Calendar size={28} />
    </div>
    <span className="text-[16px] font-mono text-muted-foreground tracking-wider uppercase">
      年龄
    </span>
    <p className="mt-2 text-lg font-bold text-foreground tracking-tight">
      22 岁
    </p>
    <div className="mt-2.5">
      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-muted-foreground/10 bg-muted-foreground/[0.04]">
        <Clock size={11} className="text-muted-foreground/40" />
        <span className="text-[14px] font-mono text-muted-foreground/60 tracking-wider">
          Born in 2004.1.11
        </span>
      </div>
    </div>
  </div>
);

const LocationCard = () => (
  <div className="relative rounded-xl bg-background/80 border border-border/60 p-5 group hover:border-primary/30 transition-colors duration-200 overflow-hidden">
    <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    />
    <div className="absolute top-3 right-3 text-primary/15 group-hover:text-primary/25 transition-colors">
      <MapPin size={28} />
    </div>
    <span className="text-[16px] font-mono text-muted-foreground tracking-wider uppercase">
      籍贯
    </span>
    <p className="mt-2 text-lg font-bold text-foreground tracking-tight">
      山西·运城
    </p>
    <div className="mt-2.5">
      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-muted-foreground/10 bg-muted-foreground/[0.04]">
        <Crosshair size={11} className="text-muted-foreground/40" />
        <span className="text-[14px] font-mono text-muted-foreground/60 tracking-wider">
          Yuncheng, Shanxi
        </span>
      </div>
    </div>
  </div>
);

export const PersonalInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative rounded-2xl border border-primary/15 bg-white/60 backdrop-blur-xl shadow-lg shadow-primary/5 overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-5 md:px-8 md:py-6 cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Fingerprint size={20} />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-foreground tracking-tight">
              基本信息
            </h3>
            <span className="text-xs text-muted-foreground font-mono tracking-widest">
              Basic Info
            </span>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 md:px-8 md:pb-8">
              <div className="h-[1px] bg-border mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <NameCard />
                <AgeCard />
                <LocationCard />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
