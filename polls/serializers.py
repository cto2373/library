from rest_framework import serializers
from .models import Book, Genre, Author
from rest_framework.reverse import reverse


class BookSerializer(serializers.ModelSerializer):
    genre_name = serializers.SerializerMethodField()
    absolute_url = serializers.SerializerMethodField()
    author_full_name = serializers.SerializerMethodField()

    def get_genre_name(self, book): 
        return book.display_genre() if book.genre else None
    

    def get_author_full_name(self, book):
        return f"{book.author.first_name} {book.author.last_name}" if book.author else None

    
    def get_absolute_url(self, book, request=None, format=None, ):
        return  book.get_absolute_url()
    
    class Meta:
        model = Book 
        fields = "__all__"
        
class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ["id","name"]
        
class AuthorSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    
    def get_full_name(self, author):
        return f"{author.first_name} {author.last_name}"
    
    class Meta:
        model = Author 
        fields = "__all__"