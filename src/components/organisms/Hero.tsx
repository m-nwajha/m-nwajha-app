import LeftHero from '../molecules/LeftHero';
import RightHero from '../molecules/RightHero';
import { Container, Grid } from '../ui';
import { HERO_DATA } from '@/constants/hero';
const Hero = () => {
  return (
    <section id='hero' className='flex flex-col justify-center py-[6rem] lg:h-screen'>
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