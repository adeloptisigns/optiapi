import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// GraphQL Mutation
const PAIR_DEVICE = gql`
  mutation PairDevice($pairingCode: String!) {
    pairDevice(payload: { pairingCode: $pairingCode }) {
      _id
      deviceName
      pairingCode
    }
  }
`;

function PairDevice() {
  const [pairingCode, setPairingCode] = useState('');
  const [pairDevice, { data, loading, error }] = useMutation(PAIR_DEVICE);

  const handlePairDevice = async () => {
    try {
      await pairDevice({ variables: { pairingCode } });
      alert('Device paired successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        className="form-control form-control-dark bg-dark text-white"
        value={pairingCode}
        onChange={(e) => setPairingCode(e.target.value)}
        placeholder="Enter device pairing code"
        style={{ color: 'white', placeholderColor: '#ccc' }}
      />
      <button
        className="btn btn-dark mt-3"
        onClick={handlePairDevice}
        disabled={loading}
      >
        {loading ? 'Pairing...' : 'Pair Device'}
      </button>
      {error && <p className="text-danger mt-3">Error: {error.message}</p>}
      {data && <p className="text-success mt-3">Device Paired: {data.pairDevice.deviceName}</p>}
    </div>
  );
}

export default PairDevice;
