const ReviewMain = ({ item }) => {
  return (
    <div className="mb-10">
      <div className="flex justify-between">
        <h1 className='text-4xl font-semibold mb-2'>{item.title}</h1>
        {item.status !== 'Chấp nhận' &&
        <div className={`${item.status === 'Chờ duyệt' ? "text-yellow-400" : "text-red-400"} text-lg font-semibold`}>{item.status}</div>
        }
      </div>
      <h3 className='font-semibold mb-2'>Sách {item.book_name} - Tác giả: {item.book_author}</h3>
      <div className="flex items-center gap-3 mb-6">
        <img
          className="w-6 h-6 rounded-full object-cover shadow"
          src={item.avatar_url}
          alt="Reviewer's avatar"
        />
        <p className="text-sm text-gray-500">
          Reviewer: <span className='text-gray-950 font-semibold'>{item.student_name}</span> - {new Date(item.submit_date).toLocaleDateString('en-GB')}
        </p>
      </div>
      <p className="text-base text-slate-950 mb-6">{item.summary}</p>
      <img
        src={item.image_url}
        alt="Book Reviewed"
        className='mx-auto mb-6'
      />
      <p className="text-base text-slate-950">{item.content}</p>
    </div>
  );
};

export default ReviewMain;