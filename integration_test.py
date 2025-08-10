import pytest
import httpx
import asyncio

BASE_USER_URL = "http://localhost:3000"
BASE_PRODUCT_URL = "http://localhost:4000"

@pytest.mark.asyncio
async def test_user_and_product_service_integration():
    async with httpx.AsyncClient() as client:
        # Step 1: Create a new product in product-service
        product_payload = {
            "name": "Integration Test Product",
            "price": 9.99
        }
        product_response = await client.post(f"{BASE_PRODUCT_URL}/products", json=product_payload)
        assert product_response.status_code == 201
        product_data = product_response.json()
        product_id = product_data.get("id")
        assert product_id is not None

        # Step 2: Create a new user in user-service
        user_payload = {
            "name": "Integration User",
            "email": "integration@example.com"
        }
        user_response = await client.post(f"{BASE_USER_URL}/users", json=user_payload)
        assert user_response.status_code == 201
        user_data = user_response.json()
        user_id = user_data.get("id")
        assert user_id is not None

        # Step 3: Retrieve users to verify
        users_response = await client.get(f"{BASE_USER_URL}/users")
        assert users_response.status_code == 200
        users = users_response.json()
        assert any(u["id"] == user_id for u in users)

        # Step 4: Retrieve products to verify
        products_response = await client.get(f"{BASE_PRODUCT_URL}/products")
        assert products_response.status_code == 200
        products = products_response.json()
        assert any(p["id"] == product_id for p in products)
