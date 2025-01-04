import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="w-full bg-pink-50 px-[10%] md:px-[5%]">
      <div className="container flex flex-col-reverse gap-8 py-12 md:flex-row md:items-center md:py-16">
        <div className="flex flex-col items-center gap-4 text-center md:w-1/2 md:items-start md:text-left">
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            Захиалгат хувцас,
            <br />
            Дэгжин байдал
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-lg">
            Ажлын хувцасны гол үүргийг нэг цогцоор шийдэж өгч мөн өнгөтэй
            үзэмжтэй загварыг санал болгож байна
          </p>
          <div className="mt-4">
            <Link href="/order">
              <Button>Захиалах өгөх</Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <Image
            src="https://ytnv6xxemstkzalq.public.blob.vercel-storage.com/shilmel-hero-qD9HhWQe6EdToFD6MqplXiD1Tlyiy0"
            alt="Collection of safety wear and fashion items"
            width={600}
            height={600}
            className="mx-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
