import React from 'react';
import { useQuery, gql } from '@apollo/client';

// GraphQL Query to fetch devices
const GET_DEVICES = gql`
  query GetDevices($first: Int, $after: String) {
    devices(query: {}, first: $first, after: $after) {
      page {
        edges {
          cursor
          node {
            _id
            deviceName
            UUID
            pairingCode
            currentType
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

function DeviceManagement() {
  const { data, loading, error, fetchMore } = useQuery(GET_DEVICES, {
    variables: { first: 5 },
  });

  // Load more devices when available
  const loadMoreDevices = () => {
    if (data.devices.page.pageInfo.hasNextPage) {
      fetchMore({
        variables: { after: data.devices.page.pageInfo.endCursor },
      });
    }
  };

  if (loading) return <p className="text-info">Loading devices...</p>;
  if (error) return <p className="text-danger">Error fetching devices: {error.message}</p>;

  return (
    <div>
      <ul className="list-group">
        {data.devices.page.edges.map(({ node }) => (
          <li key={node._id} className="list-group-item bg-dark text-white">
            <h5 className="fw-bold">{node.deviceName}</h5>
            <p>
              <strong>UUID:</strong> {node.UUID}
            </p>
            <p>
              <strong>Pairing Code:</strong> {node.pairingCode}
            </p>
            <p>
              <strong>Current Type:</strong> {node.currentType}
            </p>
          </li>
        ))}
      </ul>

      {data.devices.page.pageInfo.hasNextPage && (
        <button className="btn btn-dark mt-3" onClick={loadMoreDevices}>
          Load More Devices
        </button>
      )}
    </div>
  );
}

export default DeviceManagement;
