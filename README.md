## Prerequisites

-   [Docker](https://www.docker.com/products/docker-desktop) and `docker-compose` installed.

## Getting Started

### 1. Clone & Setup
Clone the repository and navigate to the directory:
```bash
git clone <repository-url>
```

### 2. Run with Docker
Start the application and database containers:
```bash
docker-compose up --build
```
The API will be available at: `http://localhost:3000`

### Postman Collection
A Postman collection file is included in this repository for easy testing.
-   **File**: `postman_collection.json`
-   **Import**: Open Postman -> Import -> Select `postman_collection.json`.

### Endpoints Overview

#### 1. Products
**Search & Filter Products**
-   **GET** `/api/products`
-   **Parameters**:
    -   `q`: (Optional) Search term.
    -   `category`: (Optional) Category ID.
    -   `attributes`: (Optional) Comma-separated Attribute Value IDs (e.g., `10,12`).
-   **Example**:
    ```
    GET /api/products?category=1&attributes=10,12
    ```

#### 2. Categories
**List All Categories**
-   **GET** `/api/categories`

**Get Category Attributes**
-   **GET** `/api/categories/:id/attributes`
-   **Description**: Returns all relevant attributes and their possible values for a category. Use the `value_id` from this response to filter the Products endpoint.
-   **Example Response**:
    ```json
    [
      {
        "id": 1,
        "name": "Color",
        "values": [
          { "id": 10, "value": "Red" },
          { "id": 11, "value": "Blue" }
        ]
      }
    ]
    ```