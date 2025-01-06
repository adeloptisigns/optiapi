import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// GraphQL Mutation
const CREATE_PLAYLIST = gql`
  mutation CreatePlaylist($name: String!) {
    savePlaylist(payload: { name: $name }) {
      _id
      name
    }
  }
`;

function CreatePlaylist() {
  const [playlistName, setPlaylistName] = useState('');
  const [createPlaylist, { data, loading, error }] = useMutation(CREATE_PLAYLIST);

  const handleCreatePlaylist = async () => {
    try {
      await createPlaylist({ variables: { name: playlistName } });
      alert('Playlist created successfully!');
      setPlaylistName(''); // Clear the input field
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="card bg-secondary text-white mb-4">
      <div className="card-body">
        
        <form>
          <div className="mb-3">
            <label htmlFor="playlistName" className="form-label">
              Playlist Name
            </label>
            <input
              type="text"
              className="form-control form-control-dark bg-dark text-white"
              id="playlistName"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="Enter playlist name"
            />
          </div>
          <button
            type="button"
            className="btn btn-dark"
            onClick={handleCreatePlaylist}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Playlist'}
          </button>
        </form>
        {error && <p className="text-danger mt-3">Error: {error.message}</p>}
        {data && <p className="text-success mt-3">Playlist Created: {data.savePlaylist.name}</p>}
      </div>
    </div>
  );
}

export default CreatePlaylist;
