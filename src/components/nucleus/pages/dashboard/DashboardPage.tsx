import { Header } from '../../component/dashboard/HeaderDashboard';
import { Centre } from '../../component/dashboard/CentreDashboard';
import { Footer } from '../../component/dashboard/FooterDashboard';
import { Feature } from '../../component/dashboard/FeatureDashboard';
import { Templates } from '../../component/dashboard/TemplateDashboard';
import { Testimonials } from '../../component/dashboard/TestimonialsDashboard';
import { Testimonials1 } from '../../component/dashboard/Testimonials1Dashboard';
import { CompanyCarousel } from '../../component/dashboard/CompanyCarouselDashboard';
import './DashboardPage.css';


export function DashboardPage() {
    return(
            <>
              <Header />
              <Centre />
              <CompanyCarousel />
              <Feature />
              <Templates />
              <Testimonials />
              <Testimonials1 />
              <Footer />
            </>
        );
}