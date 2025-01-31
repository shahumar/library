from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import BookListViewSet, BookViewSet

router = DefaultRouter()
router.register(r'books', BookViewSet)
router.register(r'lists', BookListViewSet)


urlpatterns = [
    path('', include(router.urls)),
]