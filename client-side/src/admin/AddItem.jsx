export default function AddItem() {
  return (
    <div className="max-w-lg">
      <h1 className="text-3xl font-bold mb-6">Add New Item</h1>

      <form className="card p-6 space-y-4">
        <input
          type="text"
          placeholder="Item Name"
          className="w-full p-3 border rounded-md dark:bg-slate-800 dark:border-slate-700"
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full p-3 border rounded-md dark:bg-slate-800 dark:border-slate-700"
        />

        <textarea
          placeholder="Description"
          className="w-full p-3 border rounded-md dark:bg-slate-800 dark:border-slate-700"
        />

        <input
          type="file"
          className="w-full p-3 border rounded-md dark:bg-slate-800 dark:border-slate-700"
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md">
          Add Item
        </button>
      </form>
    </div>
  );
}
