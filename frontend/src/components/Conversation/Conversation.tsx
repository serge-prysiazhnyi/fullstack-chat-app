export const Conversation = () => {
  return (
    <>
      <div className="flex gap-2 items-center hover:bg-sky-500 hover:text-white rounded p-2 py-1 cursor-pointer">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user2-512.png"
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <p className="font-bold text-gray-800">John Smith</p>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1" />
    </>
  );
};
