import './App.css';
import { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import { MovieLoader } from './components/Loader';
import { routes } from './services/routes';

const HomeView = lazy(() => import('./views/HomeView') /* webpackChunkName: "home-view" */);
const SearchMovies = lazy(() => import('./views/SearchMovies') /* webpackChunkName: "search-movies" */);
const MovieDetailsView = lazy(() => import('./views/MovieDetailsView') /* webpackChunkName: "movie-details-view" */);
const NotFoundView = lazy(() => import('./views/NotFoundView') /* webpackChunkName: "not-found-view" */);


export const App = () => (
  <>
    <Header />
    <Suspense fallback={<MovieLoader />}>
    <Switch>
    <Route exact path={routes.home} component={HomeView} />
    <Route path={routes.movie} component={MovieDetailsView} />
    <Route path={routes.search} component={SearchMovies} />
    <Route component={NotFoundView} />
    </Switch>
    </Suspense>
  </>
);

export default App;
