# OptiSigns API Demo App

This project is a demonstration of how to use the **OptiSigns API** to interact with digital signage content. It showcases various GraphQL API functionalities provided by OptiSigns, including pairing screens, managing playlists, fetching assets, and more.

This app was built using **React** and deployed using **GitHub Pages** to demonstrate how developers can leverage the **OptiSigns GraphQL API** to manage digital signage screens and content programmatically.

---

## 🚀 **Project Overview**
This app interacts with the **OptiSigns GraphQL API**, which provides a flexible way to manage digital signage content from an external application. The API allows developers to pair devices, update screens, create and manage playlists, and more.

The project demonstrates key API functionalities such as:
- Pairing a screen using a pairing code.
- Renaming paired screens and assigning assets or playlists.
- Fetching device and asset information.
- Creating, updating, and managing playlists.

---

## 📚 **What is the OptiSigns API?**
The **OptiSigns API** is organized around **GraphQL**, a query language for APIs that enables clients to request only the data they need. It provides a single endpoint to access the full capabilities of the OptiSigns platform.

### **Why GraphQL?**
- **Single Endpoint:** Unlike REST APIs that have multiple endpoints, GraphQL APIs use a single endpoint to access all resources.
- **Efficient Data Fetching:** GraphQL allows you to fetch multiple resources in a single request, minimizing over-fetching and under-fetching.
- **No Versioning:** The GraphQL API evolves over time without breaking existing queries.

---

## 🔑 **Setting Up the API Key**
To use the **OptiSigns API**, you need an **API key** to authenticate your requests.

1. Go to your OptiSigns account and navigate to **API Keys**.
2. Click **New API Key**.
3. Enter a name for your key and set the necessary permissions.
4. Save your API key securely.

Use your API key in the **Authorization** header of your HTTP requests:

```
Authorization: Bearer YOUR_API_KEY
```

---

## 📋 **Core Features Demonstrated in This App**

### 1️⃣ **Pair Device**
The app allows you to pair a screen using the `pairDevice` mutation.
- **Mutation Example:**
  ```graphql
  mutation {
    pairDevice(payload: { pairingCode: "M9JTSY" }) {
      _id
      deviceName
      UUID
      pairingCode
      currentType
      currentAssetId
      localAppVersion
    }
  }
  ```

### 2️⃣ **Rename and Assign Content to a Screen**
You can change the screen name and assign an asset or playlist to the screen using the `updateDevice` mutation.
- **Mutation Example (Assign Asset):**
  ```graphql
  mutation {
    updateDevice(_id: "screen-id", payload: {
      deviceName: "New Device Name",
      currentType: ASSET,
      currentAssetId: "asset-id",
      orientation: LANDSCAPE
    }) {
      _id
      deviceName
      UUID
    }
  }
  ```
- **Mutation Example (Assign Playlist):**
  ```graphql
  mutation {
    updateDevice(_id: "screen-id", payload: {
      deviceName: "New Device Name",
      currentType: PLAYLIST,
      currentAssetId: "playlist-id",
      orientation: LANDSCAPE
    }) {
      _id
      deviceName
      UUID
    }
  }
  ```

### 3️⃣ **Create and Manage Playlists**
The app demonstrates how to create playlists, add items to playlists, update playlist items (such as changing the duration of assets), and remove items from playlists.

#### **Create a Playlist**
- **Mutation Example:**
  ```graphql
  mutation {
    savePlaylist(payload: { name: "Demo Playlist" }) {
      _id
      name
    }
  }
  ```

#### **Add Items to a Playlist**
- **Mutation Example:**
  ```graphql
  mutation {
    addPlaylistItems(_id: "playlist-id", payload: {
      ids: ["item-id-1", "item-id-2"],
      pos: 1
    }) {
      _id
      fileType
      filename
    }
  }
  ```

#### **Update Playlist Items**
- **Mutation Example:**
  ```graphql
  mutation {
    updatePlaylistItems(_id: "playlist-id", payload: {
      items: [{ item: { duration: 30 }, pos: [0] }]
    }) {
      _id
      duration
    }
  }
  ```

#### **Remove Items from a Playlist**
- **Mutation Example:**
  ```graphql
  mutation {
    removePlaylistItems(_id: "playlist-id", payload: { pos: [0] }) {
      _id
    }
  }
  ```

### 4️⃣ **Fetch Device and Asset Information**
The app can query the OptiSigns API to fetch device and asset information.

#### **Fetch Devices**
- **Query Example:**
  ```graphql
  query {
    devices(query: {}) {
      page {
        edges {
          node {
            _id
            deviceName
          }
        }
      }
    }
  }
  ```

#### **Fetch Specific Asset**
- **Query Example:**
  ```graphql
  query {
    assets(query: { originalFileName: "Sample Image 1.JPG" }) {
      page {
        edges {
          node {
            _id
            name
          }
        }
      }
    }
  }
  ```

---

### **Error Handling**
When the API encounters an error, it returns an **error object** in the response. The app shows how to handle these errors and display appropriate messages to the user.

Example Error Response:
```json
{
  "errors": [
    {
      "message": "This device is already paired",
      "extensions": {
        "code": "406",
        "response": {
          "statusCode": 406,
          "error": "Not Acceptable"
        }
      }
    }
  ]
}
```

---

## 💻 **Tech Stack**
- **React** for the front-end UI.
- **Apollo Client** for managing GraphQL queries and mutations.
- **Bootstrap** for styling.
- **GitHub Pages** for deployment.

---

## 🌐 **Deployed URL**
The app is live at: **https://adeloptisigns.github.io/optiapi/**

---

## 🤝 **Contributions**
This project is a demonstration and not intended for production use. Contributions are welcome to improve the functionality and showcase more features of the OptiSigns API.

---

Happy coding! 🎉

