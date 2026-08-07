import { Header } from '../../component/header/Header';
import './Dashboard.css';


export function DashboardPage() {
    return(
            <>
              <Header />

              <main className="header-page">
                <div className="header-page-container">
                  <h1 className="page-title">Dashboard</h1>

                  <div className="page-content">
                    "Hello"
                  </div>
                </div>
              </main>
            </>
        );
}