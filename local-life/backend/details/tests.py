from django.test import SimpleTestCase
from rest_framework.test import APIClient


class DetailsApiTests(SimpleTestCase):
    def setUp(self):
        self.client = APIClient()

    def test_details_returns_complete_merchant(self):
        response = self.client.get("/details")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["slug"], "example-company")
        self.assertEqual(len(response.data["images"]), 3)
        self.assertEqual(len(response.data["faq"]), 7)
        self.assertIsInstance(response.data["info"]["services"], list)
        self.assertEqual(
            response.data["info"]["address"]["locality"],
            "Melbourne",
        )

    def test_details_allows_cross_origin_get_requests(self):
        response = self.client.get(
            "/details",
            HTTP_ORIGIN="https://test.com",
        )

        self.assertEqual(response["access-control-allow-origin"], "*")
