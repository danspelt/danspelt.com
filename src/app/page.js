'use client';
import IntroVideo from '@/components/IntroVideo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HomeClient from './HomeClient';

export const dynamic = 'force-dynamic';

export default function Home() {
  return <HomeClient />;
}
