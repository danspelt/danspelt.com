'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function HeroImage() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const reduce = prefersReducedMotion();
  const heroImage =
    mounted && resolvedTheme === 'dark'
      ? { src: '/images/dan-night.png', width: 1086, height: 1448 }
      : { src: '/images/dan.jpeg', width: 2048, height: 2560 };

  return (
    <motion.div
      initial={reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      whileHover={reduce ? undefined : { scale: 1.02 }}
      className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md"
    >
      <div
        className="float-3d relative w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-secondary-foreground/10 dark:ring-primary/20"
        style={{ aspectRatio: `${heroImage.width} / ${heroImage.height}` }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={heroImage.src}
            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={heroImage.src}
              alt="Dan Spelt"
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 420px"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
