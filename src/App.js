import React from 'react';
import DeviceManagement from './components/DeviceManagement';
import PairDevice from './components/PairDevice';
import PlaylistManagement from './components/PlaylistManagement';
import UpdateDevice from './components/UpdateDevice';
import CreatePlaylist from './components/CreatePlaylist';
import FetchAsset from './components/FetchAsset';

function App() {
  return (
    <div className="container-fluid bg-dark text-white min-vh-100 d-flex flex-column align-items-center">
      {/* Header Section */}
      <div className="w-100 py-4" style={{ backgroundColor: '#00264d' }}>
        <h1 className="text-center text-white mb-0">OptiSigns Management</h1>
      </div>

      {/* Main Content Section */}
      <div className="mt-4 w-75">
       

        {/* Device Management Section */}
        <div className="card bg-secondary text-white mb-4">
          <div className="card-body">
            <h2 className="card-title">Devices</h2>
            <DeviceManagement />
          </div>
        </div>

         {/* Pair Device Section */}
         <div className="card bg-secondary text-white mb-4">
          <div className="card-body">
            <h2 className="card-title">Pair Device</h2>
            <PairDevice />
          </div>
        </div>

        {/* Update Device Section */}
        <div className="card bg-secondary text-white mb-4">
          <div className="card-body">
            <h2 className="card-title">Update Device</h2>
            <UpdateDevice />
          </div>
        </div>

        {/* Fetch Asset Section */}
        <div className="card bg-secondary text-white mb-4">
          <div className="card-body">
            <h2 className="card-title">Fetch Asset</h2>
            <FetchAsset />
          </div>
        </div>

        {/* Create Playlist Section */}
        <div className="card bg-secondary text-white mb-4">
          <div className="card-body">
            <h2 className="card-title">Create Playlist</h2>
            <CreatePlaylist />
          </div>
        </div>

        {/* Playlist Management Section */}
        <div className="card bg-secondary text-white mb-4">
          <div className="card-body">
            <h2 className="card-title">Playlist Management</h2>
            <PlaylistManagement />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;



