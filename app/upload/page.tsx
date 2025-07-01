import React, { useState } from "react";
import Header from "../../components/Header";
import { db } from "../../firebase/db";
import { storage } from "../../firebase/storage";
import { auth } from "../../firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const categories = [
  "Games",
  "Business",
  "Education",
  "Entertainment",
  "Finance",
  "Food & Drink",
  "Health & Fitness",
  "Lifestyle",
  "Medical",
  "Music",
  "Navigation",
  "News",
  "Photo & Video",
  "Productivity",
  "Reference",
  "Shopping",
  "Social Networking",
  "Sports",
  "Travel",
  "Utilities",
];

export default function UploadPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [version, setVersion] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!name || !description || !category || !image) {
      setError("Please fill in all required fields and select an image.");
      return;
    }
    const user = auth.currentUser;
    if (!user) {
      setError("You must be logged in to upload an app.");
      return;
    }
    setLoading(true);
    try {
      // 1. Upload image to Firebase Storage
      const imageRef = ref(storage, `app-images/${user.uid}/${Date.now()}_${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      // 2. Add app data to Firestore
      const docRef = await addDoc(collection(db, "apps"), {
        userId: user.uid,
        name,
        description,
        category,
        imageUrl,
        downloadUrl: downloadUrl || null,
        version: version || null,
        tags: tags ? tags.split(",").map(t => t.trim()) : [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: "pending",
      });
      setSuccess("App uploaded successfully! (Pending approval)");
      setName("");
      setDescription("");
      setCategory(categories[0]);
      setImage(null);
      setImagePreview(null);
      setDownloadUrl("");
      setVersion("");
      setTags("");
    } catch (err: any) {
      setError("Failed to upload app: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col">
      <Header />
      <main className="flex-1 px-8 py-10 max-w-xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-6">Upload Your App</h2>
        <form className="bg-white rounded-xl shadow p-8 flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">App Name *</label>
            <input
              type="text"
              className="border border-gray-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description *</label>
            <textarea
              className="border border-gray-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring min-h-[80px]"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Category *</label>
            <select
              className="border border-gray-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">App Image *</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-3 rounded-lg w-32 h-32 object-cover border" />
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Download URL</label>
            <input
              type="url"
              className="border border-gray-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring"
              value={downloadUrl}
              onChange={e => setDownloadUrl(e.target.value)}
              placeholder="https://example.com/download"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Version</label>
            <input
              type="text"
              className="border border-gray-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring"
              value={version}
              onChange={e => setVersion(e.target.value)}
              placeholder="1.0.0"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Tags (comma separated)</label>
            <input
              type="text"
              className="border border-gray-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring"
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="productivity, tools, free"
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <button type="submit" className="bg-black hover:bg-gray-800 text-white font-semibold py-2 rounded-lg transition mt-2" disabled={loading}>{loading ? "Uploading..." : "Upload App"}</button>
        </form>
      </main>
    </div>
  );
} 