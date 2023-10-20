import { Footer } from '@components/Footers/Home';
import { NavBar } from '@components/NavBar/Home';
import { Home_AboutSection } from '@views/Home/About';
import { Home_CTASection } from '@views/Home/CTA';
import { Home_ContactSection } from '@views/Home/Contact';
import { Home_HeroSection } from '@views/Home/Hero';
import { Home_TeamSection } from '@views/Home/Team';

export const Home = () => {
    return (
        <>
            <NavBar/>
            <Home_HeroSection/>
            <Home_AboutSection/>
            <Home_TeamSection/>
            <Home_ContactSection/>
            <Home_CTASection/>
            <Footer/>
        </>
    )
}
  