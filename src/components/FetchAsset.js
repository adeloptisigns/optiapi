import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';

// GraphQL Query to Fetch a Specific Asset
const FETCH_ASSET = gql`
  query FetchAsset($fileName: String!) {
    assets(query: { originalFileName: $fileName }) {
      page {
        edges {
          cursor
          node {
            _id
            appType
            fileType
            name
            filename
          }
        }
      }
    }
  }
`;

function FetchAsset() {
  const [fileName, setFileName] = useState('');
  const [fetchAsset, { data, loading, error }] = useLazyQuery(FETCH_ASSET);

  const handleFetchAsset = () => {
    if (!fileName) {
      alert('Please enter a file name');
      return;
    }
    fetchAsset({ variables: { fileName } });
  };

  return (
    <div className="card bg-secondary text-white">
      <div className="card-body">
        {/* <h3 className="card-title">Fetch Asset</h3> */}
        <form>
          <div className="mb-3">
            <label htmlFor="fileName" className="form-label">
              File Name
            </label>
            <input
              type="text"
              className="form-control bg-dark text-white"
              id="fileName"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter the file name (e.g., Sample Image 1.JPG)"
            />
          </div>
          <button type="button" className="btn btn-dark" onClick={handleFetchAsset}>
            Fetch Asset
          </button>
        </form>

        {/* Display Results */}
        {loading && <p className="mt-3">Loading...</p>}
        {error && <p className="text-danger mt-3">Error: {error.message}</p>}
        {data && (
          <div className="mt-3">
            <h4>Asset Details:</h4>
            {data.assets.page.edges.map(({ node }) => (
              <div key={node._id} className="bg-dark p-3 mb-2">
                <p><strong>ID:</strong> {node._id}</p>
                <p><strong>App Type:</strong> {node.appType}</p>
                <p><strong>File Type:</strong> {node.fileType}</p>
                <p><strong>Name:</strong> {node.name}</p>
                <p><strong>Filename:</strong> {node.filename}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FetchAsset;
