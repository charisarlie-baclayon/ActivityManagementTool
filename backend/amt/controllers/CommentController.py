from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action

from rest_framework.permissions import IsAuthenticated
from amt.permissions.permissions import IsTeacher

from amt.models import Comment
from amt.serializers.CommentSerializer import CommentCreateSerializer, CommentSerializer
from amt.models import User , Activity


class CommentController(GenericViewSet, ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Comment.objects.all()
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        if self.action in ['create']:
            return [IsAuthenticated(), IsTeacher()]
        else:
            return [IsAuthenticated()]
        
    def get_serializer_class(self):
        if self.action == 'create':
            return CommentCreateSerializer
        else:
            return CommentSerializer
        

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
        
            user_id = request.data.get('user_id', None)
            activity_id = request.data.get('activity_id', None)

            if user_id and activity_id:
                try:
                    user = User.objects.get(pk=user_id)
                  

                    if not user.groups.filter(name='Teacher').exists():
                        return Response({"error": "User is not a teacher"}, status=status.HTTP_403_FORBIDDEN)
                    activity = Activity.objects.get(pk=activity_id)
                  
                    comment = serializer.save(user=user, activity=activity)
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
        
    @action(detail=False, methods=['GET'])
    def comments_for_activity(self, request):
        activity_id = request.query_params.get('activity_id')
    
        if activity_id is not None:
            comments = Comment.objects.filter(activity=activity_id)
            serializer = self.get_serializer(comments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Activity ID not provided'}, status=status.HTTP_400_BAD_REQUEST)