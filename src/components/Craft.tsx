import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Reveal from './Reveal';

export default function Craft() {
  const t = useTranslations('craft');
  return (
    <section className="section craft" id="craft">
      <div className="wrap">
        <Reveal className="sec-head-row">
          <div>
            <div className="sec-tag">{t('tag')}</div>
            <h2 className="sec-title">{t('title')}</h2>
          </div>
          <p>{t('p')}</p>
        </Reveal>
        <div className="craft-grid">
          <Reveal><div className="craft-card">
            <Image src="/images/craft2.png" alt="James R. Peterson" fill sizes="(max-width:980px) 100vw, 600px" style={{ objectFit: 'cover' }} />
            <div className="cov" />
            <div className="cc">
              <div className="role">{t('role1')}</div>
              <h3>{t('name1')}</h3><p>{t('bio1')}</p>
            </div>
          </div></Reveal>
          <Reveal><div className="craft-card">
            <Image src="/images/craft1.jpg" alt="Mr. Tang" fill sizes="(max-width:980px) 100vw, 600px" style={{ objectFit: 'cover' }} />
            <div className="cov" />
            <div className="cc">
              <div className="role">{t('role2')}</div>
              <h3>{t('name2')}</h3><p>{t('bio2')}</p>
            </div>
          </div></Reveal>
        </div>
      </div>
    </section>
  );
}
