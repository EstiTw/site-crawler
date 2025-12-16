import { Routes, Route, useNavigate } from 'react-router-dom';
import { WebsiteSelector } from './components/WebsiteSelector';
import { LoginForm } from './components/LoginForm';
import { DealsList } from './components/DealsList';
import { FilesList } from './components/FilesList';
import { useDeals } from './hooks/useDeals';

export default function App() {
  const navigate = useNavigate();
  const { setWebsite, logout } = useDeals();

  return (
    <Routes>
      <Route path="/" element={<WebsiteSelector onSelect={(s) => {
        setWebsite(s);
        navigate('/login');
      }} />} />
      <Route path="/login" element={<LoginForm onLoginSuccess={() => navigate('/deals')} onBack={() => navigate('/')} />} />
      <Route path="/deals" element={<DealsList onSelectDeal={(id) => navigate(`/deals/${id}/files`)} onLogout={() => {
        logout();
        navigate('/');
      }} />} />
      <Route path="/deals/:dealId/files" element={<FilesList onBack={() => navigate('/deals')} />} />
    </Routes>
  );
}
