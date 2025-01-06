import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// Correct GraphQL Mutation
const UPDATE_DEVICE = gql`
  mutation UpdateDevice($id: String!, $payload: UpdateDeviceInput!) {
    updateDevice(_id: $id, payload: $payload) {
      _id
      deviceName
      UUID
      pairingCode
      currentType
      currentAssetId
      localAppVersion
    }
  }
`;

function UpdateDevice() {
  const [screenId, setScreenId] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [currentType, setCurrentType] = useState('ASSET');
  const [currentAssetId, setCurrentAssetId] = useState('');
  const [orientation, setOrientation] = useState('LANDSCAPE');

  // Mutation hook
  const [updateDevice, { loading }] = useMutation(UPDATE_DEVICE);

  // Submit handler
  const handleUpdateDevice = async () => {
    const variables = {
      id: screenId,
      payload: {
        deviceName,
        currentType: currentType.toUpperCase(),
        currentAssetId,
        orientation: orientation.toUpperCase(),
      },
    };

    // Log the request payload
    console.log('Request Payload:', JSON.stringify(variables, null, 2));

    try {
      const response = await updateDevice({ variables });
      console.log('Response:', JSON.stringify(response, null, 2));
      alert('Device updated successfully!');
    } catch (err) {
      console.error('Error Response:', JSON.stringify(err, null, 2));
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="card bg-secondary text-white">
      <div className="card-body">
        {/* <h3 className="card-title">Update Device</h3> */}
        <form>
          <div className="mb-3">
            <label htmlFor="screenId" className="form-label">
              Screen ID
            </label>
            <input
              type="text"
              className="form-control form-control-dark bg-dark text-white"
              id="screenId"
              value={screenId}
              onChange={(e) => setScreenId(e.target.value)}
              placeholder="Enter screen ID"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="deviceName" className="form-label">
              Device Name
            </label>
            <input
              type="text"
              className="form-control form-control-dark bg-dark text-white"
              id="deviceName"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              placeholder="Enter new device name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="currentType" className="form-label">
              Current Type
            </label>
            <select
              className="form-select bg-dark text-white"
              id="currentType"
              value={currentType}
              onChange={(e) => setCurrentType(e.target.value)}
            >
              <option value="ASSET">ASSET</option>
              <option value="PLAYLIST">PLAYLIST</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="currentAssetId" className="form-label">
              Asset/Playlist ID
            </label>
            <input
              type="text"
              className="form-control form-control-dark bg-dark text-white"
              id="currentAssetId"
              value={currentAssetId}
              onChange={(e) => setCurrentAssetId(e.target.value)}
              placeholder="Enter asset or playlist ID"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="orientation" className="form-label">
              Orientation
            </label>
            <select
              className="form-select bg-dark text-white"
              id="orientation"
              value={orientation}
              onChange={(e) => setOrientation(e.target.value)}
            >
              <option value="LANDSCAPE">LANDSCAPE</option>
              <option value="PORTRAIT">PORTRAIT</option>
            </select>
          </div>
          <button
            type="button"
            className="btn btn-dark"
            onClick={handleUpdateDevice}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Device'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateDevice;
