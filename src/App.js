import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route } from 'react-router-dom';
import signup from './page/register';
import mainpage from './page/mainpage';
import Rfgpage from './page/rfgpage';
import Header from './page/header';
import Profile from './page/category/profile';
import introduce from './page/category/introduce';
import Noticepage from './page/category/noticepage';
import Recipe from './page/recipe';
import Login from "./page/login";
import Admin from "./page/admin";
import Myigd from "./components/mypage/igd/igdmanage";
import Likeit from './components/mypage/like/likeit';
import Mywrite from './components/mypage/mywrite/mywrite';

const App = () => {
  const [this_header_set_inputs, setthis_header_set_inputs] = useState({ id: "", pwd: "" });
  const [information, setinformation] = useState()
  const [page, setpage] = useState(false)
  useEffect(() => {
    console.log(information)
  }, [information])
  return (
    <div className="main-form">
      <Router>
        <Route render={({ location, history, render }) => (
          <React.Fragment>
            <Header information={information} location={location} page={page} setpage={setpage} information={information} setinformation={setinformation} this_header_set_inputs={this_header_set_inputs} setthis_header_set_inputs={setthis_header_set_inputs} history={history} />
            <Route exact path="/" this_header_set_inputs={this_header_set_inputs} setthis_header_set_inputs={setthis_header_set_inputs} component={mainpage} />
            {/* 라우트에서는 ? 따로 명시 안해줘도 자동으로 히스토리가 전달되서 사인업으로 가  */}
            <Route path="/rfgpage" component={Rfgpage}  >
              <Rfgpage information={information} history={history} ></Rfgpage>
            </Route>
            <Route path="/signup" component={signup} />
            <Route path="/login" component={Login} >
              <Login setpage={setpage} history={history} information={information} setinformation={setinformation}></Login>
            </Route>
            <Route exact path="/recipe/:id" component={Recipe} >
              <Recipe location={location} information={information} ></Recipe>
            </Route>
            <Route path="/profile" exact component={Profile} >
            </Route>
            <Route path="/introduce" component={introduce} />
            <Route path="/noticepage" component={Noticepage} >
              <Noticepage history={history} information={information} />
            </Route>
            <Route path="/admin" exact component={Admin} />
            <Route path="/my_igd" exact component={Myigd}>
              <Myigd history={history} information={information} />
            </Route>
            <Route path="/like" exact component={Likeit}>
              <Likeit history={history} information={information} />
            </Route>
            <Route path="/my_write" exact component={Mywrite}>
              <Mywrite history={history} information={information} />
            </Route>
          </React.Fragment>
        )}
        />
      </Router>
    </div >
  )
}

export default App;