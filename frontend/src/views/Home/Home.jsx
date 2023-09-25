import { Footer } from '@components/Footers/Footer.Home';
import { NavBar } from '@components/NavBar/NavBar.Home';
import { Home_AboutSection } from '@views/Home/Home.About';
import { Home_CTASection } from '@views/Home/Home.CTA';
import { Home_ContactSection } from '@views/Home/Home.Contact';
import { Home_HeroSection } from '@views/Home/Home.Hero';
import { Home_TeamSection } from '@views/Home/Home.Team';

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
  