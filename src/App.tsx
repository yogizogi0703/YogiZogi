import Main from './views/Main';
import Payment from './views/Payment';
import ReservationConfirm from './views/ReservationConfirm';
import SearchResult from './views/SearchResult';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import PageNotFound from './views/PageNotFound';
import Layout from './components/common/Layout';
import { HashRouter, Route, Routes } from 'react-router-dom';
import AccommodationDetail from './views/AccommodationDetail';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/searchResult" element={<SearchResult />} />
          <Route
            path="/accommodation/:id"
            element={<AccommodationDetail />}
          />
          <Route path="/reservationConfirm" element={<ReservationConfirm />} />
          <Route path="/payment/:book" element={<Payment />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;