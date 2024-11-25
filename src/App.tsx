import { Routes, Route } from 'react-router-dom';
import WelcomeView from './views/WelcomeView';
import CreateView from './views/CreateView';
import PlaneView from './views/PlaneView';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<WelcomeView />} />
          <Route path="create" element={<CreateView />} />
          <Route path=":id" element={<PlaneView />} />
        </Route>
      </Routes>
    </>
  );
}
