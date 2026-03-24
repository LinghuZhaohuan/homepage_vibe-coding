import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown, FileText, Layers, Trophy, Award, Gauge,
  ChevronLeft, ChevronRight, X, Brain, Server,
  Code, Zap, Shield
} from 'lucide-react';

/* ========================================
   Section 1: 实践经历 - Bento Box
   ======================================== */

const projectMain = {
  title: 'Edu-RAG：基于混合检索与动态工作流的垂域知识问答系统',
  role: 'RAG 算法工程师 / 项目负责人',
  period: '2025.03 - 2025.06',
  tags: ['DeepSeek-R1', '混合检索 (Dense+Sparse)', 'Workflow 意图识别', 'Self-Correction'],
  highlights: [
    '实现了从非结构化数据到结构化 JSON 的 ETL 流水线',
    '设计了 Router-Retriever-Generator-Verifier 闭环链路',
    '通过 Doubao-1.5-pro 降低了幻觉率',
  ],
};

const projectSub = {
  title: '基于多模型对比的大规模实体关系抽取 (RE) 研究',
  role: '项目负责人',
  period: '2024.05 - 2024.06',
  details: ['基于 PyTorch 搭建训练框架', '系统对比 LSTM、Attention-BiLSTM 及 BERT 的性能差异'],
  models: ['LSTM', 'Att-BiLSTM', 'BERT'],
};

