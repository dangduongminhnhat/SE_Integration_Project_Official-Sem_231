import './App.css';
//import ReactDOM from "react-dom/client";
//import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from "react-router-dom";
// import $ from 'jquery';
// import Popper from 'popper.js';
// import Header from './components/shared/header'
// import Homepage from './components/homepage/homepage';
// import EventPost from './components/feed/eventPost/post';
// import Review_List from './components/feed/reviewPost/review';
// import Document_List from './components/library/document_list';
// import Book_Borrow from './components/book_borrow/book_borrow';
// import Borrow_Management from './components/book_borrow/borrow_management';
// import DocDetail from "./components/library/document_detail";
// import Profile from './components/profile/profile';
// import NoPage from './components/nopage/nopage';
// import ReviewHistoryList from './components/profile/reviewHistoryList';
// import ReviewDetail from './components/profile/reviewDetail';
// import SignIn from './components/signin/signin'
// import axios from 'axios'
// import Book_Borrow_Management from './components/admin/book_borrow_management/book_borrow_management';
// import PrivateRoutes from './components/shared/private_routes';
// import ProtectedTest from './components/(test_only)protected_test/protected_test';
// import PublicTest from './components/(test_only)public_test/public_test';
// import SignUp from './components/signup/signup';
// import Member_Management from './components/admin/member_management/member_management';
// import TestHeader from './component/test';
import { BrowserRouter } from 'react-router-dom';
import Router from './component/Routes/router';

function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<TestHeader />}>
    //     <Route index element={<Homepage />} />
    //     <Route path='signin' element={<SignIn />} />
    //     <Route path='signup' element={<SignUp />} />
    //     <Route path='publicTest' element={<PublicTest />} />
    //     <Route element={<PrivateRoutes validatePermission={"admin"} />} >
    //       <Route path='protectedTest' element={<ProtectedTest />} />
    //     </Route>
    //     <Route path='feed'>
    //       <Route path='event' element={<EventPost />}></Route>
    //       <Route path='review' element={<Review_List />}></Route>
    //     </Route>
    //     <Route path="library" >
    //       <Route index element={<Document_List />} />
    //       <Route path="documentDetail/:document_id" element={<DocDetail />} />
    //     </Route>
    //     <Route path="bookBorrow" >
    //       <Route index element={<Book_Borrow />} />
    //       <Route path='borrowManagement' element={<Borrow_Management />} />
    //     </Route>
    //     <Route path='my'>
    //       <Route index element={<Profile />} />
    //       <Route path='post/reviewHistory'>
    //         <Route index element={<ReviewHistoryList />} />
    //         <Route path='reviewDetail/:review_id' element={<ReviewDetail />}></Route>
    //       </Route>
    //     </Route>
    //     <Route path='documentManagement'>
    //       <Route path='loan' element={<Book_Borrow_Management/>}/>
    //     </Route>
    //     <Route path='memberManagement' element={<Member_Management />}/>
    //     <Route path="*" element={<NoPage />} />
    //   </Route>
    // </Routes>
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
  );
}

export default App;

