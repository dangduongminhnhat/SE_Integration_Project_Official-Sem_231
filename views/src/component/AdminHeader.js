import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoSIMBSC from "../img/SIMBSCLogo.png";
import Cookies from "universal-cookie";

export default function AdminHeader() {
  const [user, setUser] = useState(null);
  const [dropDownEM, setDropDownEM] = useState(false);
  const [dropDownDM, setDropDownDM] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const cookies = new Cookies();
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = cookies.get('TOKEN');
    const info = cookies.get('info');
    if (!token || !info) {
      setUser(null);
      cookies.remove('TOKEN', { path: '/' });
      cookies.remove('info', { path: '/' });
      window.location.assign('/');
    }
    else if (info?.permission === 'Cộng tác viên') {
      navigate('/403');
    }
    else {
      setUser(info);
    }
  }, []);
  
  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
    setDropDownDM(false);
    setDropDownEM(false);
  };
  
  const handleToggleDropDownDM = () => {
    setDropDownDM(!dropDownDM);
    setDropdownOpen(false);
    setDropDownEM(false);
  };
  
  const handleToggleDropDownEM = () => {
    setDropDownEM(!dropDownEM);
    setDropdownOpen(false);
    setDropDownDM(false);
  };

  const handleClick = () => {
    setDropDownEM(false);
    setDropdownOpen(false);
    setDropDownDM(false);
  }
  
  const handleSignOut = (e) => {
    if (user === null) {
      alert('Có lỗi xảy ra!');
      window.location.assign("/");
      return;
    }
    cookies.remove('TOKEN', { path: "/" });
    cookies.remove('info', { path: "/" });
    setUser(null);
    window.location.assign('/');
  };
  
  return (
    <header>
      <nav className="bg-white px-4 lg:px-6 py-2.5 border-b-2 border-primary-100">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex">
            <Link to="/admin" className="flex items-center">
              <img
                src={LogoSIMBSC}
                className="mr-3 h-10 sm:h-9"
                alt="SIMBSC Logo"
              />
            </Link>
            <div className="justify-between items-center flex w-auto ml-2">
              <ul className="flex font-medium flex-row space-x-8 mt-0">
                <li>
                  <button
                    type="button"
                    className="block p-0 text-gray-700 border-gray-100 hover:bg-transparent border-0 hover:text-primary-700"
                    onClick={handleToggleDropDownEM}
                  >
                    Quản lý sự kiện
                  </button>
                  {dropDownEM && (
                    <ul className="absolute mt-2 bg-white border rounded border-gray-300 shadow-md z-10">
                      <li onClick={handleClick}>
                        <Link
                          to="/admin/event-management"
                          className="block px-4 py-1 text-gray-800 border-gray-100 hover:bg-transparent border-0 hover:text-primary-700"
                        >
                          Hoạt động
                        </Link>
                      </li>
                      <li onClick={handleClick}>
                        <Link
                          to="/admin/forum-management"
                          className="block px-4 py-1 text-gray-800 border-gray-100 hover:bg-transparent border-0 hover:text-primary-700"
                        >
                          Diễn đàn
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <button
                    type="button"
                    className="block p-0 text-gray-700 border-gray-100 hover:bg-transparent border-0 hover:text-primary-700"
                    onClick={handleToggleDropDownDM}
                  >
                    Quản lý tài liệu
                  </button>
                  {dropDownDM && (
                    <ul className="absolute mt-2 bg-white border rounded border-gray-300 shadow-md z-10">
                      <li onClick={handleClick}>
                        <Link
                          to="/admin/loan-management"
                          className="block px-4 py-1 text-gray-800 border-gray-100 hover:bg-transparent border-0 hover:text-primary-700"
                        >
                          Mượn sách
                        </Link>
                      </li>
                      <li onClick={handleClick}>
                        <Link
                          to="/admin/library-management"
                          className="block px-4 py-1 text-gray-800 border-gray-100 hover:bg-transparent border-0 hover:text-primary-700"
                        >
                          Thư viện
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <Link
                    to="/admin/member-management"
                    className="block p-0 text-gray-700 border-gray-100 hover:bg-transparent border-0 hover:text-primary-700"
                  >
                    Quản lý thành viên
                  </Link>
                </li>
                {user !== null && (
                <li className="group">
                  <button
                    className="block p-0 text-gray-700 border-gray-100 hover:bg-transparent border-0 hover:text-primary-700"
                    onClick={handleToggleDropdown}
                  >
                    Tài khoản
                  </button>
                  {isDropdownOpen && (
                    <ul className="absolute mt-2 bg-white border rounded border-gray-300 shadow-md ">
                      <li onClick={handleClick}>
                        <Link
                          to="/admin/profile"
                          className="block px-4 py-1 text-gray-800 border-gray-100 hover:bg-transparent border-0 hover:text-primary-700"
                        >
                          Thông tin cá nhân
                        </Link>
                      </li>
                      <li onClick={handleClick}>
                        <Link
                          to="/"
                          className="block px-4 py-1 text-gray-800 border-gray-100 hover:bg-transparent border-0 hover:text-primary-700"
                        >
                          Chế độ cộng tác viên
                        </Link>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="block px-4 py-1 text-gray-800 border-gray-100 hover:bg-transparent border-0 hover:text-primary-700"
                          onClick={handleSignOut}
                        >
                          Đăng xuất
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
                )}
              </ul>
            </div>
          </div>
          {user === null && (
          <div className="flex items-center">
            <Link
              to="/sign-in"
              className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 focus:outline-none"
            >
              Đăng nhập
            </Link>
            <Link
              to="/sign-up"
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 focus:outline-none"
            >
              Đăng ký
            </Link>
          </div>
          )}
        </div>
      </nav>
    </header>
  );
}