const ProjectDetail = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white/90 backdrop-blur-xl rounded-2xl border border-primary/15 shadow-2xl p-6 max-w-lg w-full"
        >
          <button type="button" onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <X size={16} />
          </button>
          <h4 className="text-sm font-mono text-primary tracking-wider mb-1">架构设计</h4>
          <h3 className="text-lg font-bold text-foreground mb-4">Router-Retriever-Generator-Verifier 闭环链路</h3>
          <div className="space-y-3">
            {['Router → 意图识别与查询分类', 'Retriever → Dense+Sparse 混合检索', 'Generator → DeepSeek-R1 生成回答', 'Verifier → Self-Correction 验证与纠偏'].map((step, i) => (
              <div key={step} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold font-mono shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-sm text-foreground font-medium">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-border">
            <p className="text-sm font-mono text-muted-foreground/60">数据流水线: 非结构化数据 → 分块 → 向量化 → 结构化 JSON</p>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const PracticeSection = () => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="space-y-3">
      <h4 className="text-[20px] font-bold text-primary tracking-tight flex items-center gap-2">
        <Layers size={20} /> 实践经历
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {/* 主卡片 */}
        <div
          onClick={() => setShowDetail(true)}
          className="md:col-span-3 relative rounded-xl bg-background/80 border border-border/60 p-5 cursor-pointer group hover:border-primary/30 transition-all overflow-hidden"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, hsl(var(--primary) / 0.03) 100%)',
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-mono text-muted-foreground tracking-wider">{projectMain.period}</span>
            <span className="text-[12px] font-mono text-primary/60 tracking-wider">点击查看详情</span>
          </div>
          <h5 className="text-base font-bold text-foreground leading-snug mb-1">{projectMain.title}</h5>
          <p className="text-sm text-muted-foreground mb-3">{projectMain.role}</p>
          <div className="flex flex-wrap gap-1.5">
            {projectMain.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-md bg-primary/5 border border-primary/15 text-[12px] font-mono text-primary tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 次要卡片 */}
        <div className="md:col-span-2 relative rounded-xl bg-background/80 border border-border/60 p-5 overflow-hidden">
          <span className="text-[12px] font-mono text-muted-foreground tracking-wider">{projectSub.period}</span>
          <h5 className="text-sm font-bold text-foreground leading-snug mt-1 mb-1">{projectSub.title}</h5>
          <p className="text-sm text-muted-foreground mb-3">{projectSub.role}</p>
          <div className="flex gap-2">
            {projectSub.models.map((m, i) => (
              <div key={m} className="flex-1 text-center py-1.5 rounded-md bg-muted/50 border border-border/60">
                <span className="text-[12px] font-mono text-muted-foreground block mb-0.5">模型 {i + 1}</span>
                <span className="text-xs font-bold text-foreground">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ProjectDetail open={showDetail} onClose={() => setShowDetail(false)} />
    </div>
  );
};

/* ========================================
   Section 2: 竞赛经历 - 水平滚动
   ======================================== */

const competitions = [
  { date: '2025.12', title: '第七届全国高校计算机能力挑战赛', sub: '程序设计挑战赛', award: '全国二等奖', level: '二等奖', accent: 'border-violet-300/40 bg-violet-50/50' },
  { date: '2025.11', title: '电信杯智能体创新创意大赛', sub: '', award: '二等奖', level: '二等奖', accent: 'border-violet-300/40 bg-violet-50/50' },
  { date: '2024.12', title: '第六届全国高校计算机能力挑战赛', sub: '程序设计挑战赛', award: '全国一等奖', level: '一等奖', accent: 'border-primary/40 bg-primary/5' },
  { date: '2023.12', title: '第 39 届全国部分地区大学生物理竞赛', sub: '', award: '一等奖', level: '一等奖', accent: 'border-primary/40 bg-primary/5' },
];

const CompetitionSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 240, behavior: 'smooth' });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-[20px] font-bold text-primary tracking-tight flex items-center gap-2">
          <Trophy size={20} /> 竞赛经历
        </h4>
        <div className="flex gap-1">
          <button type="button" onClick={() => scroll(-1)} className="w-7 h-7 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <ChevronLeft size={14} />
          </button>
          <button type="button" onClick={() => scroll(1)} className="w-7 h-7 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
      <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        {competitions.map((c) => (
          <div key={c.date + c.title} className={`relative shrink-0 w-52 rounded-xl border p-5 overflow-hidden ${c.accent}`}>
            <span className="absolute top-3 right-3 text-[48px] font-black leading-none text-foreground/[0.04] font-mono select-none pointer-events-none">
              {c.level.charAt(0)}
            </span>
            <span className="text-[12px] font-mono text-muted-foreground tracking-wider">{c.date}</span>
            <h5 className="text-sm font-bold text-foreground mt-1.5 leading-snug">{c.title}</h5>
            {c.sub && <p className="text-sm text-muted-foreground mt-0.5">{c.sub}</p>}
            <div className="mt-3">
              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold tracking-wider ${
                c.level === '一等奖' ? 'bg-primary/10 text-primary' : 'bg-violet-100 text-violet-500'
              }`}>
                {c.award}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ========================================
   Section 3: 获奖情况 - 荣誉阵列
   ======================================== */

const HonorSection = () => (
  <div className="space-y-3">
    <h4 className="text-[20px] font-bold text-primary tracking-tight flex items-center gap-2">
      <Award size={20} /> 获奖情况
    </h4>

    <div className="flex flex-col items-center gap-4">
      {/* 国家奖学金 - 核心高亮 */}
      <div className="relative px-8 py-4 rounded-2xl bg-primary/5 border border-primary/20">
        <div className="absolute inset-0 rounded-2xl animate-pulse opacity-30"
          style={{ boxShadow: '0 0 30px hsl(var(--primary) / 0.3), inset 0 0 30px hsl(var(--primary) / 0.05)' }}
        />
        <div className="relative text-center">
          <span className="text-[12px] font-mono text-primary/60 tracking-widest">2025.10</span>
          <h5 className="text-xl font-black mt-1 tracking-tight text-primary animate-pulse">国家奖学金</h5>
        </div>
      </div>

      {/* 奖学金网格 */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { label: '一等奖学金', count: 'x3' },
          { label: '二等奖学金', count: 'x3' },
          { label: '三等奖学金', count: 'x1' },
        ].map((s) => (
          <span key={s.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/20 bg-primary/[0.03] text-sm font-mono font-semibold tracking-wider text-primary/70">
            {s.label}
            <span className="text-[12px] text-primary/50">{s.count}</span>
          </span>
        ))}
      </div>

      {/* 荣誉称号 */}
      <div className="flex flex-wrap justify-center gap-2">
        {['校级优秀学生 (2023-2025)', '校级优秀团员 (2025)'].map((h) => (
          <span key={h} className="px-3 py-1 rounded-md bg-muted/40 border border-border/60 text-sm font-mono text-foreground tracking-wider">
            {h}
          </span>
        ))}
      </div>
    </div>
  </div>
);

/* ========================================
   Section 4: 个人优势 - 能力仪表盘
   ======================================== */

const skills = [
  { label: '算法深度', code: '算法功底', value: 90, icon: Brain, desc: '精通数据结构、深度学习及强化学习理论' },
  { label: '快速迁移', code: '技术迁移', value: 95, icon: Zap, desc: '快速学习能力，多个跨领域项目经验' },
  { label: '系统架构', code: '架构能力', value: 87, icon: Server, desc: 'RAG 工程实践，Transformer 架构' },
];

const techStack = ['Python', 'C/C++', 'PyTorch', 'Transformer', 'RAG'];

const SkillBar = ({ skill, index }: { skill: typeof skills[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -12 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.1 + index * 0.1 }}
    className="space-y-2"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <skill.icon size={14} className="text-primary" />
        <span className="text-sm font-bold text-foreground">{skill.label}</span>
      </div>
      <span className="text-sm font-mono font-bold text-primary tabular-nums">{skill.value}%</span>
    </div>
    <div className="h-2 rounded-full bg-muted/60 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${skill.value}%` }}
        transition={{ delay: 0.2 + index * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="h-full rounded-full bg-gradient-to-r from-primary to-pink-400"
      />
    </div>
    <p className="text-sm text-muted-foreground">{skill.desc}</p>
  </motion.div>
);

const SkillsSection = () => (
  <div className="space-y-3">
    <h4 className="text-[20px] font-bold text-primary tracking-tight flex items-center gap-2">
      <Gauge size={20} /> 个人优势
    </h4>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="md:col-span-2 space-y-5">
        {skills.map((s, i) => (
          <SkillBar key={s.code} skill={s} index={i} />
        ))}
      </div>
      <div className="space-y-3">
        <div className="rounded-xl bg-background/80 border border-border/60 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Code size={13} className="text-primary" />
            <span className="text-sm font-mono text-muted-foreground tracking-wider">技术栈</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {techStack.map((t) => (
              <span key={t} className="px-2 py-1 rounded-md bg-primary/5 border border-primary/15 text-[13px] font-mono font-semibold text-foreground">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-background/80 border border-border/60 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={13} className="text-primary" />
            <span className="text-sm font-mono text-muted-foreground tracking-wider">软实力</span>
          </div>
          <ul className="space-y-1.5">
            {['强责任心与自驱力', '抗压能力', '跨领域协作经验'].map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm text-foreground">
                <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

/* ========================================
   主组件：个人简历折叠卡片
   ======================================== */

export const Resume = () => {
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
            <FileText size={20} />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-foreground tracking-tight">
              个人简历
            </h3>
            <span className="text-xs text-muted-foreground font-mono tracking-widest">
              Resume
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
            <div className="px-6 pb-6 md:px-8 md:pb-8 space-y-8">
              <div className="h-[1px] bg-border" />
              <PracticeSection />
              <div className="h-[1px] bg-border/50" />
              <CompetitionSection />
              <div className="h-[1px] bg-border/50" />
              <HonorSection />
              <div className="h-[1px] bg-border/50" />
              <SkillsSection />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
