import { Footer } from '../../components/footers/home-footer';
import { NavBar } from '../../components/navbars/home-nav-bar';
import { AboutSection } from './AboutSection';
import { CTASection } from './CTASection';
import { ContactSection } from './ContactSection';
import { HeroSection } from './HeroSection';
import { TeamSection } from './TeamSection';

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
  