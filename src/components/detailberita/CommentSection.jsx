import { useState } from 'react';

export default function CommentSection() {
  const [commentText, setCommentText] = useState("");
  const [localComments, setLocalComments] = useState([]);

  const handleSendComment = () => {
    if (commentText.trim() === "") return;
    const newComment = {
      id: Date.now(),
      name: "Pengguna Baru",
      text: commentText,
      date: "Baru saja",
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
    };
    setLocalComments([newComment, ...localComments]);
    setCommentText("");
  };

  return (
    <section className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-8 bg-[#007BFF]"></div>
        <h2 className="text-2xl font-black text-slate-900">Komentar</h2>
      </div>

      {/* Input Box */}
      <div className="bg-white border border-slate-100 rounded-[1.5rem] p-6 mb-10 shadow-sm">
        <div className="flex gap-4 mb-4">
          <img src="https://i.pravatar.cc/150?u=me" className="w-12 h-12 rounded-full object-cover bg-slate-100" alt="User" />
          <div className="flex-1 relative">
            <textarea 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Apa yang ingin anda tanyakan?"
              className="w-full p-4 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#007BFF] transition-all resize-none h-32 text-sm text-slate-600"
            />
            <span className="absolute bottom-3 right-4 text-[10px] text-slate-400 font-medium italic">{commentText.length}/500</span>
          </div>
        </div>
        <button onClick={handleSendComment} className="bg-[#007BFF] text-white px-10 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-600 transition-all shadow-md shadow-blue-100">
          Kirim
        </button>
      </div>

      {/* List Komentar */}
      <div className="space-y-10">
        {localComments.map(comment => (
          <div key={comment.id} className="flex gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
            <img src={comment.avatar} className="w-12 h-12 rounded-full object-cover shadow-sm" alt="User" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-tight">{comment.name}</h4>
                <span className="text-[11px] text-slate-400 font-medium">• {comment.date}</span>
              </div>
              <p className="text-slate-600 text-[15px] leading-relaxed mb-3">{comment.text}</p>
              <button className="text-[#007BFF] text-xs font-bold hover:underline">Balas</button>
            </div>
          </div>
        ))}

        <div className="flex gap-4">
          <img src="https://i.pravatar.cc/150?u=ujang" className="w-12 h-12 rounded-full object-cover shadow-sm" alt="Ujang" />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-tight">UJANG YUSMEIDI S.P., M.Agr.</h4>
              <span className="text-[11px] text-slate-400 font-medium">• 28 Mar 2024 11:15</span>
            </div>
            <p className="text-slate-600 text-[15px] leading-relaxed mb-3">Mohon maaf, apakah sertifikatnya sudah tidak dapat diunduh? Karena saya mau download ada konfirmasi bahwa TOTP aktivasi salah Bagaimana ya solusinya ?</p>
            <button className="text-[#007BFF] text-xs font-bold hover:underline mb-6">Balas</button>
            <div className="flex gap-4 mt-2 pl-4 border-l-2 border-slate-50">
              <img src="https://i.pravatar.cc/150?u=dina" className="w-10 h-10 rounded-full object-cover shadow-sm" alt="Dina" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-slate-900 text-sm uppercase tracking-tight">DINA RIKHA RIYANAWATI, S.Pd</h4>
                  <span className="text-[11px] text-slate-400 font-medium">• 28 Mar 2024 11:15</span>
                </div>
                <p className="text-slate-600 text-[15px] leading-relaxed mb-3">saya mengunduh sertifikatnya kok juga belumbisa</p>
                <button className="text-[#007BFF] text-xs font-bold hover:underline">Balas</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}