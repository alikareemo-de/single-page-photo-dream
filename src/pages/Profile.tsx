
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-600">Your profile information will be displayed here.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
