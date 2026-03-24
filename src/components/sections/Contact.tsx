import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Phone, MessageCircle, Copy, Check, ScanLine, X, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const QQPenguin = ({ size = 15, className = '' }: { size?: number; className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M12 2C8.5 2 6 4.5 6 7.5v2c-1.4 1.8-2.5 4.2-2.5 6 0 1.2.5 2 1 2.5-.2.8-.5 1.8-.5 2.5 0 1 .8 1.5 2 1.5.8 0 1.5-.2 2-.5 1.2.6 2.5 1 4 1s2.8-.4 4-1c.5.3 1.2.5 2 .5 1.2 0 2-.5 2-1.5 0-.7-.3-1.7-.5-2.5.5-.5 1-1.3 1-2.5 0-1.8-1.1-4.2-2.5-6v-2C18 4.5 15.5 2 12 2zm-2 6.5c.6 0 1 .7 1 1.5s-.4 1.5-1 1.5-1-.7-1-1.5.4-1.5 1-1.5zm4 0c.6 0 1 .7 1 1.5s-.4 1.5-1 1.5-1-.7-1-1.5.4-1.5 1-1.5z" />
  </svg>
);

interface ContactItem {
  label: string;
  labelCode: string;
  value: string;
  masked: string;
  icon: typeof Phone;
  color: string;
  glow: string;
  bg: string;
}

const contacts: ContactItem[] = [
  {
    label: '手机',
    labelCode: '手机',
    value: '19398764414',
    masked: '193****4414',
    icon: Phone,
    color: 'text-pink-400',
    glow: 'shadow-pink-400/30',
    bg: 'bg-pink-400/[0.08] border-pink-400/20',
  },
  {
    label: '微信',
    labelCode: '微信',
    value: '19398764414',
    masked: '193****4414',
    icon: MessageCircle,
    color: 'text-violet-400',
    glow: 'shadow-violet-400/30',
    bg: 'bg-violet-400/[0.08] border-violet-400/20',
  },
  {
    label: 'QQ',
    labelCode: 'QQ',
    value: '1565082713',
    masked: '156****2713',
    icon: QQPenguin as any,
    color: 'text-sky-400',
    glow: 'shadow-sky-400/30',
    bg: 'bg-sky-400/[0.08] border-sky-400/20',
  },
];

const NumberTicker = ({ from, to, revealed }: { from: string; to: string; revealed: boolean }) => {
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    if (!revealed) {
      setDisplay(from);
      return;
    }

    const chars = '0123456789';
    const target = to;
    const current = from.split('');
    let frame = 0;
    const totalFrames = 8;

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      const next = current.map((ch, i) => {
        if (ch === target[i]) return ch;
        if (progress >= 1) return target[i];
        if (ch === '*') {
          return frame % 2 === 0 ? chars[Math.floor(Math.random() * 10)] : target[i];
        }
        return ch;
      });

      setDisplay(next.join(''));

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplay(target);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [revealed, from, to]);

  return <span>{display}</span>;
};

const ContactRow = ({ item, index }: { item: ContactItem; index: number }) => {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(item.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [item.value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.3 }}
      onClick={() => setRevealed(!revealed)}
      className="flex items-center justify-center gap-9 px-4 py-4 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer group"
    >
      {/* 图标 */}
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.bg} border`}>
        <item.icon size={18} className={item.color} />
      </div>

      {/* 标签 */}
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full border text-sm font-mono font-semibold tracking-wider shrink-0 ${item.bg} ${item.color} shadow-sm ${item.glow}`}
        style={{ textShadow: '0 0 8px currentColor' }}
      >
        {item.labelCode}
      </span>

      {/* 数据 */}
      <span className="text-base font-mono font-bold text-foreground tracking-wider tabular-nums">
        <NumberTicker
          from={item.masked}
          to={item.value}
          revealed={revealed}
        />
      </span>

      {/* 复制按钮 */}
      <div className="w-8 shrink-0 flex justify-center">
        <AnimatePresence>
          {revealed && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              onClick={handleCopy}
              className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const QRModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-primary/15 shadow-2xl p-8 max-w-lg w-full"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X size={16} />
          </button>

          <div className="text-center mb-5">
            <h4 className="text-base font-bold text-foreground">扫码添加</h4>
            <span className="text-xs font-mono text-muted-foreground tracking-wider">SCAN TO CONNECT</span>
          </div>

          {/* 二维码 + 对焦框 */}
          <div className="relative mx-auto w-80 h-80">
            {/* 四角 L 型对焦框 */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl-sm animate-pulse" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-violet-400 rounded-tr-sm animate-pulse" style={{ animationDelay: '0.3s' }} />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-sky-400 rounded-bl-sm animate-pulse" style={{ animationDelay: '0.6s' }} />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-pink-400 rounded-br-sm animate-pulse" style={{ animationDelay: '0.9s' }} />

            <img
              src="/images/erweima.jpg"
              alt="扫码添加"
              className="w-full h-full object-contain rounded-lg p-2"
            />
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
            <ShieldCheck size={12} className="text-green-500" />
            已经等不及和您成为好友啦！
          </p>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      <div className="relative rounded-2xl border border-primary/15 bg-white/60 backdrop-blur-xl shadow-lg shadow-primary/5 overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-6 py-5 md:px-8 md:py-6 cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Phone size={20} />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-foreground tracking-tight">
                联系方式
              </h3>
              <span className="text-xs text-muted-foreground font-mono tracking-widest">
                Contact
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
              <div className="px-4 pb-6 md:px-6 md:pb-8">
                <div className="h-[1px] bg-border mb-4" />

                <p className="text-xs text-muted-foreground/60 text-center mb-3 font-mono tracking-wider">
                  点击任意一行即可解密完整信息
                </p>

                <div className="space-y-1">
                  {contacts.map((item, i) => (
                    <ContactRow key={item.labelCode} item={item} index={i} />
                  ))}
                </div>

                <div className="mt-5 flex justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowQR(true)}
                    className="relative rounded-full px-6 py-2.5 font-mono text-xs tracking-wider border-primary/30 text-primary hover:bg-primary/5 overflow-hidden group"
                  >
                    <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'conic-gradient(from 0deg, hsl(var(--primary)), #a78bfa, #38bdf8, hsl(var(--primary)))',
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'exclude',
                        WebkitMaskComposite: 'xor',
                        padding: '1.5px',
                      }}
                    />
                    <ScanLine size={14} className="mr-2" />
                    扫码添加好友~
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <QRModal open={showQR} onClose={() => setShowQR(false)} />
    </>
  );
};
