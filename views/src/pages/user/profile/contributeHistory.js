import { useState } from 'react';

const ContributionHistory = () => {
  const [contributions, setContributions] = useState([
    { id: 1, bookName: 'Sách A', date: '2023-12-01' },
    { id: 2, bookName: 'Sách B', date: '2023-12-05' },
    { id: 3, bookName: 'Sách C', date: '2023-12-10' },
    // Add more contributions as needed
  ]);

  const handleDetailClick = (id) => {
    // Xử lý khi nút chi tiết được nhấn, có thể chuyển hướng đến trang chi tiết hoặc hiển thị thông tin chi tiết
    console.log(`Xem chi tiết cho quyên góp có ID ${id}`);
  };

  return (
    <div className="flex-grow flex-col items-center justify-center pl-4 pr-4 md:pl-40 md:pr-40 lg:pl-60 lg:60">
      <h1 className="text-3xl font-bold mb-6 flex justify-center text-blue-500 pt-10">Lịch sử quyên góp</h1>
      <div className="flex flex-col justify-center py-4">
        {contributions.map((contribution) => (
          <div key={contribution.id} className="flex items-center border-b border-gray-200 justify-between py-4 px-1">
            <div className="flex flex-col">
              <div className="sm:text-lg font-bold text-blue-500">{contribution.bookName}</div>
              <div className="text-gray-400">Ngày quyên góp : {contribution.date}</div>
            </div>
            <div>
              <button
                onClick={() => handleDetailClick(contribution.id)}
                className="border rounded bg-blue-400 p-2 hover:bg-medium text-white"
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContributionHistory;
