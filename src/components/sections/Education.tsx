import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, GraduationCap, BookOpen, User as UserIcon } from 'lucide-react';

interface TimelineEntry {
  period: string;
  school: string;
  schoolEn: string;
  degree: string;
  tags: { label: string; highlight?: boolean }[];
  active?: boolean;
}

const entries: TimelineEntry[] = [
  {
    period: '2026.09 - 至今',
    school: '北京理工大学',
    schoolEn: 'Beijing Institute of Technology',
    degree: '硕士 · 计算机科学',
    tags: [{ label: 'Advisor: 丁立中', highlight: true }],
    active: true,
  },
  {
    period: '2022.09 - 2026.06',
    school: '北京理工大学',
    schoolEn: 'Beijing Institute of Technology',
    degree: '本科 · 计算机科学与技术',
    tags: [{ label: '徐特立英才班', highlight: true }],
  },
];

const TimelineNode = ({ active, index }: { active?: boolean; index: number }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.15 + index * 0.12, duration: 0.3 }}
    className="relative flex items-center justify-center"
  >
    {active && (
      <span className="absolute w-5 h-5 rounded-full bg-primary/20 animate-ping" />
    )}
    <span
      className={`relative z-10 w-3 h-3 rounded-full border-2 ${
        active
          ? 'bg-primary border-primary shadow-md shadow-primary/30'
          : 'bg-muted-foreground/20 border-muted-foreground/30'
      }`}
    />
  </motion.div>
);

const TimelineItem = ({ entry, index, isLast }: { entry: TimelineEntry; index: number; isLast: boolean }) => (
  <div className="relative flex gap-5">
    {/* 轴线 + 节点 */}
    <div className="flex flex-col items-center">
      <TimelineNode active={entry.active} index={index} />
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.25 + index * 0.12, duration: 0.4 }}
          className="w-[1.5px] flex-1 bg-foreground/10 origin-top"
        />
      )}
    </div>

    {/* 内容 */}
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.35 }}
      className="pb-8 flex-1"
    >
      <span className="text-xs font-mono text-muted-foreground tracking-wider">
        {entry.period}
      </span>

      <h4 className="mt-1.5 text-lg font-bold text-foreground tracking-tight leading-snug">
        {entry.school}
      </h4>
      <span className="text-xs font-mono text-muted-foreground/50 tracking-wider">
        {entry.schoolEn}
      </span>

      <p className="mt-1.5 text-sm font-bold text-foreground">
        {entry.degree}
      </p>

      {entry.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <div
              key={tag.label}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-mono tracking-wider ${
                tag.highlight
                  ? 'border-primary/30 bg-primary/5 text-primary'
                  : 'border-muted-foreground/15 bg-muted-foreground/[0.04] text-muted-foreground/70'
              }`}
            >
              {tag.highlight ? (
                <BookOpen size={12} />
              ) : (
                <UserIcon size={12} />
              )}
              {tag.label}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  </div>
);

export const Education = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative rounded-2xl border border-primary/15 bg-white/60 backdrop-blur-xl shadow-lg shadow-primary/5 overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-5 md:px-8 md:py-6 cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <GraduationCap size={20} />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-foreground tracking-tight">
              教育经历
            </h3>
            <span className="text-xs text-muted-foreground font-mono tracking-widest">
              Education
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

              <div className="pl-1">
                {entries.map((entry, i) => (
                  <TimelineItem
                    key={entry.period}
                    entry={entry}
                    index={i}
                    isLast={i === entries.length - 1}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
