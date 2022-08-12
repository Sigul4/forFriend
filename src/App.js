import { createBrowserHistory }         from "history";
import { connect, Provider }            from "react-redux";
import { Route, Router }                from 'react-router-dom';
import actionAllPosts                   from "./actions/actionAllPosts.js";
import actionAuthLogout                 from './actions/actionAuthLogout.js'
import actionFollow                     from "./actions/actionFollow.js";
import actionUnfollow                     from "./actions/actionUnfollow.js";
import actionFullLogin                  from "./actions/actionFullLogin";
import actionFullRegister               from "./actions/actionFullRegister.js";
import actionProfileInf                 from "./actions/actionProfileInf.js";
import actionProfilePosts               from "./actions/actionProfilePosts.js";
import actionAddLike                    from "./actions/actionAddLike.js";
import actionRemoveLike                 from "./actions/actionRemoveLike.js";
import "./App.css";           
import ContentPage                      from "./components/ContentPage";
import Header                           from "./components/Header.js";
import LoginPage                        from "./components/LoginForm.js";
import RegisterPage                     from "./components/RegisterForm.js";
import UserPage                         from './components/UserDataPage.js';
import store                            from "./data/store"; 
import history                          from "./data/history.js";    

// export const history = createBrowserHistory()
// if((history.location.pathname !== '/login' || history.location.pathname !== '/register') && localStorage.length === 0){
//   history.push("/content")
// }

const CLoginCategory    = connect(null,     {onLogin: actionFullLogin})       (LoginPage)
const CRegisterCategory = connect(null,     {onLogin: actionFullRegister})    (RegisterPage)
const CHeader           = connect(state => ({userNick: state?.auth?.payload?.sub?.acl[1], userId:state?.auth?.payload?.sub?.id}),{Logout: actionAuthLogout}) (Header)
const CProfilePage      = connect(state => ({props: state?.promise?.ProfileInf?.payload, posts: state?.promise?.ProfilePosts?.payload, aboutMe: state?.promise?.aboutMe?.payload }), {onLoadUserInf: actionProfileInf, onLoadUserPosts:actionProfilePosts, postLike:actionAddLike, postUnlike:actionRemoveLike, onFollow: actionFollow, onUnfollow: actionUnfollow})(UserPage)
const CPostsPage        = connect(state => ({Post: state?.promise?.AllPosts?.payload, aboutMe: state?.promise?.aboutMe?.payload}), {onPostLoad: actionAllPosts, postLike:actionAddLike, postUnlike:actionRemoveLike}) (ContentPage)

const Content = () =>
<div className='Content' style={{paddingTop: "63px"}} >
  <Route path="/register"      component={CRegisterCategory} /> 
  <Route path="/login"         component={CLoginCategory} /> 
  <Route path="/content"       component={CPostsPage} /> 
  <Route path="/profile/:_id"  component={CProfilePage} /> 
</div>


const App = () =>
    <Router history={history}>
      <Provider store={store}>
        <div className="App">
          <CHeader />
          <Content/>
        </div>
      </Provider>
    </Router>

export default App
