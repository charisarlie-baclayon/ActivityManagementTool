from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action

from rest_framework.permissions import IsAuthenticated
from amt.permissions.permissions import IsTeacher

from amt.models import Comment
from amt.serializers import CommentSerializer
from amt.models import User , Activity


class CommentController(GenericViewSet, ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        if self.action in ['create']:
            return [IsAuthenticated(), IsTeacher()]
        else:
            return [IsAuthenticated()]
        

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            comment = serializer.save(user=None, activity=None)
        
            user_id = request.data.get('user_id', None)
            activity_id = request.data.get('activity_id', None)

            if user_id and activity_id:
                try:
                    user = User.objects.get(pk=user_id)
                    comment.user = user

                    if not user.groups.filter(name='Teacher').exists():
                        return Response({"error": "User is not a teacher"}, status=status.HTTP_403_FORBIDDEN)
                    activity = Activity.objects.get(pk=activity_id)
                    comment.activity = activity
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                except User.DoesNotExist:
                    return Response({'error': 'Team not found'}, status=status.HTTP_404_NOT_FOUND)
                except Activity.DoesNotExist:
                    return Response({'error': 'Team not found'}, status=status.HTTP_404_NOT_FOUND)
        
            elif not user_id:
                return Response({'error': 'User ID not provided'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'Activity ID not provided'}, status=status.HTTP_400_BAD_REQUEST)
       
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)