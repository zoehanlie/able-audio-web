import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Reveal from './Reveal';

export default function Lifestyle() {
  const t = useTranslations('life');
  return (
    <section className="section" id="living" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className="life">
          <Image src="/images/room.jpg" alt="Electrostatic speakers in a modern living room" fill sizes="(max-width:980px) 100vw, 1200px" style={{ objectFit: 'cover' }} />
          <div className="ov" />
          <div className="life-copy">
            <div className="sec-tag">{t('tag')}</div>
            <h2>{t('h')}</h2>
            <p>{t('p')}</p>
            <div className="life-tags"><span>{t('t1')}</span><span>{t('t2')}</span><span>{t('t3')}</span></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
