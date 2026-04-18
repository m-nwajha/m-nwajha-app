import LeftHero from '../molecules/LeftHero';
import RightHero from '../molecules/RightHero';
import { Container, Grid } from '../ui';
import { HERO_DATA } from '@/constants/hero';
const Hero = () => {
  return (
    <section id='hero' className='flex flex-col justify-center py-[6rem] lg:h-screen overflow-hidden relative'>
      {/* Glowing blobs in background */}
      <div className='absolute w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[120px] top-[-100px] left-[-100px] pointer-events-none' />
      <div className='absolute w-[400px] h-[400px] rounded-full bg-secondary/8 blur-[100px] bottom-[-80px] right-[-80px] pointer-events-none' />

      <Container>
        <Grid sm={1} md={1} lg={1} gap={9} textAlign='center' alignItem='center' className='xl:grid-cols-2'>
          <LeftHero
            title={HERO_DATA.title || ''}
            description={HERO_DATA.description || ''}
            buttonA={HERO_DATA.buttonA}
            buttonB={HERO_DATA.buttonB} />
          <RightHero />
        </Grid>
      </Container>
    </section>
  );
};

export default Hero;