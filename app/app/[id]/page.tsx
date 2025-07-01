import React from 'react';
import Header from "../../../components/Header";

const AppDetailsPage = ({ params }: { params: { id: string } }) => (
  <div className="min-h-screen bg-[#fafbfc] flex flex-col">
    <Header />
    <main className="flex-1 px-8 py-10 max-w-4xl mx-auto w-full">
      <h2 className="text-2xl font-bold mb-6">App Details</h2>
      <div className="bg-white rounded-xl shadow p-8">
        <p className="text-gray-600">App details for {params.id} coming soon...</p>
      </div>
    </main>
  </div>
);

export default AppDetailsPage; 