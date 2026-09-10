import Image from 'next/image';

export default function HeroImage() {
  return (
    <div className="hero-image-in mx-auto w-full max-w-xs sm:max-w-sm">
      <div
        className="float-3d relative w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-secondary-foreground/10 dark:ring-primary/20"
        style={{ aspectRatio: '2048 / 2560' }}
      >
        <Image
          src="/images/dan.jpeg"
          alt="Dan Spelt, full-stack custom software developer in Victoria, BC"
          fill
          priority
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 384px, 448px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
