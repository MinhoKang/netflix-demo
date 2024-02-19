import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import MoviePage from './pages/Movies/MoviePage';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import NotFoundPage from './pages/NotFountPage/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path="movies">
            <Route index element={<MoviePage />} />
            <Route path=":id" element={<MovieDetail />}></Route>
          </Route>
          {/* <Route path='/movies' element={<MoviePage/>}/>
          <Route path='/movies/:id' element={<MovieDetail/>}/> */}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Container>
  );
}

export default App;

const Container = styled.div`
  background-color: black;
  /* height: 100vh; */
  color: white;
`;
