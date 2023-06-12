import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AccommodationDetail from './views/AccommodationDetail';
import Main from './views/Main';
import Payment from './views/Payment';
import ReservationConfirm from './views/ReservationConfirm';
import SearchResult from './views/SearchResult';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import PageNotFound from './views/PageNotFound';
import Layout from './components/common/Layout';

function App() {
  const baseURL = 'FE'
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={`/${baseURL}`} element={<Main />} />
          <Route path={`/${baseURL}/signIn`} element={<SignIn />} />
          <Route path={`/${baseURL}/signUp`} element={<SignUp />} />
          <Route path={`/${baseURL}/searchResult`} element={<SearchResult />} />
          <Route
            path={`/${baseURL}/accommodationDetail`}
            element={<AccommodationDetail />}
          />
          <Route path={`/${baseURL}/reservationConfirm`} element={<ReservationConfirm />} />
          <Route path={`/${baseURL}/payment`} element={<Payment />} />
          <Route path={`/${baseURL}/*`} element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
