import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="https://zupimages.net/up/26/06/jfix.png"
      alt="ORIVIO Logo"
      width={140}
      height={30}
      className={className}
      priority
    />
  );
}
