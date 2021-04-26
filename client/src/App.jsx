import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import User from './pages/User';
import PagesWrapper from './components/PagesWrapper';
import Footer from './components/Footer';
import Header from './components/Header';

import UserContextProvider from './contexts/UserContext';
import PostsContextProvider from './contexts/PostsContext';
import CommentsContextProvider from './contexts/CommentsContext';
import SearchContextProvider from './contexts/SearchContext';

function App() {
  return (
    <Router>
      <UserContextProvider>
        <PostsContextProvider>
          <CommentsContextProvider>
            <SearchContextProvider>
              <Header />
              <Switch>
                <Route
                  path="/"
                  exact
                  render={() => (
                    <PagesWrapper>
                      <Home />
                    </PagesWrapper>
                  )}
                />
                <Route path="/login" render={() => <LogIn />} />
                <Route path="/signup" render={() => <SignUp />} />
                <Route
                  path="/user"
                  render={() => (
                    <PagesWrapper>
                      <User />
                    </PagesWrapper>
                  )}
                />
              </Switch>
            </SearchContextProvider>
          </CommentsContextProvider>
        </PostsContextProvider>
      </UserContextProvider>
      <Footer />
    </Router>
  );
}

export default App;
