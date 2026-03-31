import { useEffect, useState } from "react";
import axios from "axios";
import { MessageSquare, Star } from "lucide-react";

export default function Feedback() {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/admin/feedback")
      .then(res => setFeedback(res.data.feedback || []))
      .catch(err => console.log("Feedback load error:", err));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <MessageSquare /> Customer Feedback
      </h1>

      <div className="bg-white shadow rounded-xl p-6 space-y-4">
        {feedback.length === 0 && (
          <p className="text-gray-600">No feedback yet.</p>
        )}

        {feedback.map((fb) => (
          <div
            key={fb._id}
            className="border p-4 rounded-lg hover:bg-gray-50 transition"
          >
            <h2 className="font-semibold">{fb.name}</h2>

            <div className="flex items-center gap-1 text-yellow-500 mt-1">
              {Array.from({ length: fb.rating }).map((_, i) => (
                <Star key={i} size={18} fill="gold" />
              ))}
            </div>

            <p className="text-gray-700 mt-2">{fb.comment}</p>

            <p className="text-sm text-gray-500 mt-2">
              {new Date(fb.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
