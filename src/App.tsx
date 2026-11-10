import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/nucleus/hooks/useAuth';
import { LoginPage } from './components/nucleus/pages/login/LoginPage';
import { DashboardPage } from './components/nucleus/pages/dashboard/DashboardPage';
import { Upgrade } from './components/nucleus/component/dashboard/UpgradeDashboard';
import { CompetitivePlayground } from './components/nucleus/component/playground/CompetitivePlayground';
import { HomePage } from './components/nucleus/pages/home/HomePage';
import { OverviewPage } from './components/nucleus/pages/overview/OverviewPage';
import { SignPage } from './components/nucleus/pages/login/SignPage';
import { EditorPage } from './components/nucleus/pages/editor/EditorPage';
import { OAuthCallback } from './components/nucleus/pages/login/OAuthCallback';
import './index.css';



function ProtectedRoute({ children }: {children: React.ReactNode}) {
    const { isAuthenticated } = useAuth();
    console.log('ProtectedRoute: isAuthenticated =', isAuthenticated);
    return isAuthenticated ? <> {children} </> : <Navigate to="/login" replace />
}


function Home() {
    
    return(
        <>
        <HomePage />
        </>
        );
}


export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element= {<LoginPage />} />
                    <Route path="/signup" element= {<SignPage />} />
                    <Route path="/upgrade" element= {<Upgrade />} />
                    <Route path="/overview" element= {<OverviewPage />} />
                    <Route path="/editor/:projectId" element={<EditorPage />} />
                    <Route path="/default" element= {<CompetitivePlayground />} />
                    <Route path="/dashboard" element= {<DashboardPage />} />
                    <Route path="/oauth-callback" element={<OAuthCallback />} />
                    <Route path="/home" element= { <ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
        );
}
