import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// GraphQL Mutations
const ADD_PLAYLIST_ITEMS = gql`
  mutation AddPlaylistItems($playlistId: String!, $itemIds: [String!]!, $position: Int!) {
    addPlaylistItems(_id: $playlistId, payload: { ids: $itemIds, pos: $position }) {
      _id
      fileType
      filename
      duration
      appType
    }
  }
`;

const UPDATE_PLAYLIST_ITEMS = gql`
  mutation UpdatePlaylistItems($playlistId: String!, $items: [UpdatePlaylistItemInput!]!) {
    updatePlaylistItems(_id: $playlistId, payload: { items: $items }) {
      _id
      fileType
      filename
      duration
      appType
    }
  }
`;

const REMOVE_PLAYLIST_ITEMS = gql`
  mutation RemovePlaylistItems($playlistId: String!, $positions: [Int!]!) {
    removePlaylistItems(_id: $playlistId, payload: { pos: $positions }) {
      _id
      fileType
      filename
      duration
      appType
    }
  }
`;

function PlaylistManagement() {
  // State hooks for each section
  const [addPlaylistId, setAddPlaylistId] = useState('');
  const [itemIds, setItemIds] = useState('');
  const [position, setPosition] = useState(1);

  const [updatePlaylistId, setUpdatePlaylistId] = useState('');
  const [duration, setDuration] = useState(15);
  const [updatePosition, setUpdatePosition] = useState('');

  const [removePlaylistId, setRemovePlaylistId] = useState('');
  const [removePosition, setRemovePosition] = useState('');

  // Mutation hooks
  const [addPlaylistItems] = useMutation(ADD_PLAYLIST_ITEMS);
  const [updatePlaylistItems] = useMutation(UPDATE_PLAYLIST_ITEMS);
  const [removePlaylistItems] = useMutation(REMOVE_PLAYLIST_ITEMS);

  // Handlers for each section
  const handleAddItemsToPlaylist = async () => {
    const variables = {
      playlistId: addPlaylistId,
      itemIds: itemIds.split(',').map((id) => id.trim()),
      position,
    };

    try {
      await addPlaylistItems({ variables });
      alert('Items added to playlist successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleUpdatePlaylistItems = async () => {
    const variables = {
      playlistId: updatePlaylistId,
      items: [
        {
          item: { duration },
          pos: updatePosition.split(',').map((pos) => parseInt(pos.trim(), 10)),
        },
      ],
    };

    try {
      await updatePlaylistItems({ variables });
      alert('Playlist items updated successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleRemovePlaylistItems = async () => {
    const variables = {
      playlistId: removePlaylistId,
      positions: removePosition.split(',').map((pos) => parseInt(pos.trim(), 10)),
    };

    try {
      await removePlaylistItems({ variables });
      alert('Items removed from playlist successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="card bg-secondary text-white">
      <div className="card-body">
        {/* <h3 className="card-title">Playlist Management</h3> */}

        {/* Section: Assign Content to Playlist */}
        <div className="mb-4">
          <h4>Assign Content to Playlist</h4>
          <div className="mb-3">
            <label htmlFor="addPlaylistId" className="form-label">Playlist ID</label>
            <input
              type="text"
              className="form-control bg-dark text-white"
              id="addPlaylistId"
              value={addPlaylistId}
              onChange={(e) => setAddPlaylistId(e.target.value)}
              placeholder="Enter playlist ID"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="itemIds" className="form-label">Item IDs (comma-separated)</label>
            <input
              type="text"
              className="form-control bg-dark text-white"
              id="itemIds"
              value={itemIds}
              onChange={(e) => setItemIds(e.target.value)}
              placeholder="Enter item IDs"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="position" className="form-label">Position</label>
            <input
              type="number"
              className="form-control bg-dark text-white"
              id="position"
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
              placeholder="Enter position"
            />
          </div>
          <button type="button" className="btn btn-dark" onClick={handleAddItemsToPlaylist}>
            Assign Content
          </button>
        </div>

        {/* Section: Change Playlist Item Duration */}
        <div className="mb-4">
          <h4>Change Playlist Item Duration</h4>
          <div className="mb-3">
            <label htmlFor="updatePlaylistId" className="form-label">Playlist ID</label>
            <input
              type="text"
              className="form-control bg-dark text-white"
              id="updatePlaylistId"
              value={updatePlaylistId}
              onChange={(e) => setUpdatePlaylistId(e.target.value)}
              placeholder="Enter playlist ID"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="duration" className="form-label">Duration (seconds)</label>
            <input
              type="number"
              className="form-control bg-dark text-white"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              placeholder="Enter duration"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="updatePosition" className="form-label">Positions to Update (comma-separated)</label>
            <input
              type="text"
              className="form-control bg-dark text-white"
              id="updatePosition"
              value={updatePosition}
              onChange={(e) => setUpdatePosition(e.target.value)}
              placeholder="Enter positions"
            />
          </div>
          <button type="button" className="btn btn-dark" onClick={handleUpdatePlaylistItems}>
            Update Duration
          </button>
        </div>

        {/* Section: Remove Items from Playlist */}
        <div className="mb-4">
          <h4>Remove Items from Playlist</h4>
          <div className="mb-3">
            <label htmlFor="removePlaylistId" className="form-label">Playlist ID</label>
            <input
              type="text"
              className="form-control bg-dark text-white"
              id="removePlaylistId"
              value={removePlaylistId}
              onChange={(e) => setRemovePlaylistId(e.target.value)}
              placeholder="Enter playlist ID"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="removePosition" className="form-label">Positions to Remove (comma-separated)</label>
            <input
              type="text"
              className="form-control bg-dark text-white"
              id="removePosition"
              value={removePosition}
              onChange={(e) => setRemovePosition(e.target.value)}
              placeholder="Enter positions"
            />
          </div>
          <button type="button" className="btn btn-dark" onClick={handleRemovePlaylistItems}>
            Remove Items
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaylistManagement;
