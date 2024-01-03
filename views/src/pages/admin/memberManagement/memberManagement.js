/*
    trang quản lý thông tin thành viên, bao gồm danh sách tất cả các thành viên
    khi click vào sẽ hiện ra trang cá nhân của thành viên đó
    trong trang cá nhân của thành viên/ trong danh sách của thành viên có thể thực hiện thay đổi quyền: từ admin<->member hoặc thay đổi trạng thái active<->blocked

*/
import React, { useEffect, useState } from "react";
import axios from "axios";

// const people = [
//     {
//       name: 'Leslie Alexander',
//       email: 'leslie.alexander@example.com',
//       role: 'admin',
//       imageUrl:
//         'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
     
//     },
//     {
//       name: 'Michael Foster',
//       email: 'michael.foster@example.com',
//       role: 'thành viên',
//       imageUrl:
//         'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      
//     },
//     {
//       name: 'Dries Vincent',
//       email: 'dries.vincent@example.com',
//       role: 'thành viên',
//       imageUrl:
//         'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      
//     },
//     {
//       name: 'Lindsay Walton',
//       email: 'lindsay.walton@example.com',
//       role: 'thành viên',
//       imageUrl:
//         'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
     
//     },
//     {
//       name: 'Courtney Henry',
//       email: 'courtney.henry@example.com',
//       role: 'thành viên',
//       imageUrl:
//         'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
     
//     },
//     {
//       name: 'Tom Cook',
//       email: 'tom.cook@example.com',
//       role: 'thành viên',
//       imageUrl:
//         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
     
//     },
//   ]
  
  export default function MemberManagement() {

    const [people, setPeople] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
      axios.get("http://localhost:8080/api/userManagement")
      .then((response) => {
        if (response.status === 200 && 'userList' in response.data) {
          setPeople(JSON.parse(response.data.userList));
        }
      })
      .catch((error) => {
        console.error("Error!!!!!!", error);
      });
    }, [reload]);

    const block = (id, value) => {
      axios.get("http://localhost:8080/api/userManagement/block", {params: {id: id, value: value}})
      .then((response) => {
        setReload(prevReload => prevReload + 1);
        if (response.status === 200 && response.data.code === 300) {
          //block/unblock thành công
        }
      })
      .catch((error) => {
        console.error("Error!!!!!!", error);
      });
    };

    const changeRole = (role, id) => {
      axios.get("http://localhost:8080/api/userManagement/permission", {params: {id: id, role: role}})
      .then((response) =>{
        if (response.status === 200 && response.data.code === 300){
          //thay đổi quyền thành công
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error!!!!!!", error);
      });
    };

    return (
        <div className="flex flex-grow justify-center">
            <ul role="list" className="divide-y divide-gray-100 w-full sm:mx-20">
        {people.map((person) => (
          <li key={person.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.avatar_url} alt="" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{person.student_name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                <p className="text-sm leading-6 text-gray-900">{person.permission}</p>
                <p className="text-sm leading-6 text-gray-900">{person.state}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-row sm:items-end">
              
                <button
                  type="button"
                  className="text-white rounded-xl bg-red-700 py-2 px-4 mr-5 hover:bg-darkred font-bold"
                  onClick={()=>block(person.student_id, 1)}
                >
                  Block
                </button>

                <button
                  type="button"
                  className="bg-emerald-600 rounded-xl hover:bg-emerald-700 text-white font-bold py-2 px-4 "
                  onClick={()=>block(person.student_id, 0)}
                >
                  Unblock
                </button>   
            </div>
          </li>
        ))}
      </ul>
        </div>
      
    )
  }
  