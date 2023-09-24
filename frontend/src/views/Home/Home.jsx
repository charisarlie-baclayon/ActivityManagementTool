import { Footer } from '@components/Footers/Footer.Home';
import { NavBar } from '@components/NavBar/NavBar.Home';
import { AboutSection } from '@views/Home/Home.About';
import { CTASection } from '@views/Home/Home.CTA';
import { ContactSection } from '@views/Home/Home.Contact';
import { HeroSection } from '@views/Home/Home.Hero';
import { TeamSection } from '@views/Home/Home.Team';

export const Home = () => {
    return (
        <>
            <NavBar/>
            <HeroSection/>
            <AboutSection/>
            <TeamSection/>
            <ContactSection/>
            <CTASection/>
            <Footer/>
        </>
    )
}
  